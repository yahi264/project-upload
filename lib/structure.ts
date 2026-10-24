// Catalogue structure: divisions → categories → products.
import type { Locale, T } from "./i18n";

export type Img = { src: string; color: string; w: number; h: number };
export type Product = { slug: string; division: DivisionSlug; category: string; name: T; images: Img[]; description?: T };
export type DivisionSlug = "hotel" | "home" | "promotion" | "export";
// How quantities are counted in a request: pieces, metres of fabric or kilograms of yarn
export type Unit = "pcs" | "m" | "kg";
export type Spec = { label: T; value: T };

export type Division = {
  slug: DivisionSlug;
  name: T;
  tagline: T;
  intro: T;
  cover: string;
  // Photos that rotate on the collection cards
  gallery: string[];
};

export type Category = {
  slug: string;
  division: DivisionSlug;
  name: T;
  tagline: T;
  specs: Spec[];
  sizes: T[];
  options: T[];
  cover: string;
  unit: Unit;
};

const t = (en: string, fr: string, tr: string, ar: string, ru: string): T => ({ en, fr, tr, ar, ru });
const same = (s: string): T => t(s, s, s, s, s);

export const divisions: Division[] = [
  {
    slug: "hotel",
    name: t("Hotel Collection", "Collection Hôtel", "Otel Koleksiyonu", "مجموعة الفنادق", "Коллекция для отелей"),
    tagline: t("Towels, robes, bed linen and amenities for hospitality", "Serviettes, peignoirs, linge de lit et accueil pour l'hôtellerie", "Konaklama için havlu, bornoz, nevresim ve buklet", "مناشف وأرواب ومفروشات ومستلزمات للضيافة", "Полотенца, халаты, бельё и аксессуары для гостеприимства"),
    intro: t(
      "Premium 100% cotton textiles designed to reflect each hotel's identity — from the bathroom to the pool deck.",
      "Textiles premium 100 % coton conçus pour refléter l'identité de chaque hôtel — de la salle de bain à la piscine.",
      "Her otelin kimliğini yansıtmak için tasarlanmış %100 pamuk premium tekstiller — banyodan havuz başına.",
      "منسوجات فاخرة من القطن 100% مصمّمة لتعكس هوية كل فندق — من الحمّام إلى حافة المسبح.",
      "Премиальный текстиль из 100% хлопка, отражающий стиль каждого отеля — от ванной до бассейна.",
    ),
    cover: "/images/p/jacquard-suite-towel-set-4.webp",
    gallery: ["/images/p/jacquard-suite-towel-set-4.webp", "/images/p/classic-shawl-robe-set-1.webp", "/images/p/golden-stripe-satin-1.webp", "/images/p/anchor-towel-set-2.webp"],
  },
  {
    slug: "home",
    name: t("Home Collection", "Collection Maison", "Ev Koleksiyonu", "مجموعة المنزل", "Домашняя коллекция"),
    tagline: t("Bringing out the true value of your living space", "Révéler la vraie valeur de votre intérieur", "Yaşam alanınızın gerçek değerini ortaya çıkarın", "أبرِز القيمة الحقيقية لمساحة معيشتك", "Раскройте истинную ценность вашего дома"),
    intro: t(
      "Bed linen in botanical, hieroglyph, marine and luxury designs — plus mattresses and soft baby textiles.",
      "Linge de lit aux motifs botaniques, hiéroglyphes, marins et luxe — ainsi que matelas et textiles pour bébé.",
      "Botanik, hiyeroglif, denizci ve lüks desenlerde nevresimler — ayrıca yataklar ve yumuşak bebek tekstilleri.",
      "مفروشات أسرّة بتصاميم نباتية وهيروغليفية وبحرية وفاخرة — إضافة إلى المراتب ومنسوجات الأطفال الناعمة.",
      "Постельное бельё в ботаническом, египетском, морском и люкс-дизайне, а также матрасы и детский текстиль.",
    ),
    cover: "/images/p/tropical-hibiscus-1.webp",
    gallery: ["/images/p/tropical-hibiscus-1.webp", "/images/p/gold-stripe-noir-1.webp", "/images/p/sailboat-2.webp", "/images/p/pharaoh-sand-1.webp"],
  },
  {
    slug: "promotion",
    name: t("Promotion Collection", "Collection Promotion", "Promosyon Koleksiyonu", "مجموعة المنتجات الترويجية", "Промо-коллекция"),
    tagline: t("More than solution", "Plus qu'une solution", "Çözümden fazlası", "أكثر من مجرد حل", "Больше, чем решение"),
    intro: t(
      "Branded apparel, accessories, kitchen textiles, bags and gifts that make a distinctive impact for your brand.",
      "Vêtements, accessoires, textiles de cuisine, sacs et cadeaux personnalisés pour un impact de marque distinctif.",
      "Markanız için fark yaratan logolu giyim, aksesuar, mutfak tekstili, çanta ve hediyeler.",
      "ملابس وإكسسوارات ومنسوجات مطبخ وحقائب وهدايا تحمل علامتك وتترك أثرًا مميّزًا.",
      "Брендированная одежда, аксессуары, кухонный текстиль, сумки и подарки, которые выделяют ваш бренд.",
    ),
    cover: "/images/p/promo-hero.webp",
    gallery: ["/images/p/promo-hero.webp", "/images/p/printed-bucket-hat-1.webp", "/images/p/colorblock-sherpa-hoodie-3.webp", "/images/p/red-planner-gift-set-1.webp"],
  },
  {
    slug: "export",
    name: t("Fabric & Yarn Export", "Export de tissus et fils", "Kumaş & İplik İhracatı", "تصدير الأقمشة والخيوط", "Экспорт тканей и пряжи"),
    tagline: t("From fibre to fabric — supplied to the world", "De la fibre au tissu — livrés dans le monde entier", "Liften kumaşa — tüm dünyaya", "من الألياف إلى القماش — نوصلها إلى العالم", "От волокна до ткани — по всему миру"),
    intro: t(
      "Woven fabrics, yarns and filaments for manufacturers in international markets — printed, dyed or greige, reliably sourced and shipped worldwide.",
      "Tissus, fils et filaments pour les fabricants des marchés internationaux — imprimés, teints ou écrus, sourcés de manière fiable et expédiés partout dans le monde.",
      "Uluslararası pazarlardaki üreticiler için dokuma kumaş, iplik ve filamentler — baskılı, boyalı veya ham; güvenilir tedarik, dünya çapında sevkiyat.",
      "أقمشة منسوجة وخيوط وفتائل للمصنّعين في الأسواق الدولية — مطبوعة أو مصبوغة أو خامًا، بتوريد موثوق وشحن إلى كل أنحاء العالم.",
      "Ткани, пряжа и нити для производителей на международных рынках — с печатью, крашеные или суровые, с надёжными поставками по всему миру.",
    ),
    cover: "/images/p/export-warehouse.webp",
    gallery: ["/images/p/export-warehouse.webp", "/images/p/twill-weave-fabric-3.webp", "/images/p/cotton-yarn-1.webp", "/images/p/export-fabric-rolls.webp"],
  },
];

// Shared specification rows
const s = {
  cotton: { label: t("Material", "Matière", "Malzeme", "الخامة", "Материал"), value: t("100% Cotton", "100 % coton", "%100 Pamuk", "قطن 100%", "100% хлопок") },
  stitch: { label: t("Finish", "Finition", "Bitiş", "التشطيب", "Отделка"), value: t("Double stitching", "Double couture", "Çift dikiş", "خياطة مزدوجة", "Двойная строчка") },
  colours: { label: t("Colours", "Couleurs", "Renkler", "الألوان", "Цвета"), value: t("Any colour on request", "Toutes couleurs sur demande", "İstenen her renk", "أي لون حسب الطلب", "Любой цвет по запросу") },
  weaves: { label: t("Techniques", "Techniques", "Teknikler", "التقنيات", "Техники"), value: t("Dobby · Jacquard · Embroidery", "Dobby · Jacquard · Broderie", "Armür · Jakar · Nakış", "دوبي · جاكار · تطريز", "Добби · Жаккард · Вышивка") },
  absorb: { label: t("Performance", "Performance", "Performans", "الأداء", "Свойства"), value: t("Maximum water absorption", "Absorption maximale", "Maksimum su emiciliği", "أقصى امتصاص للماء", "Максимальная впитываемость") },
  satin: { label: t("Fabric", "Tissu", "Kumaş", "القماش", "Ткань"), value: t("Satin / Ranforce", "Satin / Ranforcé", "Saten / Ranforce", "ساتان / رانفورس", "Сатин / Ранфорс") },
  logo: { label: t("Branding", "Marquage", "Markalama", "العلامة", "Брендирование"), value: t("Print · Embroidery · Woven label", "Impression · Broderie · Étiquette tissée", "Baskı · Nakış · Dokuma etiket", "طباعة · تطريز · ملصق منسوج", "Печать · Вышивка · Тканая этикетка") },
  design: { label: t("Design", "Design", "Tasarım", "التصميم", "Дизайн"), value: t("Custom design production", "Production sur mesure", "Özel tasarım üretim", "إنتاج بتصميم خاص", "Производство по вашему дизайну") },
  sustain: { label: t("Production", "Production", "Üretim", "الإنتاج", "Производство"), value: t("Sustainable, certified production", "Production durable et certifiée", "Sürdürülebilir, sertifikalı üretim", "إنتاج مستدام ومعتمد", "Устойчивое сертифицированное производство") },
};

const towelSizes = ["50 × 90 cm", "70 × 140 cm", "90 × 150 cm"].map(same);
const bedSizes = [
  t("Duvet cover 160 × 220 cm", "Housse de couette 160 × 220 cm", "Nevresim 160 × 220 cm", "غطاء لحاف 160 × 220 سم", "Пододеяльник 160 × 220 см"),
  t("Duvet cover 200 × 220 cm", "Housse de couette 200 × 220 cm", "Nevresim 200 × 220 cm", "غطاء لحاف 200 × 220 سم", "Пододеяльник 200 × 220 см"),
  t("Duvet cover 220 × 240 cm", "Housse de couette 220 × 240 cm", "Nevresim 220 × 240 cm", "غطاء لحاف 220 × 240 سم", "Пододеяльник 220 × 240 см"),
  t("Bed sheet 160 × 240 cm", "Drap 160 × 240 cm", "Çarşaf 160 × 240 cm", "ملاءة 160 × 240 سم", "Простыня 160 × 240 см"),
  t("Bed sheet 200 × 240 cm", "Drap 200 × 240 cm", "Çarşaf 200 × 240 cm", "ملاءة 200 × 240 سم", "Простыня 200 × 240 см"),
  t("Bed sheet 180 × 280 cm", "Drap 180 × 280 cm", "Çarşaf 180 × 280 cm", "ملاءة 180 × 280 سم", "Простыня 180 × 280 см"),
  t("Bed sheet 280 × 280 cm", "Drap 280 × 280 cm", "Çarşaf 280 × 280 cm", "ملاءة 280 × 280 سم", "Простыня 280 × 280 см"),
  t("Pillowcase 50 × 70 cm", "Taie 50 × 70 cm", "Yastık kılıfı 50 × 70 cm", "كيس وسادة 50 × 70 سم", "Наволочка 50 × 70 см"),
  t("Pillowcase 70 × 70 cm", "Taie 70 × 70 cm", "Yastık kılıfı 70 × 70 cm", "كيس وسادة 70 × 70 سم", "Наволочка 70 × 70 см"),
];
const homeBedSizes = [
  t("Single set", "Parure 1 personne", "Tek kişilik takım", "طقم مفرد", "Полуторный комплект"),
  t("Double set", "Parure 2 personnes", "Çift kişilik takım", "طقم مزدوج", "Двуспальный комплект"),
  t("King set", "Parure King", "King takım", "طقم كينغ", "Комплект King"),
  t("Custom size", "Taille sur mesure", "Özel ölçü", "مقاس خاص", "Свой размер"),
];
const apparelSizes = ["XS", "S", "M", "L", "XL", "XXL"].map(same);
const standard = [t("Standard", "Standard", "Standart", "قياسي", "Стандарт"), t("Custom size", "Taille sur mesure", "Özel ölçü", "مقاس خاص", "Свой размер")];
const robeSizes = ["S", "M", "L", "XL", "XXL"].map(same);
const babySizes = [t("0–6 months", "0–6 mois", "0–6 ay", "0–6 أشهر", "0–6 мес."), t("6–12 months", "6–12 mois", "6–12 ay", "6–12 شهرًا", "6–12 мес."), t("12–24 months", "12–24 mois", "12–24 ay", "12–24 شهرًا", "12–24 мес.")];

const o = {
  dobby: t("Dobby border", "Bordure dobby", "Armürlü bordür", "حافة دوبي", "Бордюр добби"),
  jacq: t("Jacquard logo", "Logo jacquard", "Jakar logo", "شعار جاكار", "Жаккардовый логотип"),
  emb: t("Embroidered logo", "Logo brodé", "Nakışlı logo", "شعار مطرّز", "Вышитый логотип"),
  print: t("Printed logo", "Logo imprimé", "Baskılı logo", "شعار مطبوع", "Печатный логотип"),
  woven: t("Woven label", "Étiquette tissée", "Dokuma etiket", "ملصق منسوج", "Тканая этикетка"),
  plain: t("Plain", "Uni", "Düz", "سادة", "Без нанесения"),
  foot: t("Footprint design", "Motif empreintes", "Ayak izi deseni", "تصميم آثار الأقدام", "Узор «следы»"),
  satin: t("Satin", "Satin", "Saten", "ساتان", "Сатин"),
  ranforce: t("Ranforce", "Ranforcé", "Ranforce", "رانفورس", "Ранфорс"),
  stripes: t("With stripes", "Avec rayures", "Çizgili", "مع خطوط", "С полосами"),
  noStripes: t("Without stripes", "Sans rayures", "Çizgisiz", "بدون خطوط", "Без полос"),
  sublim: t("Full-colour sublimation", "Sublimation couleur", "Tam renk süblimasyon", "طباعة تسامي ملوّنة", "Полноцветная сублимация"),
};

const towelSpecs = [s.cotton, s.stitch, s.colours, s.weaves, s.absorb];
const promoSpecs = [s.logo, s.colours, s.design, s.sustain];

const cat = (
  slug: string,
  division: DivisionSlug,
  name: T,
  tagline: T,
  specs: Spec[],
  sizes: T[],
  options: T[],
  cover: string,
  unit: Unit = "pcs",
): Category => ({ slug, division, name, tagline, specs, sizes, options, cover: `/images/p/${cover}.webp`, unit });

export const categories: Category[] = [
  // Hotel
  cat("towels", "hotel", t("Towels", "Serviettes", "Havlular", "المناشف", "Полотенца"), t("High absorbency · Soft surface · Maximum hygiene", "Haute absorption · Toucher doux · Hygiène maximale", "Yüksek emicilik · Yumuşak yüzey · Maksimum hijyen", "امتصاص عالٍ · ملمس ناعم · نظافة قصوى", "Впитываемость · Мягкость · Гигиена"), towelSpecs, towelSizes, [o.dobby, o.jacq, o.emb, o.plain], "jacquard-suite-towel-set-1"),
  cat("bathrobes", "hotel", t("Bathrobes", "Peignoirs", "Bornozlar", "الأرواب", "Халаты"), t("Terry and velvet robes, designed around your brand", "Peignoirs éponge et velours, à l'image de votre marque", "Markanıza göre tasarlanan havlu ve kadife bornozlar", "أرواب تيري ومخمل مصمّمة لعلامتك", "Махровые и велюровые халаты под ваш бренд"), [{ label: s.cotton.label, value: t("100% Cotton / 100% Cotton velvet", "100 % coton / velours 100 % coton", "%100 Pamuk / %100 Pamuk kadife", "قطن 100% / مخمل قطني 100%", "100% хлопок / 100% хлопковый велюр") }, { label: t("Weight", "Grammage", "Gramaj", "الوزن", "Плотность"), value: same("330 – 400 gsm") }, s.colours, s.absorb, s.design], robeSizes, [o.emb, o.jacq, o.plain], "classic-shawl-robe-set-1"),
  cat("bath-mats", "hotel", t("Bath Mats", "Tapis de bain", "Banyo Paspasları", "دوّاسات الحمّام", "Коврики для ванной"), t("Dense, absorbent and safe underfoot", "Denses, absorbants et sûrs", "Yoğun, emici ve güvenli", "كثيفة وماصّة وآمنة", "Плотные, впитывающие и безопасные"), towelSpecs, towelSizes, [o.foot, o.jacq, o.emb, o.plain], "footprint-classic-mat-1"),
  cat("bed-linen", "hotel", t("Bed Linen", "Linge de lit", "Nevresim & Çarşaf", "مفروشات الأسرّة", "Постельное бельё"), t("Nobility · Elegance · Finesse", "Noblesse · Élégance · Finesse", "Asalet · Zarafet · İncelik", "نُبل · أناقة · رُقي", "Благородство · Элегантность · Изящество"), [s.cotton, s.satin, s.colours, { label: t("Style", "Style", "Stil", "الطراز", "Стиль"), value: t("With / without stripes", "Avec / sans rayures", "Çizgili / çizgisiz", "مع / بدون خطوط", "С полосами / без") }], bedSizes, [o.satin, o.ranforce, o.stripes, o.noStripes], "golden-stripe-satin-1"),
  cat("beach-pool", "hotel", t("Beach & Pool", "Plage & Piscine", "Plaj & Havuz", "الشاطئ والمسبح", "Пляж и бассейн"), t("Unique designs · Maximum efficiency · The brilliance of your brand", "Designs uniques · Efficacité maximale · L'éclat de votre marque", "Eşsiz tasarımlar · Maksimum verim · Markanızın parıltısı", "تصاميم فريدة · كفاءة قصوى · تألّق علامتك", "Уникальный дизайн · Эффективность · Блеск бренда"), towelSpecs, towelSizes, [o.dobby, o.jacq, o.emb, o.plain], "anchor-towel-set-2"),
  cat("amenities", "hotel", t("Amenities & Room Sets", "Accueil & Sets de chambre", "Buklet & Oda Setleri", "مستلزمات الضيافة وأطقم الغرف", "Аксессуары и комплекты для номеров"), t("The finishing touches of a complete guest room", "Les touches finales d'une chambre parfaite", "Eksiksiz bir misafir odasının son dokunuşları", "اللمسات الأخيرة لغرفة ضيوف متكاملة", "Финальные штрихи идеального номера"), [{ label: t("Contents", "Contenu", "İçerik", "المحتويات", "Состав"), value: t("Pouches, slippers, towels, toiletries", "Pochettes, chaussons, serviettes, produits", "Kese, terlik, havlu, buklet", "حقائب وشباشب ومناشف ومستلزمات", "Мешочки, тапочки, полотенца, косметика") }, s.colours, { label: s.logo.label, value: t("Embroidery or print", "Broderie ou impression", "Nakış veya baskı", "تطريز أو طباعة", "Вышивка или печать") }], standard, [o.emb, o.print, o.plain], "complete-room-set-1"),
  // Home
  cat("botanical", "home", t("Botanical Design", "Design Botanique", "Botanik Tasarım", "التصميم النباتي", "Ботанический дизайн"), t("Flowers and leaves that bring the garden indoors", "Fleurs et feuillages qui font entrer le jardin", "Bahçeyi içeri taşıyan çiçekler ve yapraklar", "زهور وأوراق تُدخل الحديقة إلى منزلك", "Цветы и листья, приносящие сад в дом"), [s.cotton, s.satin, s.colours], homeBedSizes, [o.satin, o.ranforce], "tropical-hibiscus-1"),
  cat("hieroglyphs", "home", t("Hieroglyphs Design", "Design Hiéroglyphes", "Hiyeroglif Tasarım", "تصميم الهيروغليفية", "Дизайн «Иероглифы»"), t("Ancient symbols, softly reimagined", "Symboles anciens, réinventés en douceur", "Kadim semboller, yumuşak bir yorumla", "رموز قديمة بلمسة عصرية ناعمة", "Древние символы в мягком прочтении"), [s.cotton, s.satin, s.colours], homeBedSizes, [o.satin, o.ranforce], "pharaoh-sand-1"),
  cat("marine", "home", t("Marine Design", "Design Marin", "Denizci Tasarım", "التصميم البحري", "Морской дизайн"), t("Anchors, sails and the calm of the sea", "Ancres, voiles et le calme de la mer", "Çapalar, yelkenler ve denizin huzuru", "مراسٍ وأشرعة وهدوء البحر", "Якоря, паруса и спокойствие моря"), [s.cotton, s.satin, s.colours], homeBedSizes, [o.satin, o.ranforce], "sailboat-2"),
  cat("luxury", "home", t("Luxury Design", "Design Luxe", "Lüks Tasarım", "التصميم الفاخر", "Люкс-дизайн"), t("Deep tones and rich textures for modern bedrooms", "Tons profonds et textures riches pour chambres modernes", "Modern yatak odaları için derin tonlar ve zengin dokular", "درجات عميقة وملامس غنية لغرف نوم عصرية", "Глубокие оттенки и фактуры для современных спален"), [s.cotton, s.satin, s.colours], homeBedSizes, [o.satin, o.ranforce], "gold-stripe-noir-1"),
  cat("cushions-throws", "home", t("Cushions & Throws", "Coussins & Plaids", "Kırlent & Battaniye", "الوسائد والبطانيات", "Подушки и пледы"), t("Decorative cushions and cosy throws to finish every room", "Coussins décoratifs et plaids douillets pour sublimer chaque pièce", "Her odayı tamamlayan dekoratif kırlentler ve sıcak battaniyeler", "وسائد زخرفية وبطانيات دافئة تُكمل كل غرفة", "Декоративные подушки и уютные пледы для любой комнаты"), [s.cotton, s.colours, s.design], [t("45 × 45 cm", "45 × 45 cm", "45 × 45 cm", "45 × 45 سم", "45 × 45 см"), t("50 × 50 cm", "50 × 50 cm", "50 × 50 cm", "50 × 50 سم", "50 × 50 см"), t("Throw 130 × 170 cm", "Plaid 130 × 170 cm", "Battaniye 130 × 170 cm", "بطانية 130 × 170 سم", "Плед 130 × 170 см"), standard[1]], [o.print, o.jacq, o.emb, o.plain], "pharaoh-cushions-1"),
  cat("mattress", "home", t("Bed & Mattress", "Lit & Matelas", "Yatak & Baza", "السرير والمرتبة", "Кровать и матрас"), t("The foundation of a restful night", "La base d'une nuit réparatrice", "Huzurlu bir gecenin temeli", "أساس ليلة هانئة", "Основа спокойного сна"), [s.colours, s.design], [t("90 × 190 cm", "90 × 190 cm", "90 × 190 cm", "90 × 190 سم", "90 × 190 см"), t("160 × 200 cm", "160 × 200 cm", "160 × 200 cm", "160 × 200 سم", "160 × 200 см"), t("180 × 200 cm", "180 × 200 cm", "180 × 200 cm", "180 × 200 سم", "180 × 200 см"), standard[1]], [o.plain, o.woven], "classic-mattress-1"),
  cat("baby", "home", t("Baby & Kids", "Bébé & Enfant", "Bebek & Çocuk", "الرضّع والأطفال", "Малыши и дети"), t("Soft, playful prints for the little ones", "Imprimés doux et ludiques pour les petits", "Minikler için yumuşak, eğlenceli desenler", "نقوش ناعمة ومرحة للصغار", "Мягкие весёлые принты для малышей"), [s.cotton, s.colours, s.design], babySizes, [o.print, o.emb, o.plain], "baby-sleepsuit-1"),
  // Promotion
  cat("christmas", "promotion", t("Christmas Products", "Produits de Noël", "Yılbaşı Ürünleri", "منتجات عيد الميلاد", "Новогодние товары"), t("Festive gifts and textiles, branded for the season", "Cadeaux et textiles festifs, à vos couleurs pour les fêtes", "Markanıza özel yılbaşı hediyeleri ve tekstilleri", "هدايا ومنسوجات احتفالية تحمل علامتك في موسم الأعياد", "Праздничные подарки и текстиль с вашим брендом"), promoSpecs, standard, [o.print, o.emb, o.woven], "christmas-jumper-1"),
  cat("accessories", "promotion", t("Wristbands, Lanyards & Keychains", "Bracelets, tours de cou et porte-clés", "Bileklik, Boyun Askısı & Anahtarlık", "أساور وحبال تعليق وميداليات", "Браслеты, ланъярды и брелоки"), t("Small items, big brand visibility", "Petits objets, grande visibilité", "Küçük ürünler, büyük marka görünürlüğü", "قطع صغيرة وحضور كبير لعلامتك", "Мелочи с большим эффектом"), promoSpecs, standard, [o.print, o.woven, o.sublim], "remove-before-flight-keychain-3"),
  cat("headwear", "promotion", t("Caps, Hats & Beanies", "Casquettes, chapeaux et bonnets", "Şapka & Bere", "القبعات والطواقي", "Кепки, панамы и шапки"), t("Embroidered caps, printed hats and knitted sets", "Casquettes brodées, chapeaux imprimés et sets tricotés", "Nakışlı şapkalar, baskılı şapkalar ve örgü setler", "قبعات مطرّزة ومطبوعة وأطقم صوفية", "Вышитые кепки, панамы и вязаные наборы"), promoSpecs, standard, [o.emb, o.print, o.woven], "printed-bucket-hat-1"),
  cat("bandanas", "promotion", t("Bandanas & Neck Gaiters", "Bandanas et tours de cou", "Bandana & Boyunluk", "الباندانا وأغطية الرقبة", "Банданы и гейтеры"), t("Printed bandanas and multi-way neck gaiters", "Bandanas imprimés et tours de cou multifonctions", "Baskılı bandanalar ve çok amaçlı boyunluklar", "باندانا مطبوعة وأغطية رقبة متعددة الاستخدامات", "Банданы с печатью и многофункциональные гейтеры"), promoSpecs, standard, [o.print, o.sublim, o.emb], "paisley-bandana-1"),
  cat("apparel", "promotion", t("Sweatshirts, Hoodies & T-Shirts", "Sweats, hoodies et t-shirts", "Sweatshirt, Kapüşonlu & Tişört", "سويت شيرت وهودي وتيشيرت", "Свитшоты, худи и футболки"), t("Comfortable apparel that wears your logo", "Des vêtements confortables qui portent votre logo", "Logonuzu taşıyan rahat giyim", "ملابس مريحة تحمل شعارك", "Удобная одежда с вашим логотипом"), promoSpecs, apparelSizes, [o.print, o.emb, o.sublim], "colorblock-sherpa-hoodie-3"),
  cat("sportswear", "promotion", t("Sportswear & Team Kits", "Sportswear et tenues d'équipe", "Spor Giyim & Takım Formaları", "ملابس رياضية وأطقم الفرق", "Спортивная форма"), t("Jerseys, bibs and kits for every team", "Maillots, chasubles et tenues pour chaque équipe", "Her takım için forma, yelek ve setler", "قمصان وصدريات وأطقم لكل فريق", "Форма и манишки для любой команды"), promoSpecs, apparelSizes, [o.sublim, o.print, o.emb], "training-bibs-4"),
  cat("socks", "promotion", t("Socks", "Chaussettes", "Çoraplar", "الجوارب", "Носки"), t("Sport, sublimation, embroidered and baby socks", "Chaussettes de sport, sublimation, brodées et bébé", "Spor, süblimasyon, nakışlı ve bebek çorapları", "جوارب رياضية ومطبوعة ومطرّزة وللأطفال", "Спортивные, сублимационные, вышитые и детские"), promoSpecs, [same("35–38"), same("39–42"), same("43–46"), standard[1]], [o.sublim, o.emb, o.woven], "sublimation-socks-1"),
  cat("kitchen-bar", "promotion", t("Kitchen & Bar Textiles", "Textiles cuisine & bar", "Mutfak & Bar Tekstili", "منسوجات المطبخ والبار", "Текстиль для кухни и бара"), t("Aprons, napkins, tablecloths and more", "Tabliers, serviettes, nappes et plus", "Önlük, peçete, masa örtüsü ve dahası", "مرايل ومناديل ومفارش والمزيد", "Фартуки, салфетки, скатерти и не только"), promoSpecs, standard, [o.print, o.emb, o.plain], "bistro-bar-apron-1"),
  cat("bags", "promotion", t("Bags & Cases", "Sacs et trousses", "Çanta & Kılıf", "الحقائب والأكياس", "Сумки и косметички"), t("Totes, beach bags, cosmetic cases and organisers", "Tote bags, sacs de plage, trousses et rangements", "Bez çanta, plaj çantası, kozmetik çanta ve düzenleyiciler", "حقائب قماشية وشاطئية وحقائب مستحضرات ومنظّمات", "Шоперы, пляжные сумки, косметички и органайзеры"), promoSpecs, standard, [o.print, o.emb, o.sublim], "floral-beach-bag-3"),
  cat("towels-blankets", "promotion", t("Towels & Blankets", "Serviettes et plaids", "Havlu & Battaniye", "المناشف والبطانيات", "Полотенца и пледы"), t("Beach, sport, golf towels and cosy blankets", "Serviettes plage, sport, golf et plaids douillets", "Plaj, spor, golf havluları ve sıcak battaniyeler", "مناشف شاطئ ورياضة وغولف وبطانيات دافئة", "Пляжные, спортивные, гольф-полотенца и пледы"), promoSpecs, standard, [o.sublim, o.emb, o.jacq], "picnic-blanket-2"),
  cat("pillows-pets", "promotion", t("Pillows, Cushions & Pet Beds", "Coussins et paniers pour animaux", "Yastık, Kırlent & Evcil Hayvan Yatağı", "الوسائد وأسرّة الحيوانات الأليفة", "Подушки и лежанки для питомцев"), t("Travel, beach and decorative comfort", "Confort de voyage, de plage et de déco", "Seyahat, plaj ve dekoratif konfor", "راحة في السفر والشاطئ والديكور", "Комфорт в пути, на пляже и дома"), promoSpecs, standard, [o.print, o.emb, o.sublim], "printed-pet-bed-3"),
  cat("gifts", "promotion", t("Business Gifts & Boxes", "Cadeaux d'affaires et coffrets", "Kurumsal Hediye & Kutular", "هدايا الأعمال والعلب", "Бизнес-подарки и коробки"), t("Gift sets and packaging that make an impression", "Coffrets et emballages qui marquent les esprits", "Etki bırakan hediye setleri ve ambalajlar", "أطقم هدايا وتغليف يترك انطباعًا", "Подарочные наборы и упаковка, которые впечатляют"), promoSpecs, standard, [o.print, o.emb, o.plain], "red-planner-gift-set-1"),
  cat("fan-flags", "promotion", t("Flags, Pennants & Fan Items", "Drapeaux, fanions et articles de supporters", "Bayrak, Flama & Taraftar Ürünleri", "الأعلام والرايات ومنتجات المشجّعين", "Флаги, вымпелы и атрибутика"), t("Show your colours on match day and every day", "Affichez vos couleurs chaque jour", "Renklerinizi her gün gösterin", "اعرض ألوانك في يوم المباراة وكل يوم", "Ваши цвета — в день матча и каждый день"), promoSpecs, standard, [o.sublim, o.print, o.emb], "fan-scarves-2"),
  cat("uniforms", "promotion", t("Uniforms & Workwear", "Uniformes et vêtements de travail", "Üniforma & İş Giyim", "الأزياء الموحّدة وملابس العمل", "Униформа и спецодежда"), t("Dress uniforms, berets and rescue wear", "Uniformes, bérets et tenues de secours", "Tören üniformaları, bereler ve kurtarma giysileri", "أزياء رسمية وبيريهات وملابس إنقاذ", "Парадная форма, береты и спасательная одежда"), promoSpecs, apparelSizes, [o.emb, o.woven, o.print], "search-rescue-uniform-1"),
  // Fabric & Yarn Export
  cat("fabrics", "export", t("Woven Fabrics", "Tissus tissés", "Dokuma Kumaşlar", "الأقمشة المنسوجة", "Тканые полотна"), t("Plain · Twill · Panama · Half-panama · Ripstop · Microfiber", "Toile · Sergé · Panama · Demi-panama · Ripstop · Microfibre", "Bez ayağı · Dimi · Panama · Yarım panama · Ripstop · Mikrofiber", "سادة · تويل · بنما · نصف بنما · ريبستوب · مايكروفايبر", "Полотняное · Саржа · Панама · Полупанама · Рипстоп · Микрофибра"), [{ label: t("Finishes", "Finitions", "Bitişler", "التشطيبات", "Отделка"), value: t("Printed · Dyed · Greige", "Imprimé · Teint · Écru", "Baskılı · Boyalı · Ham", "مطبوع · مصبوغ · خام", "С печатью · Крашеные · Суровые") }, { label: t("Specification", "Spécification", "Spesifikasyon", "المواصفات", "Спецификация"), value: t("Weight, width & composition to order", "Grammage, laize et composition sur commande", "Gramaj, en ve kompozisyon siparişe göre", "الوزن والعرض والتركيب حسب الطلب", "Плотность, ширина и состав под заказ") }, { label: t("Supply", "Livraison", "Tedarik", "التوريد", "Поставка"), value: t("Export worldwide", "Export dans le monde entier", "Dünya çapında ihracat", "تصدير إلى جميع أنحاء العالم", "Экспорт по всему миру") }], [t("To your specification", "Selon vos spécifications", "Spesifikasyonunuza göre", "حسب مواصفاتك", "По вашей спецификации")], [t("Printed", "Imprimé", "Baskılı", "مطبوع", "С печатью"), t("Dyed", "Teint", "Boyalı", "مصبوغ", "Крашеная"), t("Greige", "Écru", "Ham", "خام", "Суровая")], "export-fabric-rolls", "m"),
  cat("yarns", "export", t("Yarns & Filaments", "Fils et filaments", "İplik & Filamentler", "الخيوط والفتائل", "Пряжа и нити"), t("100% cotton · 100% polyester · Blends · Filament", "100 % coton · 100 % polyester · Mélanges · Filament", "%100 pamuk · %100 polyester · Karışımlar · Filament", "قطن 100% · بوليستر 100% · خلطات · فتائل", "100% хлопок · 100% полиэстер · Смеси · Филамент"), [{ label: t("Colour", "Couleur", "Renk", "اللون", "Цвет"), value: t("Dyed · Pre-dyed", "Teint · Prêt à teindre", "Boyalı · Boya öncesi", "مصبوغ · قبل الصباغة", "Крашеные · Некрашеные") }, { label: t("Specification", "Spécification", "Spesifikasyon", "المواصفات", "Спецификация"), value: t("Count & twist to order", "Titre et torsion sur commande", "Numara ve büküm siparişe göre", "النمرة والبرم حسب الطلب", "Номер и крутка под заказ") }, { label: t("Supply", "Livraison", "Tedarik", "التوريد", "Поставка"), value: t("Export worldwide", "Export dans le monde entier", "Dünya çapında ihracat", "تصدير إلى جميع أنحاء العالم", "Экспорт по всему миру") }], [t("To your specification", "Selon vos spécifications", "Spesifikasyonunuza göre", "حسب مواصفاتك", "По вашей спецификации")], [t("Dyed", "Teint", "Boyalı", "مصبوغ", "Крашеная"), t("Pre-dyed", "Prêt à teindre", "Boya öncesi", "قبل الصباغة", "Некрашеная")], "export-yarn-wall", "kg"),
];

// Seasonal category shown highlighted on the Promotion page and in the menu.
export const featuredCategory = "christmas";

export const getDivision = (slug: string) => divisions.find((d) => d.slug === slug);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const categoriesIn = (division: string) => categories.filter((c) => c.division === division);

export const name = (p: { name: T }, l: Locale) => p.name[l] ?? p.name.en;

export const company = {
  name: "Hieron Textile & Promotion",
  email: "info@hieron.com.tr",
  website: "www.hieron.com.tr",
  phone: "+90 540 420 55 32",
  whatsapp: "905404205532",
  instagram: "https://www.instagram.com/hierontextilepromotion?cplk=MWRqeDl0NzViZ2E3cQ==",
  linkedin: "https://www.linkedin.com/company/hieron-textile-promotion/",
  location: t("Pamukkale – Denizli, Türkiye", "Pamukkale – Denizli, Turquie", "Pamukkale – Denizli, Türkiye", "باموكالي – دنيزلي، تركيا", "Памуккале – Денизли, Турция"),
};

export const certificates = [
  { key: "certIso", name: "ISO 9001:2015", logo: "/images/certs/iso-9001.png" },
  { key: "certOeko", name: "OEKO-TEX®", logo: "/images/certs/oeko-tex.png" },
  { key: "certGots", name: "GOTS", logo: "/images/certs/gots.png" },
  { key: "certGrs", name: "GRS", logo: "/images/certs/grs.png" },
] as const;

// Quantity label, short unit, starting amount and +/- step for each unit
export const unitInfo = {
  pcs: { qty: "qty", short: "unitPcs", start: 100, step: 50 },
  m: { qty: "qtyM", short: "unitM", start: 1000, step: 500 },
  kg: { qty: "qtyKg", short: "unitKg", start: 500, step: 100 },
} as const;
