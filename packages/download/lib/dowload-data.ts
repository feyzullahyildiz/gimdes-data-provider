import fs from "fs-extra";
import path from "node:path";
import { format } from "@std/datetime";
import { Buffer } from "node:buffer";
import { getHashValueFromArrayBuffer } from "./get-hash-value.ts";
import { getHelalGidaGuncellemePaketi } from "./get-helal-gida-guncelleme-paketi.ts";

export async function downloadData(basePath: string) {
  await fs.ensureDir(basePath);
  const response = await getHelalGidaGuncellemePaketi();
  const arrayBuffer = await response.arrayBuffer();
  const hashValue = getHashValueFromArrayBuffer(arrayBuffer);

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
  const version = `${date}___${hashValue}`;
  const dirPath = path.join(basePath, version);

  await fs.ensureDir(dirPath);

  const dataJsonPath = path.join(dirPath, "data.json");
  await fs.writeFile(dataJsonPath, Buffer.from(arrayBuffer));

  return {
    created: true,
    dirPath,
    dataJsonPath,
    latestDirPath: await ensureLatestFolder(dirPath),
    version: version,
  };
}

async function ensureLatestFolder(dirPath: string) {
  const lastestDirPath = path.join(dirPath, "..", "latest");

  if (await fs.exists(lastestDirPath)) {
    await fs.rm(lastestDirPath, { recursive: true, force: true });
  }
  
  await fs.copy(dirPath, lastestDirPath);
  return lastestDirPath;
}
