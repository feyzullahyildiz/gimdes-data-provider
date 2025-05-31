FROM denoland/deno:alpine-2.3.5

WORKDIR /app

COPY packages packages
COPY apps apps

COPY deno.json ./deno.json
COPY deno.lock ./deno.lock

RUN deno task cache:fetch-and-deploy

VOLUME /app/data

CMD ["deno", "task", "start:fetch-and-deploy"]
