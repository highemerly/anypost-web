# syntax=docker/dockerfile:1

# ============================================
# Stage 1: ビルド
# ============================================
FROM node:18-alpine AS builder
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
FROM nginx:alpine AS runner

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
