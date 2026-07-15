FROM node:20.15.1-alpine3.20 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .

FROM node:20.15.1-alpine3.20 AS production

RUN apk add --no-cache tini=0.19.0-r3

RUN addgroup -g 1001 appgroup && \
    adduser -D -u 1001 -G appgroup appuser

WORKDIR /app

COPY --from=builder --chown=appuser:appgroup /app/node_modules ./node_modules
COPY --from=builder --chown=appuser:appgroup /app/package*.json ./
COPY --from=builder --chown=appuser:appgroup /app/app.js ./
COPY --from=builder --chown=appuser:appgroup /app/app-secure-config.js ./

ENV APP_ENTRY=app.js

USER appuser:appgroup

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

ENTRYPOINT ["/sbin/tini", "--"]
CMD node $APP_ENTRY