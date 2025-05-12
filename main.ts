import path from "node:path";
import { downloadData, createDbJsonForJsonServer, updateConfigJsonLinesFile } from "@scope/download";
const __dirname = import.meta.dirname!;
const basePath = path.join(__dirname, "data");
console.log("basePath", basePath);

const { created, dirPath, latestDirPath, dataJsonPath, version } = await downloadData(
  basePath
);

if (created) {
  const { dbJsonPath } = await createDbJsonForJsonServer(dataJsonPath);
  console.log("dbJsonPath", dbJsonPath);
}
console.log("created", created);
console.log("dirPath", dirPath);
console.log("latestDirPath", latestDirPath);
console.log("dataJsonPath", dataJsonPath);
await updateConfigJsonLinesFile(basePath, version);

// console.log("latestFolder", latestFolder)
