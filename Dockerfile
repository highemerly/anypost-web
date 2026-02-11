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

# nginx 設定をコピー
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# ビルド成果物をコピー
COPY --from=builder /app/dist /usr/share/nginx/html

# ヘルスチェック用
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
