import fs from "fs-extra";
import path from "node:path";
import { htmlToText } from "html-to-text";
import type { IJsonServerFirmaItem, IJsonServerDbJson } from "@scope/interface";
import type { IResponseGetHelalGidaGuncellemePaketi } from "./interface-get-helal-gida-guncelleme-paketi.ts";

export async function createDbJsonForJsonServer(dataJsonPath: string) {
  const data = (await fs.readJSON(dataJsonPath, {
    encoding: "utf-8",
  })) as IResponseGetHelalGidaGuncellemePaketi;

  const baseFolder = path.dirname(dataJsonPath);

  const dbJsonPath = path.join(baseFolder, "db.json");
  const dbJsonData: IJsonServerDbJson = {
    sertifikalar: data.GecerliSertifikaListesi.map((s) => ({
      id: s.SertifikaId.toString(),
      ...s,
      SertifikaResimleri: JSON.parse(s.SertifikaResimleri || "[]"),
      unstable_SertifikaKapsami: parseHtmlAsArray(s.SertifikaKapsami || ""),
      unstable_Tarihce: parseHtmlAsArray(s.Tarihce || ""),
    })),
    kategoriler: data.KategoriListesi.map((k) => ({
      id: k.Id.toString(),
      ...k,
    })),
    firmalar: getFirmalar(data),
  };
  await fs.writeJSON(dbJsonPath, dbJsonData);
  return {
    dbJsonPath,
    dbJsonData,
  };
}

function parseHtmlAsArray(html: string) {
  const text = htmlToText(html, {
    wordwrap: false,
    preserveNewlines: true,
    selectors: [
      { selector: "br", format: "lineBreak" },
      { selector: "p", format: "paragraph" },
    ],
  });
  return text
    .replace(/\\n/g, "\n") // JSON'daki \n kaçışlarını normale çevir
    .split(/\n+/) // 1 veya daha fazla boşluk satırına göre ayır
    .map((line) => line.trim())
    .filter(Boolean); // boş string'leri çıkar
}

function getFirmalar(data: IResponseGetHelalGidaGuncellemePaketi) {
  const map = new Map< number,IJsonServerFirmaItem>();
  for (const sertifika of data.GecerliSertifikaListesi) {
    if (map.has(sertifika.FirmaId)) {
      map
        .get(sertifika.FirmaId)!
        .sertifikaIds.push(sertifika.SertifikaId.toString());
    } else {
      map.set(sertifika.FirmaId, {
        id: sertifika.FirmaId.toString(),
        sertifikaIds: [sertifika.SertifikaId.toString()],
        FirmaId: sertifika.FirmaId,
        FirmaAdi: sertifika.FirmaAdi,
        FirmaAdresi: sertifika.FirmaAdresi,
        FirmaTelefon: sertifika.FirmaTelefon,
        FirmaIletisimEmail: sertifika.FirmaIletisimEmail,
        FirmaIl: sertifika.FirmaIl,
        FirmaUlke: sertifika.FirmaUlke,
      });
    }
  }

  return Array.from(map.values());
}
