import type { IJsonServerSertifikaItem, IKategoriListesi } from "@scope/interface";
import { getNextKategoriNames } from "./get-next-kategori-names.ts";

export function getMappedKategori(data: IKategoriListesi[], sertifikalar: IJsonServerSertifikaItem[]) {
  const nextItem = getNextKategoriNames();
  return data.map((item) => {
    const rawItem = nextItem.find((rawItem) => rawItem.Id === item.Id);
    if (!rawItem) {
      throw new Error(`Kategori ${item.Id} not found`);
    }
    if (item.KategoriAdi !== rawItem.KategoriAdi) {
      throw new Error(
        `Kategori ${item.Id} adı ${item.KategoriAdi} ile ${rawItem.KategoriAdi} eşleşmiyor`
      );
    }
    return {
      id: item.Id.toString(),
      Id: item.Id,
      KategoriAdi: item.KategoriAdi,
      SertifikaSayisi: item.SertifikaSayisi,
      name: rawItem.name,
      keywords: rawItem.keywords,
      emoji: rawItem.emoji,
      kapsam: Array.from(new Set(sertifikalar
        .filter(s => s.KategoriId === item.Id)
        .map(s => s.unstable_SertifikaKapsami).flat(Infinity)))
    };
  });
}


