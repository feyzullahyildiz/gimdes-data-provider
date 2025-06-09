import type { IJsonServerSertifikaItem, IKategoriListesi } from "@scope/interface";

export function getMappedKategori(data: IKategoriListesi[], sertifikalar: IJsonServerSertifikaItem[]) {
  const nextItem = getNextData();
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
      kapsam: Array.from(new Set(sertifikalar.map(s => s.unstable_SertifikaKapsami).flat(Infinity)))
    };
  });
}


function getNextData() {
  return [
    { 
      Id: 4, 
      KategoriAdi: "Ambalaj/ Packaging", 
      name: "Ambalaj",
      keywords: ["ambalaj", "paketleme", "kutu", "şişe", "poşet"],
      emoji: "📦📋"
    },
    {
      Id: 52,
      KategoriAdi: "Aromalar ve Esanslar/ Flavors and Fragrances",
      name: "Aromalar",
      keywords: ["aroma", "esans", "koku", "parfüm", "kokulu"],
      emoji: "🌸🌺"
    },
    {
      Id: 43,
      KategoriAdi:
        "Aromatik Yağlar ve Aromatik Çaylar/ Aromatic Oils and Aromatic Teas",
      name: "Aromatik Yağlar",
      keywords: ["aromatik", "yağ", "çay", "bitki çayı", "esansiyel yağ"],
      emoji: "🫖🌿"
    },
    { 
      Id: 5, 
      KategoriAdi: "Baharat/ Spices", 
      name: "Baharat",
      keywords: ["baharat", "tarçın", "karabiber", "kekik", "nane"],
      emoji: "🌶️🧄"
    },
    { 
      Id: 6, 
      KategoriAdi: "Bakliyat/ Legumes", 
      name: "Bakliyat",
      keywords: ["fasulye", "nohut", "mercimek", "barbunya", "börülce"],
      emoji: "🫘🌱"
    },
    { 
      Id: 7, 
      KategoriAdi: "Bal/ Honey", 
      name: "Bal",
      keywords: ["bal", "arı", "doğal", "çiçek balı", "kestane balı"],
      emoji: "🍯🐝"
    },
    {
      Id: 49,
      KategoriAdi: "Bebek ve Çocuk Beslenmesi/ Baby Foods",
      name: "Bebek Maması",
      keywords: ["bebek", "mama", "beslenme", "çocuk", "süt tozu"],
      emoji: "🍼👶"
    },
    {
      Id: 15,
      KategoriAdi: "Beyaz Et (Tavuk ve Hindi)/ White Meat (Chicken and Turkey)",
      name: "Beyaz Et",
      keywords: ["tavuk", "hindi", "beyaz et", "piliç", "kanatlı"],
      emoji: "🐔🦃"
    },
    {
      Id: 8,
      KategoriAdi:
        "Bisküvi, Çikolata, Kek, Cips ve Şekerleme/ Biscuits, Chocolate, Cake, Chips and Confectionery",
      name: "Atıştırmalık",
      keywords: ["bisküvi", "çikolata", "kek", "cips", "şeker", "tatlı"],
      emoji: "🍪🍫"
    },
    {
      Id: 30,
      KategoriAdi: "Bitkisel Yağ/ Vegetable oils",
      name: "Bitkisel Yağ",
      keywords: ["yağ", "zeytinyağı", "ayçiçek yağı", "mısır yağı", "soya yağı"],
      emoji: "🫒🌻"
    },
    {
      Id: 37,
      KategoriAdi: "Catering ve Restorant/ Catering and Restaurant",
      name: "Catering",
      keywords: ["catering", "restoran", "yemek servisi", "toplu beslenme"],
      emoji: "🍽️🏢"
    },
    {
      Id: 12,
      KategoriAdi: "Dondurma ve Meyveli Buzlar/ Ice Cream",
      name: "Dondurma",
      keywords: ["dondurma", "buz", "meyveli buz", "sorbet", "kulfi"],
      emoji: "🍦🧊"
    },
    { 
      Id: 29, 
      KategoriAdi: "Ekmek Mayası/ Bread yeast", 
      name: "Ekmek Mayası",
      keywords: ["maya", "ekmek mayası", "hamur mayası", "fırın"],
      emoji: "🍞🦠"
    },
    {
      Id: 51,
      KategoriAdi: "Gıda Dışı Katkı Maddeleri/ Non-Food additives",
      name: "Gıda Dışı Katkılar",
      keywords: ["katkı", "gıda dışı", "endüstriyel", "kimyasal"],
      emoji: "⚗️🔬"
    },
    {
      Id: 10,
      KategoriAdi: "Gıda Katkı Maddeleri/ Food Additives",
      name: "Gıda Katkıları",
      keywords: ["katkı maddesi", "koruyucu", "renklendirici", "tatlandırıcı"],
      emoji: "🧪⚗️"
    },
    {
      Id: 47,
      KategoriAdi: "Giyim ve Tekstil/ Clothing & Textile",
      name: "Tekstil",
      keywords: ["giyim", "tekstil", "kumaş", "elbise", "pamuk"],
      emoji: "👕🧵"
    },
    {
      Id: 18,
      KategoriAdi:
        "Helva, Reçel, Lokum, Pişmaniye ve Tatlılar/ Halva, Jam, Turkish Delight and Desserts",
      name: "Geleneksel Tatlılar",
      keywords: ["helva", "reçel", "lokum", "pişmaniye", "tatlı", "şerbet"],
      emoji: "🍬🎂"
    },
    {
      Id: 35,
      KategoriAdi: "İşlenmiş Et Ürünleri/ Processed Meat",
      name: "İşlenmiş Et",
      keywords: ["salam", "sosis", "sucuk", "pastırma", "kavurma"],
      emoji: "🥓🌭"
    },
    { 
      Id: 16, 
      KategoriAdi: "Kırmızı Et/ Red Meat", 
      name: "Kırmızı Et",
      keywords: ["dana", "kuzu", "koyun", "kırmızı et", "kasap"],
      emoji: "🥩🐄"
    },
    {
      Id: 45,
      KategoriAdi:
        "Kozmetik ve Kişisel Bakım Ürünleri/ Cosmetics and Personal Care Products",
      name: "Kozmetik",
      keywords: ["kozmetik", "kişisel bakım", "şampuan", "sabun", "krem"],
      emoji: "💄🧴"
    },
    {
      Id: 19,
      KategoriAdi: "Kuruyemiş, Kurutulmuş Meyve ve Sebze/ Dried Fruits",
      name: "Kuruyemiş",
      keywords: ["kuruyemiş", "kuru meyve", "fındık", "badem", "ceviz"],
      emoji: "🥜🍇"
    },
    { 
      Id: 21, 
      KategoriAdi: "Makarna/ Macaroni", 
      name: "Makarna",
      keywords: ["makarna", "spagetti", "erişte", "börek", "hamur işi"],
      emoji: "🍝🍜"
    },
    {
      Id: 54,
      KategoriAdi: "Meşrubatlar (Madensuyu, Şıralar, Şerbetler vb.)/ Beverages",
      name: "Meşrubat",
      keywords: ["içecek", "maden suyu", "şıra", "şerbet", "gazlı içecek"],
      emoji: "🥤🫧"
    },
    {
      Id: 22,
      KategoriAdi:
        "Meyve Suyu, Konsantre ve Püreleri/ Fruit Juice, Concentrate and Puree",
      name: "Meyve Suyu",
      keywords: ["meyve suyu", "konsantre", "püre", "elma suyu", "portakal suyu"],
      emoji: "🧃🍊"
    },
    { 
      Id: 56, 
      KategoriAdi: "Mısır Cips vs", 
      name: "Mısır Ürünleri",
      keywords: ["mısır", "cips", "patlamış mısır", "mısır gevreği"],
      emoji: "🌽🍿"
    },
    {
      Id: 23,
      KategoriAdi:
        "Nişasta, Glikoz Şurupları ve Doğal Tatlandırıcılar/ Starch, Glucose Syrups, and Natural Sweeteners",
      name: "Nişasta ve Şeker",
      keywords: ["nişasta", "glikoz", "şurup", "tatlandırıcı", "fruktoz"],
      emoji: "🍯🍬"
    },
    { 
      Id: 59, 
      KategoriAdi: "Oyuncak/Toy", 
      name: "Oyuncak",
      keywords: ["oyuncak", "çocuk", "bebek", "eğlence", "oyun"],
      emoji: "🧸🎮"
    },
    { 
      Id: 11, 
      KategoriAdi: "Özel Gıdalar/ Special Foods", 
      name: "Özel Gıdalar",
      keywords: ["özel gıda", "diyet", "glütensiz", "organik", "fonksiyonel"],
      emoji: "🌿💚"
    },
    {
      Id: 13,
      KategoriAdi:
        "Peynir Mayaları ve Starter Kültürler/ Rennet and Starter Cultures",
      name: "Peynir Mayası",
      keywords: ["peynir mayası", "starter kültür", "ferment", "maya"],
      emoji: "🧀🦠"
    },
    {
      Id: 25,
      KategoriAdi:
        "Salça, Konserve, Turşu, Soslar/ Tomato Paste, Canned, Pickled, Sauces",
      name: "Konserve ve Soslar",
      keywords: ["salça", "konserve", "turşu", "sos", "domates salçası"],
      emoji: "🥫🍅"
    },
    {
      Id: 9,
      KategoriAdi: "Siyah Çay, Kahve vb./ Tea & Coffee",
      name: "Çay ve Kahve",
      keywords: ["çay", "kahve", "siyah çay", "türk kahvesi", "bitki çayı"],
      emoji: "☕🍵"
    },
    { 
      Id: 26, 
      KategoriAdi: "Su/ Water", 
      name: "Su",
      keywords: ["su", "içme suyu", "maden suyu", "kaynak suyu"],
      emoji: "💧🏔️"
    },
    {
      Id: 3,
      KategoriAdi: "Süt ve Süt Ürünleri/ Milk and Dairy Products",
      name: "Süt ürünleri (Peynir - Yoğurt)",
      keywords: ["süt", "peynir", "yoğurt", "tereyağı", "kaymak"],
      emoji: "🥛🧀"
    },
    {
      Id: 55,
      KategoriAdi: "TAKVİYE EDİCİ GIDALAR/ Supplementary Foods",
      name: "Takviye Gıdalar",
      keywords: ["takviye", "vitamin", "mineral", "besin desteği", "supplement"],
      emoji: "💊🌟"
    },
    {
      Id: 40,
      KategoriAdi: "Temizlik Maddeleri/ Claening Materials",
      name: "Temizlik Ürünleri",
      keywords: ["temizlik", "deterjan", "sabun", "çamaşır suyu", "dezenfektan"],
      emoji: "🧽🧴"
    },
    { 
      Id: 41, 
      KategoriAdi: "Tuz/ Salt", 
      name: "Tuz",
      keywords: ["tuz", "deniz tuzu", "kaya tuzu", "iyotlu tuz"],
      emoji: "🧂⚪"
    },
    { 
      Id: 28, 
      KategoriAdi: "Un/ Flour", 
      name: "Un",
      keywords: ["un", "buğday unu", "beyaz un", "tam buğday unu"],
      emoji: "🌾🥞"
    },
    {
      Id: 14,
      KategoriAdi:
        "Unlu Mamuller ve Pastacılık Malzemeleri/ Bakery and pastry products",
      name: "Fırın Ürünleri",
      keywords: ["ekmek", "börek", "pasta", "hamur işi", "fırın"],
      emoji: "🥖🧁"
    },
    {
      Id: 50,
      KategoriAdi: "Üretim Yardımcı Malzemeler/ Production Auxiliary Materials",
      name: "Üretim Malzemeleri",
      keywords: ["üretim", "yardımcı malzeme", "endüstriyel", "işleme"],
      emoji: "⚙️🏭"
    },
    { 
      Id: 31, 
      KategoriAdi: "Yumurta/ Egg", 
      name: "Yumurta",
      keywords: ["yumurta", "tavuk yumurtası", "organik yumurta", "köy yumurtası"],
      emoji: "🥚🐣"
    },
    { 
      Id: 32, 
      KategoriAdi: "Zeytin ve Çeşitleri/ Olive", 
      name: "Zeytin",
      keywords: ["zeytin", "siyah zeytin", "yeşil zeytin", "salamura"],
      emoji: "🫒🌿"
    },
  ];
}
