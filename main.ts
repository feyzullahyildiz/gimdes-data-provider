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
    console.log("cron job already running");
    return;
  }
  isRunning = true;
  console.log("cron job running isCron: ", isCron);
  try {
    const __dirname = import.meta.dirname!;
    const basePath = path.join(__dirname, "data");

    const { created, dirPath, dataJsonPath, version } = await downloadData(
      basePath
    );

    if (created) {
      const client = await createTypesenseClient(
        {
          host: Deno.env.get("TYPESENSE_HOST") || "localhost",
          port: Number(Deno.env.get("TYPESENSE_PORT")) || 8108,
          protocol: Deno.env.get("TYPESENSE_PROTOCOL") || "http",
        },
        Deno.env.get("TYPESENSE_API_KEY") || "xyz"
      );
      const { ok } = await client.health.retrieve();
      if (!ok) {
        console.log("typesense is not running");
        return;
      }
      const { dbJsonPath, dbJsonData } = await createDbJsonForJsonServer(
        dataJsonPath
      );
      console.log("dbJsonPath", dbJsonPath);
      console.log("inserting new data into typesense");
      await createTypesenseCollectionsFromDbJson(client, version, dbJsonData);
      console.log("inserting new data into typesense DONE");

      const jsonServerKillUrl = Deno.env.get("JSON_SERVER_KILL_URL");
      if (jsonServerKillUrl) {
        console.log("killing json server");
        console.log("jsonServerKillUrl", jsonServerKillUrl);
        await fetch(jsonServerKillUrl).catch((e) => {
          console.error("error killing json server", e);
        });
        console.log("json server killed");
      } else {
        console.log("no json server kill url");
      }
    }
    console.log("created", created);
    console.log("dirPath", dirPath);
    await updateConfigJsonLinesFile(basePath, version, created);
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
    console.log("cron job running");
    await run(true);
  }
);
