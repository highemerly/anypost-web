# 開発

## セットアップ

Node.js は [.nvmrc](../.nvmrc) に従う（CI も同じファイルを読む。Dockerfile のビルド用のイメージの版も揃える）。

```bash
npm ci
npm run dev                          # http://localhost:8080
git config core.hooksPath .githooks  # clone ごとに1回（下の「ブランチと PR」）
```

## 対応ブラウザ

Tailwind CSS 4 の要件に合わせて、**Chrome 111・Safari 16.4・Firefox 128 以降**（2023年3月・2024年7月）。
これより古いブラウザでは見た目が崩れる（https://tailwindcss.com/docs/compatibility）。

## ブランチと PR

- **main へは直接コミット・push しない。** 変更は必ずブランチを切り、PR → CI 緑 → squash マージで取り込む
- 手元: [.githooks/pre-commit](../.githooks/pre-commit) が main 上のコミットを拒否する。clone ごとに1回有効化する:
  ```bash
  git config core.hooksPath .githooks
  ```
- サーバー側: GitHub の ruleset（定義は [.github/rulesets/main.json](../.github/rulesets/main.json)）が
  main への push を拒否する。タグは ruleset の対象外（リリースのタグは main に直接打つ）

### ruleset の中身と理由

| ルール | 設定 | 理由 |
|---|---|---|
| PR 必須 | 承認数 0 | 一人運用で、自分の PR は自分で承認できないため |
| マージ方式 | squash のみ＋linear history | 「1変更＝1コミット」の履歴を保つ |
| 必須チェック | `ci-result`（checks / e2e のうち走ったものの結果をまとめたもの） | ブランチへの push で [ci.yml](../.github/workflows/ci.yml) が付ける。ジョブは差分で間引く（下の「CI」）ので、個別に必須にするとスキップされたジョブに結果が付かずマージできなくなる。必須でないチェックは赤でもマージできるので、マージ前に見たい検査は全部 `ci-result` に入れる |
| 最新化の強制 | しない（strict=false） | 依存更新の PR が並んだとき、1件マージするたびに全件を rebase・再 CI させないため |
| force push・削除 | 禁止 | |
| バイパス | なし（管理者も対象） | |
| 作者の紐づかないコミットの追加承認 | 求めない | 省略すると true が入り、アカウントに紐づかない作者のコミットがあると自分で承認できずマージできなくなる |

ruleset を変えたら JSON を直して反映する（作成時は POST、以降は `gh api repos/highemerly/anypost-web/rulesets` で id を引いて PUT）:
```bash
gh api -X POST repos/highemerly/anypost-web/rulesets --input .github/rulesets/main.json
gh api -X PUT repos/highemerly/anypost-web/rulesets/<id> --input .github/rulesets/main.json
```

### リポジトリの設定

| 設定 | 値 | 理由 |
|---|---|---|
| マージ方式 | squash だけ許可 | ruleset と同じ。画面で別の方式を選べないようにする |
| squash のコミットメッセージ | PR タイトルだけ（本文は空） | ブランチ上の途中のコミットの一覧を main の履歴に持ち込まない |
| マージ後のブランチ | 自動で削除 | |
| auto-merge | 有効 | CI が緑になったらマージ、を予約できるようにする |

## 依存更新（Renovate）

設定は [.github/renovate.json5](../.github/renovate.json5)（各ルールの理由はコメント）。

- 週2回（月・木の朝）にまとめて PR が来る。ラベル `dependencies`（Release のノートで Dependencies に分かれる）
- **メジャーは自動で PR にならない。** Issue「Dependency Dashboard」でチェックを入れたものだけ PR になる
- npm は公開から3日待つ。Docker のベースイメージは digest で固定し、digest の更新も PR になる
- auto-merge はしない。CI（`ci-result`）が緑なのを見てから squash マージする

### PR が来たら

1. **lockfile の差分を見て、実際に入る版が変わるかを確かめる。** `package.json` の範囲の下限だけが上がり、
   lockfile の版が変わらない PR もある（中身は何も変わらない）
2. 下の表で、CI が緑でも確かめられていないものに当たるなら、そこだけ手元で見る
3. マージ後、手元は `git switch main && git pull && npm ci`

| 依存 | CI で確かめられること | CI では確かめられないこと |
|---|---|---|
| vue・vue-router・pinia・vue-i18n・axios・@headlessui/vue・@heroicons/vue | 主要なページが描画まで進み例外が無い。共有リンクで API を呼び、共有先の URL を組み立てて移る（E2E） | クリック・入力などの操作（E2E に画面操作は入れていない） |
| tailwindcss・@tailwindcss/vite | ビルドが通り、ページが描画される | **見た目**（E2E は見た目を比べない）。マイナーでも見た目が変わりうるので、気になるときは手元で画面を見る |
| vite・@vitejs/plugin-vue | 本番イメージのビルドと E2E | 開発サーバー（`npm run dev`） |
| eslint・@eslint/js・eslint-plugin-vue・vue-eslint-parser・neostandard | lint が通る | — （neostandard は 0.x で、マイナーでも規則が増えることがある。lint が赤なら直すか規則を見直す） |
| @playwright/test | E2E そのもの | — |
| Docker の node（ビルド用）・nginx（配信用）の digest | 本番イメージのビルドと、nginx での配信・`/api` のプロキシ・ヘルスチェック（E2E） | — |
| GitHub Actions | checks.yml・e2e.yml で使うもの | **docker-build.yml・tag-release.yml だけで使うもの**（リリース時にしか動かない）。マージ後の最初のリリースでログを見る |
| Node のメジャー（Dockerfile・`.nvmrc`・E2E の偽 API を1つの PR に） | ビルド・lint・E2E | — （承認制。Node の LTS に合わせて承認する） |

### 承認待ちの片付け

Dependency Dashboard の「Pending Approval」にメジャーが溜まる。着手するときにチェックを入れる。
見送るものは、理由を renovate.json5 にコメントで残す（承認待ちに残しておく理由が後から分かるように）。

## CI

[ci.yml](../.github/workflows/ci.yml) が main 以外のブランチへの push で、**差分が影響しうるジョブだけ**を回す。
判定は [ci-targets.sh](../.github/scripts/ci-targets.sh)（main との merge-base からの差分ファイルで決める。
`.github/scripts/ci-targets.sh <ブランチ名>` で手元でも試せる。見るのはコミット済みの差分だけ）。

| 変更 | checks（eslint） | e2e（本番イメージのビルドと起動してのスモーク） |
|---|---|---|
| `src/**`・`public/**`・依存（package.json・lockfile）・ビルド設定など、下に無いもの全部 | ✓ | ✓ |
| `eslint.config.mjs` | ✓ | – |
| `e2e/**`（eslint の対象でもある） | ✓ | ✓ |
| `Dockerfile`・`.dockerignore`・`docker/**`・`docker-compose.yml` | – | ✓ |
| ワークフロー（checks.yml / e2e.yml） | そのワークフローのジョブだけ | 同左 |
| ドキュメント（`*.md`・`docs/**`）・`.claude/**`・`.githooks/**`・ruleset・Renovate 設定・LICENSE・docker-build.yml | – | – |
| `release/*` ブランチ（リリースの準備だけ。例：アプリ内のリリースノート） | – | – |

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
| [smoke.spec.mjs](../e2e/smoke.spec.mjs) | 主要なページを直接開いても 200 で、Vue が描画まで進む（nginx の SPA 設定を含む）。開いただけで外のドメインへリクエストを出さない |
| [share.spec.mjs](../e2e/share.spec.mjs) | Mastodon のサーバーなら共有画面の URL（text・url・visibility）へ自動で移る。nginx の `/api` プロキシがパスを変えずに API へ渡す。API が 404 を返すサーバーは「対応していない」と出す |

- **偽 API**（[e2e/fake-api/server.mjs](../e2e/fake-api/server.mjs)）: 標準ライブラリだけで書き、応答の形は
  instance-info-api の `InstancesController#response_json` に合わせる。`mastodon.example`・`misskey.example` 以外は 404。
  受けたリクエストを記録し、テストは `127.0.0.1:18080/__requests` から取り出す
- 本番では Ingress が `/api` を instance-info-api へ直接振り分けるので、イメージ内の nginx の `/api` プロキシは
  本番では使われない（E2E と手元の検証用）。API 側の変更はこの E2E では確かめられない
- 外への通信（共有先など）はテスト側で止める（[fixtures.mjs](../e2e/fixtures.mjs)）。
  止めたリクエストも記録には出るので、共有先への遷移はそれで確かめる
- 画面の言語はブラウザの言語で決まるので、`en-US` に固定している（文言で確かめる箇所がある）
- 手元で回す手順は [e2e/compose.yml](../e2e/compose.yml) の冒頭。初回だけ `npx playwright install chromium` が要る

## リリース

本番は、Flux で同期している k8s のマニフェストのリポジトリ（非公開）が指すイメージ。版は `vX.Y.Z` のタグで決める
（2026-05 までは日付のタグを手で push していた）。

マニフェストのリポジトリの名前とパスはこのリポジトリに書かない（Actions のログも公開されるため）。
ワークフローはシークレットから読む:

| シークレット | 中身 |
|---|---|
| `K8SG1_REPO` | マニフェストのリポジトリ（`owner/name`） |
| `K8SG1_MANIFEST_PATHS` | 書き換える prd のマニフェストのパス（スペース区切り） |
| `K8SG1_PAT` | そのリポジトリへ PR を出すトークン（Contents と Pull requests の Read and write） |

**版はタグだけに持つ**（`package.json` に `version` を置かない。版を上げる PR は要らない）。

1. Actions の画面の **Tag a release**（[tag-release.yml](../.github/workflows/tag-release.yml)）を main で実行し、
   上げ方を選ぶ。main の先頭に次の版のタグを打ち、そのまま docker-build.yml を呼ぶ。手元からは:
   ```bash
   gh workflow run tag-release.yml --ref main -f bump=patch
   ```
   | 上げ方 | いつ |
   |---|---|
   | patch | 修正と依存の更新だけ |
   | minor | 新しい機能（利用者・運用者から見てできることが増えた） |
   | major | 互換性を崩す |

   手元でタグを打って push しても同じことが起きる（飛び番の版を出すとき）:
   `git switch main && git pull && git tag vX.Y.Z && git push origin vX.Y.Z`
2. [docker-build.yml](../.github/workflows/docker-build.yml) が動く:
   1. **検査を全部回す**（ブランチで差分により省いたものも）。checks はビルドと並走し、
      E2E は **push したイメージそのもの**で回す（作り直したイメージで通っても、デプロイするものの確認にならない）
   2. イメージを `X.Y.Z`・`X.Y`・`latest` で GHCR（非公開）へ push する。**イメージは検査の結果を待たずに push され、
      `latest` も動く。本番は版を固定していて、`latest` はデプロイに使わない**
   3. 全部が緑のときだけ **GitHub Release** を作る（タグごと・パッチも含む）。Release がある版＝デプロイしてよい版
   4. 同じ条件で、マニフェストのリポジトリへ「Update anypost-web to X.Y.Z」の PR を出す（ラベル `app-update`）
3. **その PR のマージがそのまま本番へのデプロイになる**（Flux が約1分で反映）。マニフェストのリポジトリには
   必須チェックが無いので、そちらの CI が緑かを目で見てからマージする

DB を持たないので、マイグレーションの手順は無い（API 側は instance-info-api のリポジトリで別にリリースする）。

### GitHub Release のノート

GitHub の自動生成（前回のタグからマージされた PR の一覧と Full Changelog・英語）。分類は
[.github/release.yml](../.github/release.yml) で、Renovate の PR（`dependencies` ラベル）を
`Dependencies` に、それ以外を `Changes` に分ける。同じノートをデプロイの PR 本文にも使う。

- **前回のタグを明示している**（`previous_tag_name`）。省くと GitHub は前回の「Release」を起点にするので、
  Release を作っていない範囲があると起点がずれる
- `.github/release.yml` は、ノートを作る対象のコミット（タグの位置）から読まれる

### うまくいかないとき

- **デプロイの PR が出ない**: `create-k8s-pr` のログを見る。マニフェストの `image:` の行が書き換わらなかった
  （マニフェストの書式が変わった）ときは、わざと赤で止めている。検査が赤なら、そもそも `release` と
  `create-k8s-pr` は動かない
- **失敗した実行を作り直したい**: Actions の画面で、その実行を Re-run する（失敗したジョブだけでもよい）
- **Tag a release が「Nothing to release」で止まる**: 前回のタグから main にコミットが無い
