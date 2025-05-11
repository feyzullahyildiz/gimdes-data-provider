import fs from "fs-extra";
import path from "node:path";
import { Buffer } from "node:buffer";
import { getHashValueFromArrayBuffer } from "./lib/get-hash-value.ts";
import { getHelalGidaGuncellemePaketi } from "./lib/get-helal-gida-guncelleme-paketi.ts";

export async function downloadData(basePath: string) {
  await fs.ensureDir(basePath);
  const response = await getHelalGidaGuncellemePaketi();
  const arrayBuffer = await response.arrayBuffer();
  const hashValue = getHashValueFromArrayBuffer(arrayBuffer);

  const date = new Date().toISOString();

  const folderNames = await fs.readdir(basePath);

  const isFolderExists = folderNames.some((fn) =>
    fn.endsWith(`___${hashValue}`)
  );

  if (isFolderExists) {
    console.log("Folder already exists");
    return;
  }

  const folderPath = path.join(basePath, `${date}___${hashValue}`);

  await fs.ensureDir(folderPath);

  const filePath = path.join(folderPath, "data.json");
  await fs.writeFile(filePath, Buffer.from(arrayBuffer));

  console.log(hashValue);
}
