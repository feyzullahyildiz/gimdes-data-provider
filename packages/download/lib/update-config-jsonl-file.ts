import fs from "fs-extra";
import path from "node:path";

export async function updateConfigJsonLinesFile(configPath: string, newVersion: string) {
    const filePath = path.join(configPath, "config.jsonl");
    await fs.ensureDir(configPath);
    const json = JSON.stringify({
        version: newVersion,
        date: new Date().toISOString(),
    })
    await fs.appendFile(filePath, `${json}\n`);
}

