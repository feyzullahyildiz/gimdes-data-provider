import path from "node:path";
import { downloadData } from "@scope/download"
const __dirname = import.meta.dirname!
const basePath = path.join(__dirname, "data")
console.log("basePath", basePath)

await downloadData(basePath)

