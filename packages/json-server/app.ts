//
import express from "express";
import jsonServer from "npm:json-server";
import path from "node:path";
import { filterValidFolders } from "./lib/filter-valid-folders.ts";

export const app = express();

app.use(express.json());

const BASE_FOLDER = path.join(import.meta.dirname!, "..", "..", "data");

const validFolderNames = await filterValidFolders(BASE_FOLDER);

app.get("/api/docs", (_req, res) => {
  const ulList = validFolderNames
    .map((name) => {
      const keys = ["kategoriler", "firmalar", "sertifikalar"];
      const aList = keys
        .map((key) => `<li><a href="/api/${name}/${key}">${key}</a></li>`)
        .join("");
      return `
      <p>${name}</p>
      <ul>${aList}</ul>
      `;
    })
    .join("");
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(`
    <html>
      <body>
        <h1>Docs</h1>
          ${ulList}
      </body>
    </html>
  `);
});
const middlewares = jsonServer.defaults({ readOnly: true });
app.use("/api", middlewares);

for (const folderName of validFolderNames) {
  const router = jsonServer.router(
    path.join(BASE_FOLDER, folderName, "db.json")
  );
  app.use(`/api/${folderName}`, router);
}

app.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000");
});

const rootApp = express();

rootApp.get("/kill", () => {
  console.log("KILLING SERVER");
  Deno.exit(0);
});

rootApp.listen(3001, () => {
  console.log("Root server is running on port http://localhost:3001");
});
