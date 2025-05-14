FROM denoland/deno:alpine-2.3.1

WORKDIR /app

COPY packages/download packages/download
COPY packages/json-server packages/json-server
COPY packages/typesense-manager packages/typesense-manager
COPY packages/interface packages/interface
COPY deno.json ./deno.json
COPY deno.lock ./deno.lock
COPY main.ts ./main.ts

RUN deno cache packages/json-server/app.ts

VOLUME /app/data

CMD ["deno", "task", "start:json-server"]