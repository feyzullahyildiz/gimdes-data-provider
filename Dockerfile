FROM denoland/deno:alpine

WORKDIR /app

COPY ./packages ./packages
COPY ./deno.json ./deno.json
COPY ./deno.lock ./deno.lock
COPY ./main.ts ./main.ts

RUN deno cache main.ts

CMD ["deno", "task","start:main"]