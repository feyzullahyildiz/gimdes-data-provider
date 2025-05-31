import type { Client } from "typesense";
import type { IJsonServerDbJson } from "@scope/interface";
export const createTypesenseCollectionsFromDbJson = async (
  client: Client,
  dataName: string,
  dbJsonData: IJsonServerDbJson
) => {
  const health = await client.health.retrieve();
  if (!health.ok) {
    console.log("health", health);
    throw new Error("Typesense is not running");
  }

  await createSertifikaCollectionAndImportData(client, dataName, dbJsonData);
  await createKategoriCollectionAndImportData(client, dataName, dbJsonData);
  await createFirmaCollectionAndImportData(client, dataName, dbJsonData);
};

async function createSertifikaCollectionAndImportData(
  client: Client,
  dataName: string,
  dbJsonData: IJsonServerDbJson
) {
  const collectionName = `${dataName}_sertifikalar`;

  const collections = await client.collections().retrieve();
  const collection = collections.find((c) => c.name === collectionName);
  if (collection) {
    await client.collections(collectionName).documents().delete();
    await client.collections(collectionName).delete();
  }

  await client.collections().create({
    name: collectionName,
    fields: [
      { name: "FirmaId", type: "int32" },
      { name: "FirmaAdi", type: "string" },
      { name: "FirmaAdresi", type: "string", optional: true },
      { name: "FirmaTelefon", type: "string", optional: true },
      { name: "FirmaIletisimEmail", type: "string", optional: true },
      { name: "FirmaIl", type: "string" },
      { name: "FirmaUlke", type: "string" },
      { name: "SertifikaId", type: "int32" },
      { name: "KategoriId", type: "int32" },
      { name: "KategoriAdi", type: "string" },
      { name: "MarkaAdi", type: "string" },
      { name: "MarkaLogosu", type: "string", optional: true },
      { name: "SertifikaNo", type: "string" },
      { name: "IlkSertifikaAlimTarihi", type: "string" },
      { name: "SertifikaBitisTarihi", type: "string" },
      { name: "YildizSayisi", type: "int32" },
      { name: "GuncellemeTarihi", type: "string" },
      { name: "Durum", type: "string" },
      { name: "HanefiOk", type: "bool" },
      { name: "HanbeliOk", type: "bool" },
      { name: "SafiOk", type: "bool" },
      { name: "MalikiOk", type: "bool" },
      { name: "SertifikaResimleri", type: "object[]", optional: true },
      { name: "KapsamOnizleme", type: "string" },
      { name: "Rozet", type: "string" },
      { name: "BarkodluUrunSayisi", type: "int32" },
      { name: "Tarihce", type: "string", optional: true },
      { name: "FirmaWebSayfasi", type: "string", optional: true },
      { name: "KapsamDisi", type: "string", optional: true },
      { name: "AskiyaAlmaAciklama", type: "string", optional: true },
      { name: "IptalAciklamasi", type: "string", optional: true },
      { name: "SertifikaKapsami", type: "string" },
      { name: "unstable_SertifikaKapsami", type: "string[]" },
      { name: "unstable_Tarihce", type: "string[]" },
    ],
    enable_nested_fields: true,  
  });

  await client
    .collections(collectionName)
    .documents()
    .import(dbJsonData.sertifikalar);
}

async function createKategoriCollectionAndImportData(
  client: Client,
  dataName: string,
  dbJsonData: IJsonServerDbJson
) {
  const collectionName = `${dataName}_kategoriler`;

  await client.collections().create({
    name: collectionName,
    fields: [
      { name: "Id", type: "int32" },
      { name: "KategoriAdi", type: "string" },
      { name: "SertifikaSayisi", type: "int32" },
    ],
    enable_nested_fields: true,
  });

  await client
    .collections(collectionName)
    .documents()
    .import(dbJsonData.kategoriler);
}

async function createFirmaCollectionAndImportData(
  client: Client,
  dataName: string,
  dbJsonData: IJsonServerDbJson
) {
  const collectionName = `${dataName}_firmalar`;

  await client.collections().create({
    name: collectionName,
    fields: [
      { name: "FirmaId", type: "int32" },
      { name: "FirmaAdi", type: "string" },
      { name: "FirmaAdresi", type: "string", optional: true },
      { name: "FirmaTelefon", type: "string", optional: true },
      { name: "FirmaIletisimEmail", type: "string", optional: true },
      { name: "FirmaIl", type: "string" },
      { name: "FirmaUlke", type: "string" },
      { name: "sertifikaIds", type: "string[]" },
    ],
  });

  await client
    .collections(collectionName)
    .documents()
    .import(dbJsonData.firmalar);
}
