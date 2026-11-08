# syntax=docker/dockerfile:1@sha256:4edf897a3ffa55b89f906fc8cc78afdb3f1834cc9c7083565e611a8a7d5fe99e

# ============================================
# Stage 1: ビルド
# ============================================
FROM node:24-alpine@sha256:a34ab6d7f6f4813f4d0c5469d74685604b962fbdbf5793a7bc7b4998ecb867c8 AS builder
WORKDIR /app

# 依存関係をインストール
COPY package.json package-lock.json* ./
RUN npm ci

# ソースをコピーしてビルド
COPY . .
RUN npm run build

# ============================================
# Stage 2: nginx で静的配信
# ============================================
FROM nginx:alpine@sha256:713fc2ebfd92e8217db451477182ee91944b123d2b1ee9fd5a8c6e91ca6c3a11 AS runner

# nginx 設定テンプレートをコピー（起動時に envsubst で展開される）
COPY docker/default.conf.template /etc/nginx/templates/default.conf.template

# ${API_UPSTREAM} のみを置換対象とする（$host 等の nginx 変数は保護）
ENV NGINX_ENVSUBST_FILTER=API_UPSTREAM
# デフォルトの upstream（docker-compose / docker run の -e で上書き可能）
ENV API_UPSTREAM=https://anypost.dev

# ビルド成果物をコピー
COPY --from=builder /app/dist /usr/share/nginx/html

# ヘルスチェック用（Alpine では localhost が ::1 に解決され、IPv4 だけで待つ nginx に繋がらないため 127.0.0.1）
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1/ || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
