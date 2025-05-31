import fs from "fs-extra";
import path from "node:path";

export async function filterValidFolders(baseFolder: string) {
  const folderNames = await fs.readdir(baseFolder);
  const arr = [];
  for (const folderName of folderNames) {
    const folderPath = path.join(baseFolder, folderName);
    const folderStat = await fs.stat(folderPath);
    if (!folderStat.isDirectory()) {
      continue;
    }
    const dbPath = path.join(folderPath, "db.json");
    const exists = await fs.pathExists(dbPath);
    if (!exists) {
      continue;
    }
    arr.push(folderName);
  }

  return arr;
}
