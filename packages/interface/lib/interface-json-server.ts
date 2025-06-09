
export interface IJsonServerKategoriItem {
  id: string;
  Id: number;
  KategoriAdi: string;
  SertifikaSayisi: number;
  name: string;
  keywords: string[];
  emoji: string;
}
export interface IJsonServerFirmaItem {
  id: string;
  sertifikaIds: Array<string>;
  FirmaId: number;
  FirmaAdi: string;
  FirmaAdresi?: string;
  FirmaTelefon?: string;
  FirmaIletisimEmail?: string;
  FirmaIl: string;
  FirmaUlke: string;
}
export interface IJsonServerSertifikaItem {
  id: string;
  FirmaId: number;
  FirmaAdi: string;
  FirmaAdresi?: string;
  FirmaTelefon?: string;
  FirmaIletisimEmail?: string;
  FirmaIl: string;
  FirmaUlke: string;
  SertifikaId: number;
  KategoriId: number;
  KategoriAdi: string;
  MarkaAdi: string;
  MarkaLogosu?: string;
  SertifikaNo: string;
  IlkSertifikaAlimTarihi: string;
  SertifikaBitisTarihi: string;
  YildizSayisi: number;
  GuncellemeTarihi: string;
  Durum: string;
  HanefiOk: boolean;
  HanbeliOk: boolean;
  SafiOk: boolean;
  MalikiOk: boolean;
  SertifikaResimleri?: Array<{
    Filename: string;
    OriginalName: string;
  }>;
  KapsamOnizleme: string;
  Rozet: string;
  BarkodluUrunSayisi: number;
  Tarihce?: string;
  FirmaWebSayfasi?: string;
  KapsamDisi?: string;
  AskiyaAlmaAciklama?: string;
  IptalAciklamasi?: string;

  SertifikaKapsami: string;
  unstable_SertifikaKapsami: string[];
  unstable_Tarihce: string[];
}
export interface IJsonServerDbJson {
  sertifikalar: IJsonServerSertifikaItem[];
  kategoriler: IJsonServerKategoriItem[];
  firmalar: IJsonServerFirmaItem[];
  version: {
    latest: string;
    hash: string;
  };
}
