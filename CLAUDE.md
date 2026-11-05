# CLAUDE.md

## 概要

AnyPost（https://anypost.dev）のフロントエンド。Mastodon・Misskey などへの共有画面を組み立てる Vue 3 の SPA で、
本番は nginx のイメージで k8s に載る。サーバーの種類の判定は別リポジトリの API（instance-info-api、`/api/v1/instances/{name}`）が行う。

## ブランチ（必ず守ること）

- **main へ直接コミットしない。** 作業を始めるときにブランチを切り、PR で取り込む（手順と理由は `docs/development.md`）

## 公開リポジトリ

- インフラの非公開の情報（マニフェストのリポジトリ名・パス、クラスタの内部の名前や IP）をコード・docs・コミットメッセージ・PR に書かない。
  ワークフローで要るものはシークレットに置く（Actions のログも公開される）

## コマンド

- `npm run dev` - 開発サーバー（Vite）
- `npm run build` - 本番ビルド
- `npm run lint` - ESLint（CI と同じ）
- E2E: 手順は `e2e/compose.yml` の冒頭（本番イメージ＋偽 API を起動して Playwright）
