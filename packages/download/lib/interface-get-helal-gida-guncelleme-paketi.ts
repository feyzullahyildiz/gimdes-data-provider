export interface IResponseGetHelalGidaGuncellemePaketi {
    HdmListesi: HdmListesi[]
    KategoriListesi: KategoriListesi[]
    GecerliSertifikaListesi: GecerliSertifikaListesi[]
    IptalEdilenSertifikaListesi: IptalEdilenSertifikaListesi[]
    SuresiGecenSertifikaListesi: SuresiGecenSertifikaListesi[]
    YenilenmeyenFirmaSertifikaListesi: YenilenmeyenFirmaSertifikaListesi[]
    AskiyaAlinanSertifikaListesi: AskiyaAlinanSertifikaListesi[]
    SonGuncellenenSertifikaListesi: SonGuncellenenSertifikaListesi[]
    // YenilemeSurecindekiSertifikaListesi: any[]
    BasvuruSurecindekiFirmaAdeti: number
  }
  
  export interface HdmListesi {
    Id: number
    Adi: string
    AcikAdres: string
    MarketResimleri: string
    SorumluKisi?: string
    Telefon1?: string
    Telefon2?: string
    Koordinat?: string
    GuncellemeTarihi: string
    UlkeAd: string
    IlAd: string
    IlceAd: string
    SonDenetlemeTarihi: string
    DurumId: number
    AdresAciklama?: string
    SonDenetlemeRaporu?: string
  }
  
  export interface KategoriListesi {
    Id: number
    KategoriAdi: string
    SertifikaSayisi: number
  }
  
  export interface GecerliSertifikaListesi {
    FirmaId: number
    FirmaAdi: string
    FirmaAdresi?: string
    FirmaTelefon?: string
    FirmaIletisimEmail?: string
    FirmaIl: string
    FirmaUlke: string
    SertifikaId: number
    KategoriId: number
    KategoriAdi: string
    MarkaAdi: string
    MarkaLogosu?: string
    SertifikaNo: string
    IlkSertifikaAlimTarihi: string
    SertifikaBitisTarihi: string
    YildizSayisi: number
    GuncellemeTarihi: string
    SertifikaKapsami: string
    Durum: string
    HanefiOk: boolean
    HanbeliOk: boolean
    SafiOk: boolean
    MalikiOk: boolean
    SertifikaResimleri?: string
    KapsamOnizleme: string
    Rozet: string
    BarkodluUrunSayisi: number
    Tarihce?: string
    FirmaWebSayfasi?: string
    KapsamDisi?: string
    AskiyaAlmaAciklama?: string
    IptalAciklamasi?: string
  }
  
  export interface IptalEdilenSertifikaListesi {
    FirmaId: number
    FirmaAdi: string
    FirmaAdresi?: string
    FirmaTelefon: string
    FirmaWebSayfasi?: string
    FirmaIletisimEmail: string
    FirmaIl: string
    FirmaUlke: string
    SertifikaId: number
    KategoriId: number
    KategoriAdi: string
    MarkaAdi: string
    MarkaLogosu: string
    SertifikaNo: string
    IlkSertifikaAlimTarihi: string
    SertifikaBitisTarihi: string
    YildizSayisi: number
    GuncellemeTarihi: string
    SertifikaKapsami: string
    Durum: string
    IptalAciklamasi: string
    HanefiOk: boolean
    HanbeliOk: boolean
    SafiOk: boolean
    MalikiOk: boolean
    KapsamOnizleme: string
    Rozet: string
    BarkodluUrunSayisi: number
    Tarihce: string
    SertifikaResimleri?: string
    KapsamDisi?: string
    AskiyaAlmaAciklama?: string
  }
  
  export interface SuresiGecenSertifikaListesi {
    FirmaId: number
    FirmaAdi: string
    FirmaAdresi?: string
    FirmaTelefon?: string
    FirmaWebSayfasi?: string
    FirmaIletisimEmail?: string
    FirmaIl: string
    FirmaUlke: string
    SertifikaId: number
    KategoriId: number
    KategoriAdi: string
    MarkaAdi: string
    MarkaLogosu?: string
    SertifikaNo: string
    IlkSertifikaAlimTarihi: string
    SertifikaBitisTarihi: string
    YildizSayisi: number
    GuncellemeTarihi: string
    SertifikaKapsami: string
    Durum: string
    HanefiOk: boolean
    HanbeliOk: boolean
    SafiOk: boolean
    MalikiOk: boolean
    SertifikaResimleri?: string
    KapsamOnizleme: string
    Rozet: string
    BarkodluUrunSayisi: number
    Tarihce?: string
    KapsamDisi?: string
  }
  
  export interface YenilenmeyenFirmaSertifikaListesi {
    FirmaId: number
    FirmaAdi: string
    FirmaAdresi: string
    FirmaTelefon: string
    FirmaIletisimEmail: string
    FirmaIl: string
    FirmaUlke: string
    SertifikaId: number
    KategoriId: number
    KategoriAdi: string
    MarkaAdi: string
    MarkaLogosu: string
    IlkSertifikaAlimTarihi: string
    SertifikaBitisTarihi: string
    YildizSayisi: number
    GuncellemeTarihi: string
    SertifikaKapsami: string
    AskiyaAlmaAciklama: string
    Durum: string
    HanefiOk: boolean
    HanbeliOk: boolean
    SafiOk: boolean
    MalikiOk: boolean
    SertifikaResimleri: string
    KapsamOnizleme: string
    Rozet: string
    BarkodluUrunSayisi: number
    Tarihce: string
  }
  
  export interface AskiyaAlinanSertifikaListesi {
    FirmaId: number
    FirmaAdi: string
    FirmaAdresi: string
    FirmaTelefon: string
    FirmaIletisimEmail?: string
    FirmaIl: string
    FirmaUlke: string
    SertifikaId: number
    KategoriId: number
    KategoriAdi: string
    MarkaAdi: string
    MarkaLogosu?: string
    SertifikaNo: string
    IlkSertifikaAlimTarihi: string
    SertifikaBitisTarihi: string
    YildizSayisi: number
    GuncellemeTarihi: string
    SertifikaKapsami: string
    KapsamDisi?: string
    Durum: string
    HanefiOk: boolean
    HanbeliOk: boolean
    SafiOk: boolean
    MalikiOk: boolean
    SertifikaResimleri?: string
    KapsamOnizleme: string
    Rozet: string
    BarkodluUrunSayisi: number
    Tarihce: string
    FirmaWebSayfasi?: string
  }
  
  export interface SonGuncellenenSertifikaListesi {
    FirmaId: number
    FirmaAdi: string
    FirmaAdresi: string
    FirmaTelefon?: string
    FirmaIletisimEmail?: string
    FirmaIl: string
    FirmaUlke: string
    SertifikaId: number
    KategoriId: number
    KategoriAdi: string
    MarkaAdi: string
    MarkaLogosu?: string
    SertifikaNo: string
    IlkSertifikaAlimTarihi: string
    SertifikaBitisTarihi: string
    YildizSayisi: number
    GuncellemeTarihi: string
    SertifikaKapsami: string
    Durum: string
    HanefiOk: boolean
    HanbeliOk: boolean
    SafiOk: boolean
    MalikiOk: boolean
    SertifikaResimleri?: string
    KapsamOnizleme: string
    Rozet: string
    BarkodluUrunSayisi: number
    Tarihce?: string
    FirmaWebSayfasi?: string
    KapsamDisi?: string
    AskiyaAlmaAciklama?: string
  }
  