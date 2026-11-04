# 開発

## セットアップ

```bash
npm ci
npm run serve                        # http://localhost:8080
git config core.hooksPath .githooks  # clone ごとに1回（下の「ブランチと PR」）
```

## ブランチと PR

- **main へは直接コミット・push しない。** 変更は必ずブランチを切り、PR → CI 緑 → squash マージで取り込む
- 手元: [.githooks/pre-commit](../.githooks/pre-commit) が main 上のコミットを拒否する。clone ごとに1回有効化する:
  ```bash
  git config core.hooksPath .githooks
  ```

## CI

[ci.yml](../.github/workflows/ci.yml) が main 以外のブランチへの push で、**差分が影響しうるジョブだけ**を回す。
判定は [ci-targets.sh](../.github/scripts/ci-targets.sh)（main との merge-base からの差分ファイルで決める。
`.github/scripts/ci-targets.sh <ブランチ名>` で手元でも試せる。見るのはコミット済みの差分だけ）。

| 変更 | checks（eslint） | e2e（本番イメージのビルドと起動してのスモーク） |
|---|---|---|
| `src/**`・`public/**`・依存（package.json・lockfile）・ビルド設定など、下に無いもの全部 | ✓ | ✓ |
| `.eslintrc.js` | ✓ | – |
| `e2e/**` | – | ✓ |
| `Dockerfile`・`.dockerignore`・`docker/**`・`docker-compose.yml` | – | ✓ |
| ワークフロー（checks.yml / e2e.yml） | そのワークフローのジョブだけ | 同左 |
| ドキュメント（`*.md`・`docs/**`）・`.claude/**`・`.githooks/**`・ruleset・Renovate 設定・LICENSE・docker-build.yml | – | – |
| `release/*` ブランチ（バージョンの bump だけ） | – | – |

- 結果は `ci-result` に集まる（main の必須チェックはこれだけにする）。成功とスキップは通し、失敗とキャンセルは落とす
- **main への push では回さない。** マージ前に同じ中身をブランチで通しているため
- `npm run build` は checks では回さず、e2e の本番イメージのビルド（Dockerfile の中）で確かめる
- **タグ push（リリース）では全部回す。** [docker-build.yml](../.github/workflows/docker-build.yml) が
  checks をビルドと並べて回し、E2E は push したイメージそのもので回す。全部が緑のときだけデプロイの PR を出す。
  ブランチで省いた検査で壊れていた場合は、ここで止まる
- ブランチの E2E のイメージのビルドは、タグのビルドがレジストリに積む `buildcache` を読む

## E2E

ブランチで、本番と同じイメージをビルドし、偽の instance-info-api と一緒に起動して Playwright を回す
（[e2e.yml](../.github/workflows/e2e.yml)。イメージは push しない）。
**画面の操作（クリック・入力）とリトライは入れない。** ブラウザでは主要なページが開けて未捕捉の JS 例外が無いことと、
共有リンク（`/share?i=...&a=1`）からの自動遷移だけを見る。

| ファイル | 見ること |
|---|---|
| [smoke.spec.mjs](../e2e/smoke.spec.mjs) | 主要なページを直接開いても 200 で、Vue が描画まで進む（nginx の SPA 設定を含む） |
| [share.spec.mjs](../e2e/share.spec.mjs) | Mastodon のサーバーなら共有画面の URL（text・url・visibility）へ自動で移る。nginx の `/api` プロキシがパスを変えずに API へ渡す。API が 404 を返すサーバーは「対応していない」と出す |

- **偽 API**（[e2e/fake-api/server.mjs](../e2e/fake-api/server.mjs)）: 標準ライブラリだけで書き、応答の形は
  instance-info-api の `InstancesController#response_json` に合わせる。`mastodon.example`・`misskey.example` 以外は 404。
  受けたリクエストを記録し、テストは `127.0.0.1:18080/__requests` から取り出す
- 本番では Traefik が `/api` を instance-info-api へ直接振り分けるので、イメージ内の nginx の `/api` プロキシは
  本番では使われない（E2E と手元の検証用）。API 側の変更はこの E2E では確かめられない
- 外への通信（Google Fonts・Google Analytics・共有先）はテスト側で止める（[fixtures.mjs](../e2e/fixtures.mjs)）。
  止めたリクエストも記録には出るので、共有先への遷移はそれで確かめる
- 画面の言語はブラウザの言語で決まるので、`en-US` に固定している（文言で確かめる箇所がある）
- 手元で回す手順は [e2e/compose.yml](../e2e/compose.yml) の冒頭。初回だけ `npx playwright install chromium` が要る

## リリース

本番は k8sg1（Flux で同期している k8s のマニフェストのリポジトリ `highemerly/k8sg1-repo`）の
`manifests/anypost/prd/web.yaml` が指すイメージ。版は `vX.Y.Z` のタグで決める（2026-05 までは日付のタグを手で push していた）。

1. バージョンの bump もブランチ → PR でマージする（`release/vX.Y.Z`。CI は何も回さない）。
   マージ後の main にタグを打って push する:
   ```bash
   git switch main && git pull && git tag vX.Y.Z && git push origin vX.Y.Z
   ```
2. タグの push で [docker-build.yml](../.github/workflows/docker-build.yml) が動く:
   1. **検査を全部回す**（ブランチで差分により省いたものも）。checks はビルドと並走し、
      E2E は **push したイメージそのもの**で回す（作り直したイメージで通っても、デプロイするものの確認にならない）
   2. イメージを `X.Y.Z`・`X.Y`・`latest` で GHCR（非公開）へ push する。**イメージは検査の結果を待たずに push され、
      `latest` も動く。本番は版を固定していて、`latest` はデプロイに使わない**
   3. 全部が緑のときだけ **GitHub Release** を作る（タグごと・パッチも含む）。Release がある版＝デプロイしてよい版
   4. 同じ条件で、k8sg1 へ「Update anypost-web to X.Y.Z」の PR を出す（ラベル `app-update`。
      トークンはシークレット `K8SG1_PAT`）
3. **k8sg1 の PR のマージがそのまま本番へのデプロイになる**（Flux が約1分で反映）。k8sg1 には必須チェックが無いので、
   k8sg1 の CI が緑かを目で見てからマージする

DB を持たないので、マイグレーションの手順は無い（API 側は instance-info-api のリポジトリで別にリリースする）。

### GitHub Release のノート

GitHub の自動生成（前回のタグからマージされた PR の一覧と Full Changelog・英語）。分類は
[.github/release.yml](../.github/release.yml) で、Renovate の PR（`dependencies` ラベル）を
`Dependencies` に、それ以外を `Changes` に分ける。同じノートを k8sg1 の PR 本文にも使う。

- **前回のタグを明示している**（`previous_tag_name`）。省くと GitHub は前回の「Release」を起点にするので、
  Release を作っていない範囲があると起点がずれる
- `.github/release.yml` は、ノートを作る対象のコミット（タグの位置）から読まれる

### うまくいかないとき

- **k8sg1 に PR が出ない**: `create-k8s-pr` のログを見る。マニフェストの `image:` の行が書き換わらなかった
  （マニフェストの書式が変わった）ときは、わざと赤で止めている。検査が赤なら、そもそも `release` と
  `create-k8s-pr` は動かない
- **イメージを作り直したい**: Actions から docker-build.yml を手で実行する（`workflow_dispatch`）。
  入力はそのままイメージタグと k8s マニフェストの版になるので、`v` を付けずに `3.0.0` のように入れる。
  このときは GitHub Release を作らない（タグが無い・既にある）
