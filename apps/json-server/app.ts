import jsonServer from "npm:json-server";
import path from "node:path";
import { filterValidFolders } from "./lib/filter-valid-folders.ts";

export const app = jsonServer.create();

const BASE_FOLDER = path.join(import.meta.dirname!, "..", "..", "data");
console.log("BASE_FOLDER", BASE_FOLDER);

const validFolderNames = await filterValidFolders(BASE_FOLDER);

console.log("validFolderNames", validFolderNames);

if (validFolderNames.length === 0) {
  console.log("No valid folder names found");
  Deno.exit(1);
}

app.get("/api/docs", (_req, res) => {
  const BASE_URL = Deno.env.get("API_BASE_URL") || "";
  const ulList = validFolderNames
    .map((name) => {
      const keys = ["kategoriler", "firmalar", "sertifikalar", "version"];
      const aList = keys
        .map(
          (key) =>
            `<li><a href="${BASE_URL}/api/${name}/${key}">${key}</a></li>`
        )
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
app.get("/api/list", (_req, res) => {
  res.json(validFolderNames);
});
const middlewares = jsonServer.defaults({ readOnly: true });

for (const folderName of validFolderNames) {
  const router = jsonServer.router(
    path.join(BASE_FOLDER, folderName, "db.json")
  );
  app.use(`/api/${folderName}`, middlewares);

  app.use((req, res, next) => {
    // _tr_sort değerine göre sıralama yapıyoruz.
    const trSortFields = req.query._tr_sort?.toString().split(",") || null;

    if (!trSortFields) {
      return next(); // Eğer _tr_sort yoksa her şeyi default bırak
    }

    // Sıralama yönünü al: önce _tr_order, yoksa _order
    const trSortOrders = req.query._tr_order?.toString().split(",") || [];
    // console.log("trSortOrders", trSortOrders);

    const routerAsAny = router as any;
    const originalRender = routerAsAny.render;

    routerAsAny.render = (req2: any, res2: any) => {
      const data = res2.locals.data;

      if (!Array.isArray(data)) {
        return originalRender(req2, res2); // dizi değilse normal işleyiş
      }

      const sorted = [...data].sort((a, b) => {
        for (let i = 0; i < trSortFields.length; i++) {
          const field = trSortFields[i];

          const order = trSortOrders[i] === "desc" ? -1 : 1;

          const aVal = a[field]?.toString() || "";
          const bVal = b[field]?.toString() || "";
          const cmp = aVal.localeCompare(bVal, "tr", { sensitivity: "base" });
          if (cmp !== 0) return cmp * order; // eşit değilse sıralamayı uygula
        }
        return 0; // tüm alanlar eşitse sıralama değişmesin
      });

      return res2.json(sorted);
    };

    next(); // sıradaki middleware’e devam
  });

  app.use(`/api/${folderName}`, router);
}

app.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000");
});

const rootApp = jsonServer.create();

rootApp.get("/kill", (_req, res) => {
  console.log("KILLING SERVER");
  res.json({ message: "killing" });
  setTimeout(() => {
    Deno.exit(0);
  }, 1000);
});

rootApp.listen(3001, () => {
  console.log("Root server is running on port http://localhost:3001");
});
