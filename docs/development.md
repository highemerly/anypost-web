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

| 変更 | checks（eslint） | e2e（本番イメージのビルド） |
|---|---|---|
| `src/**`・`public/**`・依存（package.json・lockfile）・ビルド設定など、下に無いもの全部 | ✓ | ✓ |
| `.eslintrc.js` | ✓ | – |
| `Dockerfile`・`.dockerignore`・`docker/**`・`docker-compose.yml` | – | ✓ |
| ワークフロー（checks.yml / e2e.yml） | そのワークフローのジョブだけ | 同左 |
| ドキュメント（`*.md`・`docs/**`）・`.claude/**`・`.githooks/**`・ruleset・Renovate 設定・LICENSE・docker-build.yml | – | – |
| `release/*` ブランチ（バージョンの bump だけ） | – | – |

- 結果は `ci-result` に集まる（main の必須チェックはこれだけにする）。成功とスキップは通し、失敗とキャンセルは落とす
- **main への push では回さない。** マージ前に同じ中身をブランチで通しているため
- `npm run build` は checks では回さず、e2e の本番イメージのビルド（Dockerfile の中）で確かめる
