import type { IKategoriListesi } from "@scope/interface";

export function getMappedKategori(data: IKategoriListesi[]) {
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

    };
  });
}


function getNextData() {
  return [
    { 
      Id: 4, 
      KategoriAdi: "Ambalaj/ Packaging", 
      name: "Ambalaj",
      keywords: ["Ambalaj", "Paketleme", "Kutu", "Şişe", "Poşet"],
      emoji: "📦📋"
    },
    {
      Id: 52,
      KategoriAdi: "Aromalar ve Esanslar/ Flavors and Fragrances",
      name: "Aromalar",
      keywords: ["Aroma", "Esans", "Koku", "Parfüm", "Kokulu"],
      emoji: "🌸🌺"
    },
    {
      Id: 43,
      KategoriAdi:
        "Aromatik Yağlar ve Aromatik Çaylar/ Aromatic Oils and Aromatic Teas",
      name: "Aromatik Yağlar",
      keywords: ["Aromatik", "Yağ", "Çay", "Bitki Çayı", "Esansiyel Yağ"],
      emoji: "🫖🌿"
    },
    { 
      Id: 5, 
      KategoriAdi: "Baharat/ Spices", 
      name: "Baharat",
      keywords: ["Baharat", "Tarçın", "Karabiber", "Kekik", "Nane"],
      emoji: "🌶️🧄"
    },
    { 
      Id: 6, 
      KategoriAdi: "Bakliyat/ Legumes", 
      name: "Bakliyat",
      keywords: ["Fasulye", "Nohut", "Mercimek", "Barbunya", "Börülce"],
      emoji: "🫘🌱"
    },
    { 
      Id: 7, 
      KategoriAdi: "Bal/ Honey", 
      name: "Bal",
      keywords: ["Bal", "Arı", "Doğal", "Çiçek Balı", "Kestane Balı"],
      emoji: "🍯🐝"
    },
    {
      Id: 49,
      KategoriAdi: "Bebek ve Çocuk Beslenmesi/ Baby Foods",
      name: "Bebek Maması",
      keywords: ["Bebek", "Mama", "Beslenme", "Çocuk", "Süt Tozu"],
      emoji: "🍼👶"
    },
    {
      Id: 15,
      KategoriAdi: "Beyaz Et (Tavuk ve Hindi)/ White Meat (Chicken and Turkey)",
      name: "Beyaz Et",
      keywords: ["Tavuk", "Hindi", "Beyaz Et", "Piliç", "Kanatlı"],
      emoji: "🐔🦃"
    },
    {
      Id: 8,
      KategoriAdi:
        "Bisküvi, Çikolata, Kek, Cips ve Şekerleme/ Biscuits, Chocolate, Cake, Chips and Confectionery",
      name: "Atıştırmalık",
      keywords: ["Bisküvi", "Çikolata", "Kek", "Cips", "Şeker", "Tatlı"],
      emoji: "🍪🍫"
    },
    {
      Id: 30,
      KategoriAdi: "Bitkisel Yağ/ Vegetable oils",
      name: "Bitkisel Yağ",
      keywords: ["Yağ", "Zeytinyağı", "Ayçiçek Yağı", "Mısır Yağı", "Soya Yağı"],
      emoji: "🫒🌻"
    },
    {
      Id: 37,
      KategoriAdi: "Catering ve Restorant/ Catering and Restaurant",
      name: "Catering",
      keywords: ["Catering", "Restoran", "Yemek Servisi", "Toplu Beslenme"],
      emoji: "🍽️🏢"
    },
    {
      Id: 12,
      KategoriAdi: "Dondurma ve Meyveli Buzlar/ Ice Cream",
      name: "Dondurma",
      keywords: ["Dondurma", "Buz", "Meyveli Buz", "Sorbet", "Kulfi"],
      emoji: "🍨🧊"
    },
    { 
      Id: 29, 
      KategoriAdi: "Ekmek Mayası/ Bread yeast", 
      name: "Ekmek Mayası",
      keywords: ["Maya", "Ekmek Mayası", "Hamur Mayası", "Fırın"],
      emoji: "🍞🔬"
    },
    {
      Id: 51,
      KategoriAdi: "Gıda Dışı Katkı Maddeleri/ Non-Food additives",
      name: "Gıda Dışı Katkılar",
      keywords: ["Katkı", "Gıda Dışı", "Endüstriyel", "Kimyasal"],
      emoji: "⚗️🔬"
    },
    {
      Id: 10,
      KategoriAdi: "Gıda Katkı Maddeleri/ Food Additives",
      name: "Gıda Katkıları",
      keywords: ["Katkı Maddesi", "Koruyucu", "Renklendirici", "Tatlandırıcı"],
      emoji: "🧪⚗️"
    },
    {
      Id: 47,
      KategoriAdi: "Giyim ve Tekstil/ Clothing & Textile",
      name: "Tekstil",
      keywords: ["Giyim", "Tekstil", "Kumaş", "Elbise", "Pamuk"],
      emoji: "👕🧵"
    },
    {
      Id: 18,
      KategoriAdi:
        "Helva, Reçel, Lokum, Pişmaniye ve Tatlılar/ Halva, Jam, Turkish Delight and Desserts",
      name: "Geleneksel Tatlılar",
      keywords: ["Helva", "Reçel", "Lokum", "Pişmaniye", "Tatlı", "Şerbet"],
      emoji: "🍬🎂"
    },
    {
      Id: 35,
      KategoriAdi: "İşlenmiş Et Ürünleri/ Processed Meat",
      name: "İşlenmiş Et",
      keywords: ["Salam", "Sosis", "Sucuk", "Pastırma", "Kavurma"],
      emoji: "🥓🌭"
    },
    { 
      Id: 16, 
      KategoriAdi: "Kırmızı Et/ Red Meat", 
      name: "Kırmızı Et",
      keywords: ["Dana", "Kuzu", "Koyun", "Kırmızı Et", "Kasap"],
      emoji: "🥩🐄"
    },
    {
      Id: 45,
      KategoriAdi:
        "Kozmetik ve Kişisel Bakım Ürünleri/ Cosmetics and Personal Care Products",
      name: "Kozmetik",
      keywords: ["Kozmetik", "Kişisel Bakım", "Şampuan", "Sabun", "Krem"],
      emoji: "💄🧴"
    },
    {
      Id: 19,
      KategoriAdi: "Kuruyemiş, Kurutulmuş Meyve ve Sebze/ Dried Fruits",
      name: "Kuruyemiş",
      keywords: ["Kuruyemiş", "Kuru Meyve", "Fındık", "Badem", "Ceviz"],
      emoji: "🥜🍇"
    },
    { 
      Id: 21, 
      KategoriAdi: "Makarna/ Macaroni", 
      name: "Makarna",
      keywords: ["Makarna", "Spagetti", "Erişte", "Börek", "Hamur İşi"],
      emoji: "🍝🍜"
    },
    {
      Id: 54,
      KategoriAdi: "Meşrubatlar (Madensuyu, Şıralar, Şerbetler vb.)/ Beverages",
      name: "Meşrubat",
      keywords: ["İçecek", "Maden Suyu", "Şıra", "Şerbet", "Gazlı İçecek"],
      emoji: "🥤🫧"
    },
    {
      Id: 22,
      KategoriAdi:
        "Meyve Suyu, Konsantre ve Püreleri/ Fruit Juice, Concentrate and Puree",
      name: "Meyve Suyu",
      keywords: ["Meyve Suyu", "Konsantre", "Püre", "Elma Suyu", "Portakal Suyu"],
      emoji: "🧃🍊"
    },
    { 
      Id: 56, 
      KategoriAdi: "Mısır Cips vs", 
      name: "Mısır Ürünleri",
      keywords: ["Mısır", "Cips", "Patlamış Mısır", "Mısır Gevreği"],
      emoji: "🌽🍿"
    },
    {
      Id: 23,
      KategoriAdi:
        "Nişasta, Glikoz Şurupları ve Doğal Tatlandırıcılar/ Starch, Glucose Syrups, and Natural Sweeteners",
      name: "Nişasta ve Şeker",
      keywords: ["Nişasta", "Glikoz", "Şurup", "Tatlandırıcı", "Fruktoz"],
      emoji: "🌾⚪"
    },
    { 
      Id: 59, 
      KategoriAdi: "Oyuncak/Toy", 
      name: "Oyuncak",
      keywords: ["Oyuncak", "Çocuk", "Bebek", "Eğlence", "Oyun"],
      emoji: "🧸🎮"
    },
    { 
      Id: 11, 
      KategoriAdi: "Özel Gıdalar/ Special Foods", 
      name: "Özel Gıdalar",
      keywords: ["Özel Gıda", "Diyet", "Glütensiz", "Organik", "Fonksiyonel"],
      emoji: "🌿💚"
    },
    {
      Id: 13,
      KategoriAdi:
        "Peynir Mayaları ve Starter Kültürler/ Rennet and Starter Cultures",
      name: "Peynir Mayası",
      keywords: ["Peynir Mayası", "Starter Kültür", "Ferment", "Maya"],
      emoji: "🧀🔬"
    },
    {
      Id: 25,
      KategoriAdi:
        "Salça, Konserve, Turşu, Soslar/ Tomato Paste, Canned, Pickled, Sauces",
      name: "Konserve ve Soslar",
      keywords: ["Salça", "Konserve", "Turşu", "Sos", "Domates Salçası"],
      emoji: "🥫🍅"
    },
    {
      Id: 9,
      KategoriAdi: "Siyah Çay, Kahve vb./ Tea & Coffee",
      name: "Çay ve Kahve",
      keywords: ["Çay", "Kahve", "Siyah Çay", "Türk Kahvesi", "Bitki Çayı"],
      emoji: "☕🍵"
    },
    { 
      Id: 26, 
      KategoriAdi: "Su/ Water", 
      name: "Su",
      keywords: ["Su", "İçme Suyu", "Maden Suyu", "Kaynak Suyu"],
      emoji: "💧🏔️"
    },
    {
      Id: 3,
      KategoriAdi: "Süt ve Süt Ürünleri/ Milk and Dairy Products",
      name: "Süt Ürünleri",
      keywords: ["Süt", "Peynir", "Yoğurt", "Tereyağı", "Kaymak"],
      emoji: "🥛🧀"
    },
    {
      Id: 55,
      KategoriAdi: "TAKVİYE EDİCİ GIDALAR/ Supplementary Foods",
      name: "Takviye Gıdalar",
      keywords: ["Takviye", "Vitamin", "Mineral", "Besin Desteği", "Supplement"],
      emoji: "💊🌟"
    },
    {
      Id: 40,
      KategoriAdi: "Temizlik Maddeleri/ Claening Materials",
      name: "Temizlik Ürünleri",
      keywords: ["Temizlik", "Deterjan", "Sabun", "Çamaşır Suyu", "Dezenfektan"],
      emoji: "🧽🧴"
    },
    { 
      Id: 41, 
      KategoriAdi: "Tuz/ Salt", 
      name: "Tuz",
      keywords: ["Tuz", "Deniz Tuzu", "Kaya Tuzu", "İyotlu Tuz"],
      emoji: "🧂⚪"
    },
    { 
      Id: 28, 
      KategoriAdi: "Un/ Flour", 
      name: "Un",
      keywords: ["Un", "Buğday Unu", "Beyaz Un", "Tam Buğday Unu"],
      emoji: "🌾🥞"
    },
    {
      Id: 14,
      KategoriAdi:
        "Unlu Mamuller ve Pastacılık Malzemeleri/ Bakery and pastry products",
      name: "Fırın Ürünleri",
      keywords: ["Ekmek", "Börek", "Pasta", "Hamur İşi", "Fırın"],
      emoji: "🥖🧁"
    },
    {
      Id: 50,
      KategoriAdi: "Üretim Yardımcı Malzemeler/ Production Auxiliary Materials",
      name: "Üretim Malzemeleri",
      keywords: ["Üretim", "Yardımcı Malzeme", "Endüstriyel", "İşleme"],
      emoji: "⚙️🏭"
    },
    { 
      Id: 31, 
      KategoriAdi: "Yumurta/ Egg", 
      name: "Yumurta",
      keywords: ["Yumurta", "Tavuk Yumurtası", "Organik Yumurta", "Köy Yumurtası"],
      emoji: "🥚🐣"
    },
    { 
      Id: 32, 
      KategoriAdi: "Zeytin ve Çeşitleri/ Olive", 
      name: "Zeytin",
      keywords: ["Zeytin", "Siyah Zeytin", "Yeşil Zeytin", "Salamura"],
      emoji: "��🌿"
    },
  ];
} 