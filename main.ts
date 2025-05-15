import fs from "fs-extra";
import path from "node:path";
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
  log("cron job running isCron: ", isCron);

  try {
    const client = await getTypesenseClient();
    const __dirname = import.meta.dirname!;
    const basePath = path.join(__dirname, "data");
    const { created, dirPath, dataJsonPath, version } = await downloadData(
      basePath
    );
    if (!created) {
      log("created false NO NEW DATA");
      return;
    }
    log("created true");

    log("typesense is running");
    const { dbJsonPath, dbJsonData } = await createDbJsonForJsonServer(
      dataJsonPath
    );
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
  }
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

function log(...args: any[]) {
  console.log("--------->>>>>>>>> ", new Date().toISOString(), ...args);
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
  return client;
}
