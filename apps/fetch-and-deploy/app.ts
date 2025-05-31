import path from "node:path";
import fs from "fs-extra";

import {
  downloadData,
  createDbJsonForJsonServer,
  updateConfigJsonLinesFile,
} from "@scope/download";

import {
  createTypesenseClient,
  createTypesenseCollectionsFromDbJson,
} from "@scope/typesense-manager";

let isRunning = false;
async function run(isCron: boolean) {
  if (isRunning) {
    log("cron job already running");
    return;
  }
  isRunning = true;
  log("RUN STARTED isCron: ", isCron);

  try {
    const client = await getTypesenseClient();
    const basePath = path.join(Deno.cwd(), "data");

    const { created, version, hashValue } = await downloadData(basePath);
    if (!created) {
      log("created false NO NEW DATA");
      return;
    }
    log("created true");
    const { dataJsonPath } = await renameVersionToLatest(basePath, version);
    log("dataJsonPath", dataJsonPath);
    log("createDbJsonForJsonServer STARTED");
    const { dbJsonPath, dbJsonData } = await createDbJsonForJsonServer(
      dataJsonPath,
      hashValue
    );
    log("createDbJsonForJsonServer DONE");
    log("dbJsonPath", dbJsonPath);
    log("inserting new data into typesense");
    await createTypesenseCollectionsFromDbJson(client, version, dbJsonData);
    log("inserting new data into typesense DONE");

    const jsonServerKillUrl = Deno.env.get("JSON_SERVER_KILL_URL");
    if (jsonServerKillUrl) {
      log("killing json server");
      log("jsonServerKillUrl", jsonServerKillUrl);
      await fetch(jsonServerKillUrl).catch((e) => {
        log("error killing json server", e);
      });
      log("json server killed");
    } else {
      log("no json server kill url");
    }
    await updateConfigJsonLinesFile(basePath, version, created);
  } catch (error) {
    log("error", error);
    console.trace();
  } finally {
    isRunning = false;
    log("RUN FINISHED");
  }
}

function log(...args: unknown[]) {
  console.log("-> ", new Date().toISOString(), ...args);
}

async function getTypesenseClient() {
  const connection = {
    host: Deno.env.get("TYPESENSE_HOST") || "localhost",
    port: Number(Deno.env.get("TYPESENSE_PORT")) || 8108,
    protocol: Deno.env.get("TYPESENSE_PROTOCOL") || "http",
  };
  const apiKey = Deno.env.get("TYPESENSE_API_KEY");
  log("connection", connection);
  log("apiKey", apiKey);
  if (!apiKey) {
    throw new Error("no typesense api key");
  }
  const client = await createTypesenseClient(connection, apiKey!);
  log("checking typesense health");
  const { ok } = await client.health.retrieve();

  if (!ok) {
    throw new Error("typesense is not running");
  }
  log("typesense is running");
  return client;
}

run(false);

Deno.cron(
  "Cron JOB",
  Deno.env.get("CRON_JOB_INTERVAL") || "* * * * *",
  { backoffSchedule: [60_000, 120_000, 300_000] },
  async () => {
    log("cron job running");
    await run(true);
  }
);

async function renameVersionToLatest(basePath: string, version: string) {
  const nextVersion = "latest";
  const source = path.join(basePath, version);
  const target = path.join(basePath, nextVersion);
  if (await fs.exists(target)) {
    await fs.remove(target);
  }
  await fs.copy(source, target);

  if (await fs.exists(source)) {
    await fs.remove(source);
  }
  return {
    dataJsonPath: path.join(target, "data.json"),
    version: nextVersion,
  };
}
