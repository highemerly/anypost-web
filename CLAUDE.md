# CLAUDE.md

## 概要

AnyPost（https://anypost.dev）のフロントエンド。Mastodon・Misskey などへの共有画面を組み立てる Vue 3 の SPA で、
本番は nginx のイメージで k8sg1 に載る。サーバーの種類の判定は別リポジトリの API（instance-info-api、`/api/v1/instances/{name}`）が行う。

## ブランチ（必ず守ること）

- **main へ直接コミットしない。** 作業を始めるときにブランチを切り、PR で取り込む（手順と理由は `docs/development.md`）

## コマンド

- `npm run serve` - 開発サーバー
- `npm run build` - 本番ビルド
- `npm run lint -- --no-fix` - ESLint（CI と同じ。`--no-fix` を付けないと自動修正する）
