import fs from "fs-extra";
import path from "node:path";

export async function updateConfigJsonLinesFile(configPath: string, newVersion: string, created: boolean) {
    const filePath = path.join(configPath, "config.jsonl");
    await fs.ensureDir(configPath);
    const json = JSON.stringify({
        created,
        version: newVersion,
        date: new Date().toISOString(),
    })
    await fs.appendFile(filePath, `${json}\n`);
}

