import fs from "fs-extra";
import path from "node:path";
import { format } from "@std/datetime";
import { Buffer } from "node:buffer";
import { getHashValueFromArrayBuffer } from "./get-hash-value.ts";
import { getHelalGidaGuncellemePaketi } from "./get-helal-gida-guncelleme-paketi.ts";
import { isResponseValid } from "./is-response-valid.ts";

const LATEST_VERSION = "latest";
export async function downloadData(basePath: string) {
  await fs.ensureDir(basePath);
  const response = await getHelalGidaGuncellemePaketi();

  const cloneResponse = response.clone();
  const resAsJson = await cloneResponse.json();
  const resAsArrayBuffer = await response.arrayBuffer();

  const hashValue = getHashValueFromArrayBuffer(resAsArrayBuffer);

  const latestDataHashValue = await getLatestDataHashValue(basePath);
  if (latestDataHashValue === hashValue) {
    const folder = path.join(basePath, LATEST_VERSION);

    return {
      created: false,
      dirPath: folder,
      dataJsonPath: path.join(folder, "data.json"),
      latestDirPath: folder,
      version: LATEST_VERSION,
    };
  }

  if (!isResponseValid(resAsJson)) {
    throw new Error("Response is not valid");
  }
  const date = format(new Date(), "yyyy-MM-dd--HH-mm-ss");

  const folderNames = await fs.readdir(basePath);

  const lastFolder = folderNames.find((fn) => fn.endsWith(`___${hashValue}`));

  if (lastFolder) {
    const folder = path.join(basePath, lastFolder);
    return {
      created: false,
      dirPath: folder,
      dataJsonPath: path.join(folder, "data.json"),
      latestDirPath: await ensureLatestFolder(folder),
      version: lastFolder,
    };
  }
  const tempVersion = `${date}___${hashValue}`;
  const dirPath = path.join(basePath, tempVersion);

  await fs.ensureDir(dirPath);

  const dataJsonPath = path.join(dirPath, "data.json");
  await fs.writeFile(dataJsonPath, Buffer.from(resAsArrayBuffer));

  return {
    created: true,
    dirPath,
    dataJsonPath,
    latestDirPath: await ensureLatestFolder(dirPath),
    version: tempVersion,
  };
}

async function ensureLatestFolder(dirPath: string) {
  const lastestDirPath = path.join(dirPath, "..", LATEST_VERSION);

  if (await fs.exists(lastestDirPath)) {
    await fs.rm(lastestDirPath, { recursive: true, force: true });
  }

  await fs.copy(dirPath, lastestDirPath);
  return lastestDirPath;
}

async function getLatestDataHashValue(basePath: string) {
  const filePath = path.join(basePath, LATEST_VERSION, "data.json");
  if (!(await fs.exists(filePath))) {
    return null;
  }
  const dataJsonBuffer = await fs.readFile(filePath);
  const hashValue = getHashValueFromArrayBuffer(dataJsonBuffer);
  return hashValue;
}
