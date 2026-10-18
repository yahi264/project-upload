export const locales = ["en", "fr", "tr", "ar", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  tr: "Türkçe",
  ar: "العربية",
  ru: "Русский",
};

export const isLocale = (v: string): v is Locale => (locales as readonly string[]).includes(v);
export const dirOf = (l: Locale) => (l === "ar" ? "rtl" : "ltr");

export type T = Record<Locale, string>;

// Interface text. Keys are grouped by page.
const dict = {
  // navigation
  navCollections: { en: "Collections", fr: "Collections", tr: "Koleksiyonlar", ar: "المجموعات", ru: "Коллекции" },
  navAbout: { en: "About", fr: "À propos", tr: "Hakkımızda", ar: "من نحن", ru: "О нас" },
  navQuote: { en: "Request a Quote", fr: "Demander un devis", tr: "Teklif İste", ar: "اطلب عرض سعر", ru: "Запросить цену" },
  navAll: { en: "All products", fr: "Tous les produits", tr: "Tüm ürünler", ar: "جميع المنتجات", ru: "Все товары" },
  home: { en: "Home", fr: "Accueil", tr: "Ana sayfa", ar: "الرئيسية", ru: "Главная" },
  menuOpen: { en: "Open menu", fr: "Ouvrir le menu", tr: "Menüyü aç", ar: "فتح القائمة", ru: "Открыть меню" },
  menuClose: { en: "Close menu", fr: "Fermer le menu", tr: "Menüyü kapat", ar: "إغلاق القائمة", ru: "Закрыть меню" },
  language: { en: "Language", fr: "Langue", tr: "Dil", ar: "اللغة", ru: "Язык" },

  // hero
  heroEyebrow: { en: "Hieron Textile & Promotion · 2026", fr: "Hieron Textile & Promotion · 2026", tr: "Hieron Tekstil & Promosyon · 2026", ar: "هيرون للمنسوجات والترويج · 2026", ru: "Hieron Textile & Promotion · 2026" },
  heroTitleA: { en: "Textiles that carry", fr: "Des textiles qui portent", tr: "Markanızın", ar: "منسوجات تحمل", ru: "Текстиль, который несёт" },
  heroTitleB: { en: "your signature", fr: "votre signature", tr: "imzasını taşıyan tekstil", ar: "توقيعك الخاص", ru: "вашу подпись" },
  heroText: {
    en: "Hotel textiles, home collections, promotional products, fabrics and yarns — designed, woven and finished in Denizli to reflect your brand.",
    fr: "Linge hôtelier, collections maison, articles promotionnels, tissus et fils — conçus, tissés et finis à Denizli à l'image de votre marque.",
    tr: "Otel tekstili, ev koleksiyonları, promosyon ürünleri, kumaş ve iplik — markanızı yansıtmak için Denizli'de tasarlanır, dokunur ve tamamlanır.",
    ar: "منسوجات فندقية ومجموعات منزلية ومنتجات ترويجية وأقمشة وخيوط — تُصمَّم وتُنسج وتُشطَّب في دنيزلي لتعكس هوية علامتك.",
    ru: "Гостиничный текстиль, домашние коллекции, промо-продукция, ткани и пряжа — разработаны, сотканы и отделаны в Денизли под ваш бренд.",
  },
  explore: { en: "Explore the collections", fr: "Découvrir les collections", tr: "Koleksiyonları keşfedin", ar: "اكتشف المجموعات", ru: "Смотреть коллекции" },
  scroll: { en: "Scroll", fr: "Défiler", tr: "Kaydır", ar: "مرّر", ru: "Вниз" },

  // home page
  threeLines: { en: "Four collections, one standard", fr: "Quatre collections, une seule exigence", tr: "Dört koleksiyon, tek standart", ar: "أربع مجموعات ومعيار واحد", ru: "Четыре коллекции — один стандарт" },
  designs: { en: "designs", fr: "modèles", tr: "tasarım", ar: "تصميم", ru: "моделей" },
  products: { en: "products", fr: "produits", tr: "ürün", ar: "منتج", ru: "товаров" },
  product1: { en: "product", fr: "produit", tr: "ürün", ar: "منتج", ru: "товар" },
  discover: { en: "Discover", fr: "Découvrir", tr: "Keşfet", ar: "اكتشف", ru: "Открыть" },
  introEyebrow: { en: "Introduction", fr: "Introduction", tr: "Giriş", ar: "مقدمة", ru: "О компании" },
  introTitle: { en: "Not merely a manufacturer — a strategic partner.", fr: "Plus qu'un fabricant — un partenaire stratégique.", tr: "Yalnızca bir üretici değil — stratejik bir ortak.", ar: "لسنا مجرد مصنّع — بل شريك استراتيجي.", ru: "Не просто производитель — стратегический партнёр." },
  introText: {
    en: "Hieron began with a commitment to exceptional customer satisfaction, uncompromising comfort and the serene touch of pure cotton. With a comprehensive range of customisable products, we help hotels, homes and brands present their identity in the most impactful way — while keeping the highest quality standards.",
    fr: "Hieron est né d'un engagement : la satisfaction client, un confort sans compromis et la douceur du pur coton. Grâce à une large gamme de produits personnalisables, nous aidons hôtels, foyers et marques à exprimer leur identité avec force — sans jamais transiger sur la qualité.",
    tr: "Hieron; üstün müşteri memnuniyeti, ödünsüz konfor ve saf pamuğun dingin dokunuşu ilkesiyle yola çıktı. Geniş ve kişiselleştirilebilir ürün yelpazemizle otellerin, evlerin ve markaların kimliklerini en etkili şekilde yansıtmalarına yardımcı oluyor, en yüksek kalite standartlarını koruyoruz.",
    ar: "انطلقت هيرون بالتزامٍ برضا العملاء الاستثنائي والراحة دون تنازل ولمسة القطن النقي الهادئة. ومن خلال تشكيلة واسعة من المنتجات القابلة للتخصيص، نساعد الفنادق والمنازل والعلامات التجارية على إبراز هويتها بأقوى شكل — مع الحفاظ على أعلى معايير الجودة.",
    ru: "Hieron начался с приверженности безупречному сервису, бескомпромиссному комфорту и мягкости чистого хлопка. Широкий ассортимент продукции с персонализацией помогает отелям, домам и брендам ярко выражать свою индивидуальность — при высочайших стандартах качества.",
  },
  ourStory: { en: "Our story", fr: "Notre histoire", tr: "Hikâyemiz", ar: "قصتنا", ru: "Наша история" },
  pureCotton: { en: "Pure cotton", fr: "Pur coton", tr: "Saf pamuk", ar: "قطن نقي", ru: "Чистый хлопок" },
  brandEyebrow: { en: "Your brand, woven in", fr: "Votre marque, tissée", tr: "Markanız, dokunmuş", ar: "علامتك منسوجة", ru: "Ваш бренд — в каждой нити" },
  brandTitle: { en: "Every product can carry your identity", fr: "Chaque produit peut porter votre identité", tr: "Her ürün kimliğinizi taşıyabilir", ar: "يمكن لكل منتج أن يحمل هويتك", ru: "Каждое изделие может нести вашу айдентику" },
  brandText: {
    en: "Choose the colours, patterns and logo placement — our design team turns your brand story into textiles people remember.",
    fr: "Choisissez couleurs, motifs et emplacement du logo — notre équipe transforme l'histoire de votre marque en textiles mémorables.",
    tr: "Renkleri, desenleri ve logo yerleşimini seçin — tasarım ekibimiz marka hikâyenizi akılda kalan tekstillere dönüştürür.",
    ar: "اختر الألوان والنقوش وموضع الشعار — ويحوّل فريق التصميم لدينا قصة علامتك إلى منسوجات لا تُنسى.",
    ru: "Выберите цвета, узоры и место логотипа — наши дизайнеры превратят историю бренда в запоминающийся текстиль.",
  },
  techDobby: { en: "Dobby", fr: "Armure dobby", tr: "Armürlü (Dobby)", ar: "دوبي", ru: "Добби" },
  techDobbyText: { en: "Geometric borders and bands woven directly into the fabric — understated and durable.", fr: "Bordures et bandes géométriques tissées dans l'étoffe — sobres et durables.", tr: "Kumaşa doğrudan dokunan geometrik bordür ve şeritler — sade ve dayanıklı.", ar: "حواف وأشرطة هندسية منسوجة مباشرة في القماش — أنيقة ومتينة.", ru: "Геометрические бордюры, вплетённые прямо в ткань, — сдержанно и долговечно." },
  techJacquard: { en: "Jacquard", fr: "Jacquard", tr: "Jakar", ar: "جاكار", ru: "Жаккард" },
  techJacquardText: { en: "Your logo or signature pattern woven across the fabric, so it never fades or peels.", fr: "Votre logo ou motif tissé dans l'étoffe : il ne s'efface jamais.", tr: "Logonuz veya imza deseniniz kumaşa dokunur; asla solmaz, soyulmaz.", ar: "شعارك أو نقشك المميّز منسوج في القماش فلا يبهت ولا يتقشّر.", ru: "Логотип или узор вплетается в ткань — не выцветает и не отслаивается." },
  techEmbroidery: { en: "Embroidery & print", fr: "Broderie et impression", tr: "Nakış & baskı", ar: "تطريز وطباعة", ru: "Вышивка и печать" },
  techEmbroideryText: { en: "Crisp stitched monograms, full-colour sublimation and screen print for any product.", fr: "Monogrammes brodés, sublimation couleur et sérigraphie pour tout produit.", tr: "Net nakış monogramlar, tam renk süblimasyon ve serigrafi baskı.", ar: "مونوغرامات مطرّزة بدقة وطباعة تسامي ملوّنة وطباعة حريرية لأي منتج.", ru: "Чёткая вышивка, полноцветная сублимация и шелкография для любых изделий." },
  selected: { en: "Selected pieces", fr: "Sélection", tr: "Seçkin ürünler", ar: "قطع مختارة", ru: "Избранное" },
  newSeason: { en: "New season", fr: "Nouvelle saison", tr: "Yeni sezon", ar: "الموسم الجديد", ru: "Новый сезон" },
  allN: { en: "All {n} products", fr: "Les {n} produits", tr: "Tüm {n} ürün", ar: "جميع المنتجات ({n})", ru: "Все {n} товаров" },
  howWeWork: { en: "How we work", fr: "Notre méthode", tr: "Nasıl çalışıyoruz", ar: "طريقة عملنا", ru: "Как мы работаем" },
  howTitle: { en: "From your brief to delivery", fr: "De votre brief à la livraison", tr: "Talebinizden teslimata", ar: "من طلبك إلى التسليم", ru: "От задачи до доставки" },
  step1: { en: "Share your brief", fr: "Partagez votre brief", tr: "Talebinizi paylaşın", ar: "شاركنا طلبك", ru: "Опишите задачу" },
  step1t: { en: "Tell us the products, quantities, colours and the identity you want to express.", fr: "Indiquez produits, quantités, couleurs et l'identité à exprimer.", tr: "Ürünleri, adetleri, renkleri ve yansıtmak istediğiniz kimliği anlatın.", ar: "أخبرنا بالمنتجات والكميات والألوان والهوية التي تريد إبرازها.", ru: "Расскажите о товарах, количестве, цветах и нужном образе." },
  step2: { en: "Design & samples", fr: "Design et échantillons", tr: "Tasarım & numune", ar: "التصميم والعيّنات", ru: "Дизайн и образцы" },
  step2t: { en: "Our designers prepare your patterns and logos, then produce samples for approval.", fr: "Nos designers préparent motifs et logos puis réalisent des échantillons.", tr: "Tasarımcılarımız desen ve logolarınızı hazırlar, onay için numune üretir.", ar: "يُعدّ مصمّمونا النقوش والشعارات ثم يُنتجون عيّنات للموافقة.", ru: "Дизайнеры готовят узоры и логотипы, затем — образцы на утверждение." },
  step3: { en: "Production", fr: "Production", tr: "Üretim", ar: "الإنتاج", ru: "Производство" },
  step3t: { en: "Your order is produced in Denizli under certified quality control.", fr: "Votre commande est produite à Denizli sous contrôle qualité certifié.", tr: "Siparişiniz Denizli'de sertifikalı kalite kontrolüyle üretilir.", ar: "يُنتَج طلبك في دنيزلي تحت رقابة جودة معتمدة.", ru: "Заказ производится в Денизли под сертифицированным контролем качества." },
  step4: { en: "Timely delivery", fr: "Livraison ponctuelle", tr: "Zamanında teslimat", ar: "تسليم في الموعد", ru: "Точно в срок" },
  step4t: { en: "Packed and delivered on schedule, ready to use.", fr: "Emballée et livrée dans les délais, prête à l'emploi.", tr: "Paketlenir ve zamanında, kullanıma hazır teslim edilir.", ar: "يُغلَّف ويُسلَّم في موعده جاهزًا للاستخدام.", ru: "Упаковано и доставлено вовремя, готово к использованию." },
  certEyebrow: { en: "Certified quality", fr: "Qualité certifiée", tr: "Sertifikalı kalite", ar: "جودة معتمدة", ru: "Сертифицированное качество" },
  certTitle: { en: "Standards you can rely on", fr: "Des normes dignes de confiance", tr: "Güvenebileceğiniz standartlar", ar: "معايير يمكنك الاعتماد عليها", ru: "Стандарты, которым можно доверять" },
  certText: {
    en: "Our production follows internationally recognised standards for quality management, safe textiles, organic fibres and recycled materials.",
    fr: "Notre production suit des normes internationales de management de la qualité, de textiles sûrs, de fibres biologiques et de matières recyclées.",
    tr: "Üretimimiz kalite yönetimi, güvenli tekstil, organik lif ve geri dönüştürülmüş malzeme alanlarında uluslararası standartlara uygundur.",
    ar: "يلتزم إنتاجنا بمعايير دولية معترف بها لإدارة الجودة والمنسوجات الآمنة والألياف العضوية والمواد المعاد تدويرها.",
    ru: "Наше производство соответствует международным стандартам менеджмента качества, безопасного текстиля, органических волокон и переработанных материалов.",
  },
  certIso: { en: "Quality management system", fr: "Système de management de la qualité", tr: "Kalite yönetim sistemi", ar: "نظام إدارة الجودة", ru: "Система менеджмента качества" },
  certOeko: { en: "Textiles tested for harmful substances", fr: "Textiles testés contre les substances nocives", tr: "Zararlı maddeler için test edilmiş tekstil", ar: "منسوجات مختبَرة ضد المواد الضارة", ru: "Текстиль проверен на вредные вещества" },
  certGots: { en: "Global Organic Textile Standard", fr: "Norme mondiale des textiles biologiques", tr: "Küresel Organik Tekstil Standardı", ar: "المعيار العالمي للمنسوجات العضوية", ru: "Глобальный стандарт органического текстиля" },
  certGrs: { en: "Global Recycled Standard", fr: "Norme mondiale du recyclé", tr: "Küresel Geri Dönüşüm Standardı", ar: "المعيار العالمي للمواد المعاد تدويرها", ru: "Глобальный стандарт переработки" },
  ctaTitle: { en: "Let's create something with your signature", fr: "Créons quelque chose à votre image", tr: "Sizin imzanızı taşıyan bir şey yaratalım", ar: "لنصنع معًا ما يحمل توقيعك", ru: "Создадим что-то с вашей подписью" },
  ctaText: { en: "Pick the products you like, tell us your quantities and branding, and we'll come back with a tailored offer.", fr: "Choisissez vos produits, indiquez quantités et personnalisation, et nous vous enverrons une offre sur mesure.", tr: "Beğendiğiniz ürünleri seçin, adet ve markalama bilgilerini iletin; size özel teklifle dönelim.", ar: "اختر المنتجات، وأخبرنا بالكميات والتخصيص، وسنعود إليك بعرض مصمّم لك.", ru: "Выберите товары, укажите количество и брендирование — мы пришлём индивидуальное предложение." },
  browse: { en: "Browse products", fr: "Voir les produits", tr: "Ürünlere göz atın", ar: "تصفّح المنتجات", ru: "Смотреть товары" },

  // made to order
  mtoEyebrow: { en: "Made to order", fr: "Fabrication sur mesure", tr: "Siparişe özel üretim", ar: "تصنيع حسب الطلب", ru: "Производство на заказ" },
  mtoTitle: { en: "Produced to your requirements — carrying your brand", fr: "Produit selon vos exigences — à votre marque", tr: "İhtiyaçlarınıza göre üretilir — markanızı taşır", ar: "نُنتج وفق متطلباتك — ويحمل علامتك التجارية", ru: "Производим по вашим требованиям — под вашим брендом" },
  mtoText: {
    en: "Every product in our collections is a starting point. We manufacture to your specification — your logo, your colours, your sizes and your packaging — whether you are a boutique hotel, a retailer or an international brand.",
    fr: "Chaque produit de nos collections est un point de départ. Nous fabriquons selon votre cahier des charges — votre logo, vos couleurs, vos tailles et votre emballage — que vous soyez un hôtel de charme, un distributeur ou une marque internationale.",
    tr: "Koleksiyonlarımızdaki her ürün bir başlangıç noktasıdır. Butik bir otel, bir perakendeci ya da uluslararası bir marka olun; logonuz, renkleriniz, ölçüleriniz ve ambalajınızla tamamen sizin spesifikasyonunuza göre üretiyoruz.",
    ar: "كل منتج في مجموعاتنا هو نقطة انطلاق. نُصنّع وفق مواصفاتك — شعارك وألوانك ومقاساتك وتغليفك — سواء كنت فندقًا بوتيكيًا أو تاجر تجزئة أو علامة تجارية عالمية.",
    ru: "Каждое изделие в наших коллекциях — лишь отправная точка. Мы производим по вашему техзаданию — с вашим логотипом, в ваших цветах, размерах и упаковке, — будь вы бутик-отель, ритейлер или международный бренд.",
  },
  mtoLogo: { en: "Your logo", fr: "Votre logo", tr: "Logonuz", ar: "شعارك", ru: "Ваш логотип" },
  mtoLogoT: { en: "Embroidered, woven in jacquard, printed or on a woven label — placed exactly where you want it.", fr: "Brodé, tissé en jacquard, imprimé ou sur étiquette tissée — placé exactement où vous le souhaitez.", tr: "Nakış, jakar dokuma, baskı veya dokuma etiket — tam istediğiniz yerde.", ar: "مطرّز أو منسوج بالجاكار أو مطبوع أو على ملصق منسوج — في المكان الذي تريده تمامًا.", ru: "Вышивка, жаккард, печать или тканая этикетка — ровно там, где вы хотите." },
  mtoColour: { en: "Your colours", fr: "Vos couleurs", tr: "Renkleriniz", ar: "ألوانك", ru: "Ваши цвета" },
  mtoColourT: { en: "Fabrics and yarns dyed to match your brand palette.", fr: "Tissus et fils teints aux couleurs de votre marque.", tr: "Kumaş ve iplikler marka renklerinize göre boyanır.", ar: "أقمشة وخيوط مصبوغة لتطابق ألوان علامتك.", ru: "Ткани и пряжа, окрашенные в цвета вашего бренда." },
  mtoSpec: { en: "Your specifications", fr: "Vos spécifications", tr: "Spesifikasyonlarınız", ar: "مواصفاتك", ru: "Ваши параметры" },
  mtoSpecT: { en: "Sizes, weights, materials and finishes chosen for your use.", fr: "Tailles, grammages, matières et finitions adaptés à votre usage.", tr: "Ölçü, gramaj, malzeme ve bitişler kullanımınıza göre seçilir.", ar: "المقاسات والأوزان والخامات والتشطيبات تُختار حسب استخدامك.", ru: "Размеры, плотность, материалы и отделка — под ваши задачи." },
  mtoPack: { en: "Your packaging", fr: "Votre emballage", tr: "Ambalajınız", ar: "تغليفك", ru: "Ваша упаковка" },
  mtoPackT: { en: "Branded labels, tags and packaging on request — ready for your shelves or rooms.", fr: "Étiquettes, tags et emballages à votre marque sur demande — prêts pour vos rayons ou vos chambres.", tr: "İsteğe bağlı markalı etiket, askılık ve ambalaj — raflarınıza veya odalarınıza hazır.", ar: "ملصقات وبطاقات وتغليف يحمل علامتك عند الطلب — جاهز لرفوفك أو غرفك.", ru: "Брендированные этикетки, бирки и упаковка по запросу — готово к полке или номеру." },
  mtoCta: { en: "Start a custom order", fr: "Lancer une commande sur mesure", tr: "Özel sipariş başlatın", ar: "ابدأ طلبًا مخصّصًا", ru: "Оформить заказ под бренд" },
  mtoNote: { en: "Made to order: this product can be produced to your requirements — with your logo, colours, sizes and packaging.", fr: "Sur mesure : ce produit peut être fabriqué selon vos exigences — avec votre logo, vos couleurs, tailles et emballage.", tr: "Siparişe özel: bu ürün logonuz, renkleriniz, ölçüleriniz ve ambalajınızla ihtiyaçlarınıza göre üretilebilir.", ar: "حسب الطلب: يمكن إنتاج هذا المنتج وفق متطلباتك — بشعارك وألوانك ومقاساتك وتغليفك.", ru: "На заказ: это изделие можно произвести по вашим требованиям — с логотипом, в ваших цветах, размерах и упаковке." },
  mtoMarquee: { en: "Your brand on every product", fr: "Votre marque sur chaque produit", tr: "Her üründe markanız", ar: "علامتك على كل منتج", ru: "Ваш бренд на каждом изделии" },

  // catalogue
  catalogueTitle: { en: "The Collection", fr: "La Collection", tr: "Koleksiyon", ar: "المجموعة", ru: "Коллекция" },
  catalogueText: {
    en: "Every product can be produced in your colours and sizes, with your logo. Add the pieces you like to your request list and we'll prepare a tailored offer.",
    fr: "Chaque produit peut être réalisé dans vos couleurs et tailles, avec votre logo. Ajoutez vos pièces à la liste de demande et nous préparerons une offre sur mesure.",
    tr: "Her ürün sizin renk ve ölçülerinizde, logonuzla üretilebilir. Beğendiklerinizi talep listenize ekleyin, size özel teklif hazırlayalım.",
    ar: "يمكن إنتاج كل منتج بألوانك ومقاساتك وبشعارك. أضف القطع التي تعجبك إلى قائمة الطلب وسنُعدّ لك عرضًا خاصًا.",
    ru: "Любое изделие можно выпустить в ваших цветах и размерах, с логотипом. Добавьте товары в список запроса — мы подготовим индивидуальное предложение.",
  },
  all: { en: "All", fr: "Tout", tr: "Tümü", ar: "الكل", ru: "Все" },
  search: { en: "Search products", fr: "Rechercher", tr: "Ürün ara", ar: "ابحث عن منتج", ru: "Поиск товаров" },
  noMatch: { en: "No products match your search.", fr: "Aucun produit ne correspond.", tr: "Aramanızla eşleşen ürün yok.", ar: "لا توجد منتجات مطابقة.", ru: "Ничего не найдено." },
  specifications: { en: "Specifications", fr: "Caractéristiques", tr: "Özellikler", ar: "المواصفات", ru: "Характеристики" },
  continueExploring: { en: "Continue exploring", fr: "Continuer la visite", tr: "Keşfetmeye devam edin", ar: "تابع الاستكشاف", ru: "Смотреть ещё" },
  viewAll: { en: "View all", fr: "Tout voir", tr: "Tümünü gör", ar: "عرض الكل", ru: "Смотреть все" },
  more: { en: "More from", fr: "Plus de", tr: "Daha fazla", ar: "المزيد من", ru: "Ещё из раздела" },
  categories: { en: "categories", fr: "catégories", tr: "kategori", ar: "فئات", ru: "категорий" },

  // product
  size: { en: "Size", fr: "Taille", tr: "Ölçü", ar: "المقاس", ru: "Размер" },
  finish: { en: "Finish / branding", fr: "Finition / marquage", tr: "Bitiş / markalama", ar: "التشطيب / العلامة", ru: "Отделка / брендирование" },
  qty: { en: "Estimated quantity (pieces)", fr: "Quantité estimée (pièces)", tr: "Tahmini adet", ar: "الكمية التقديرية (قطع)", ru: "Примерное количество (шт.)" },
  qtyM: { en: "Estimated quantity (metres)", fr: "Quantité estimée (mètres)", tr: "Tahmini miktar (metre)", ar: "الكمية التقديرية (متر)", ru: "Примерное количество (метры)" },
  qtyKg: { en: "Estimated quantity (kg)", fr: "Quantité estimée (kg)", tr: "Tahmini miktar (kg)", ar: "الكمية التقديرية (كغ)", ru: "Примерное количество (кг)" },
  unitPcs: { en: "pcs", fr: "pcs", tr: "adet", ar: "قطعة", ru: "шт." },
  unitM: { en: "m", fr: "m", tr: "m", ar: "م", ru: "м" },
  unitKg: { en: "kg", fr: "kg", tr: "kg", ar: "كغ", ru: "кг" },
  addToRequest: { en: "Add to request list", fr: "Ajouter à la demande", tr: "Talep listesine ekle", ar: "أضف إلى قائمة الطلب", ru: "Добавить в запрос" },
  added: { en: "Added to request", fr: "Ajouté à la demande", tr: "Talebe eklendi", ar: "أُضيف إلى الطلب", ru: "Добавлено в запрос" },
  viewRequest: { en: "View request", fr: "Voir la demande", tr: "Talebi gör", ar: "عرض الطلب", ru: "Открыть запрос" },
  noPayment: { en: "No payment online — our team reviews your request and sends you a personalised offer.", fr: "Aucun paiement en ligne — notre équipe étudie votre demande et vous envoie une offre personnalisée.", tr: "Online ödeme yok — ekibimiz talebinizi inceler ve size özel teklif gönderir.", ar: "لا دفع عبر الإنترنت — يراجع فريقنا طلبك ويرسل لك عرضًا مخصّصًا.", ru: "Без онлайн-оплаты — мы рассмотрим запрос и пришлём персональное предложение." },
  decrease: { en: "Decrease", fr: "Diminuer", tr: "Azalt", ar: "إنقاص", ru: "Уменьшить" },
  increase: { en: "Increase", fr: "Augmenter", tr: "Artır", ar: "زيادة", ru: "Увеличить" },
  photo: { en: "Photo", fr: "Photo", tr: "Fotoğraf", ar: "صورة", ru: "Фото" },
  close: { en: "Close", fr: "Fermer", tr: "Kapat", ar: "إغلاق", ru: "Закрыть" },
  previous: { en: "Previous", fr: "Précédent", tr: "Önceki", ar: "السابق", ru: "Назад" },
  next: { en: "Next", fr: "Suivant", tr: "Sonraki", ar: "التالي", ru: "Далее" },

  // request
  requestTitle: { en: "Tell us about your project", fr: "Parlez-nous de votre projet", tr: "Projenizi anlatın", ar: "أخبرنا عن مشروعك", ru: "Расскажите о проекте" },
  requestText: { en: "Review the products you selected, adjust quantities and share a few details. Our team will prepare an offer tailored to you.", fr: "Vérifiez votre sélection, ajustez les quantités et partagez quelques détails. Nous préparerons une offre sur mesure.", tr: "Seçtiğiniz ürünleri gözden geçirin, adetleri ayarlayın ve birkaç bilgi paylaşın. Ekibimiz size özel bir teklif hazırlayacak.", ar: "راجع المنتجات المختارة وعدّل الكميات وشاركنا بعض التفاصيل، وسيُعدّ فريقنا عرضًا مخصّصًا لك.", ru: "Проверьте выбранные товары, уточните количество и оставьте контакты — мы подготовим индивидуальное предложение." },
  yourSelection: { en: "Your selection", fr: "Votre sélection", tr: "Seçiminiz", ar: "اختياراتك", ru: "Ваш выбор" },
  items: { en: "items", fr: "articles", tr: "ürün", ar: "عناصر", ru: "поз." },
  emptyList: { en: "You haven't added any products yet. You can still send a general request, or", fr: "Vous n'avez encore rien ajouté. Vous pouvez envoyer une demande générale, ou", tr: "Henüz ürün eklemediniz. Genel bir talep gönderebilir ya da", ar: "لم تُضف أي منتج بعد. يمكنك إرسال طلب عام، أو", ru: "Вы ещё ничего не добавили. Можно отправить общий запрос или" },
  remove: { en: "Remove", fr: "Retirer", tr: "Kaldır", ar: "إزالة", ru: "Удалить" },
  yourDetails: { en: "Your details", fr: "Vos coordonnées", tr: "Bilgileriniz", ar: "بياناتك", ru: "Ваши данные" },
  fName: { en: "Full name *", fr: "Nom complet *", tr: "Ad soyad *", ar: "الاسم الكامل *", ru: "Имя и фамилия *" },
  fCompany: { en: "Company / hotel *", fr: "Société / hôtel *", tr: "Firma / otel *", ar: "الشركة / الفندق *", ru: "Компания / отель *" },
  fEmail: { en: "Email *", fr: "E-mail *", tr: "E-posta *", ar: "البريد الإلكتروني *", ru: "Эл. почта *" },
  fPhone: { en: "Phone / WhatsApp", fr: "Téléphone / WhatsApp", tr: "Telefon / WhatsApp", ar: "الهاتف / واتساب", ru: "Телефон / WhatsApp" },
  fCountry: { en: "Country", fr: "Pays", tr: "Ülke", ar: "الدولة", ru: "Страна" },
  fRooms: { en: "Rooms / estimated volume", fr: "Chambres / volume estimé", tr: "Oda sayısı / tahmini hacim", ar: "عدد الغرف / الحجم التقديري", ru: "Номера / примерный объём" },
  fMessage: { en: "Message — colours, logo, delivery date…", fr: "Message — couleurs, logo, date de livraison…", tr: "Mesaj — renkler, logo, teslim tarihi…", ar: "رسالة — الألوان، الشعار، موعد التسليم…", ru: "Сообщение — цвета, логотип, сроки…" },
  fBranding: { en: "I'm interested in custom branding (logo embroidery, jacquard, print or our own colours).", fr: "Je souhaite une personnalisation (logo brodé, jacquard, impression ou nos couleurs).", tr: "Özel markalama ile ilgileniyorum (logo nakışı, jakar, baskı veya kendi renklerimiz).", ar: "أرغب في تخصيص العلامة (تطريز الشعار أو الجاكار أو الطباعة أو ألواننا الخاصة).", ru: "Интересует брендирование (вышивка логотипа, жаккард, печать или наши цвета)." },
  send: { en: "Send request", fr: "Envoyer la demande", tr: "Talebi gönder", ar: "إرسال الطلب", ru: "Отправить запрос" },
  privacy: { en: "Your details are only used to answer your request.", fr: "Vos données servent uniquement à répondre à votre demande.", tr: "Bilgileriniz yalnızca talebinizi yanıtlamak için kullanılır.", ar: "تُستخدم بياناتك للرد على طلبك فقط.", ru: "Ваши данные используются только для ответа на запрос." },
  errName: { en: "Please enter your name", fr: "Veuillez saisir votre nom", tr: "Lütfen adınızı girin", ar: "يرجى إدخال اسمك", ru: "Укажите имя" },
  errCompany: { en: "Please enter your company", fr: "Veuillez saisir votre société", tr: "Lütfen firmanızı girin", ar: "يرجى إدخال اسم الشركة", ru: "Укажите компанию" },
  errEmail: { en: "Please enter a valid email", fr: "Veuillez saisir un e-mail valide", tr: "Lütfen geçerli bir e-posta girin", ar: "يرجى إدخال بريد إلكتروني صالح", ru: "Укажите корректный e-mail" },
  errServer: { en: "Something went wrong. Please try again or email us.", fr: "Une erreur est survenue. Réessayez ou écrivez-nous.", tr: "Bir sorun oluştu. Tekrar deneyin veya bize e-posta gönderin.", ar: "حدث خطأ ما. حاول مجددًا أو راسلنا عبر البريد.", ru: "Что-то пошло не так. Повторите попытку или напишите нам." },
  thanksTitle: { en: "Thank you — your request is with us", fr: "Merci — nous avons bien reçu votre demande", tr: "Teşekkürler — talebiniz bize ulaştı", ar: "شكرًا — وصلنا طلبك", ru: "Спасибо — запрос получен" },
  thanksText: { en: "Your reference number is {id}. Our team will review your selection and reply by email with a tailored offer.", fr: "Votre numéro de référence est {id}. Notre équipe étudiera votre sélection et vous répondra par e-mail.", tr: "Referans numaranız {id}. Ekibimiz seçiminizi inceleyip size e-posta ile özel teklif gönderecek.", ar: "رقمك المرجعي هو {id}. سيراجع فريقنا اختياراتك ويرد عليك بعرض مخصّص عبر البريد.", ru: "Ваш номер запроса: {id}. Мы изучим выбор и ответим на e-mail с предложением." },
  continueBrowsing: { en: "Continue browsing", fr: "Continuer la visite", tr: "Göz atmaya devam et", ar: "متابعة التصفّح", ru: "Продолжить просмотр" },
  preferEmail: { en: "Prefer email?", fr: "Vous préférez l'e-mail ?", tr: "E-postayı mı tercih edersiniz?", ar: "تفضّل البريد الإلكتروني؟", ru: "Удобнее по почте?" },

  // about
  aboutEyebrow: { en: "Our company", fr: "Notre entreprise", tr: "Şirketimiz", ar: "شركتنا", ru: "Наша компания" },
  aboutTitle: { en: "A strategic partner, woven into your brand", fr: "Un partenaire stratégique, tissé dans votre marque", tr: "Markanıza dokunmuş stratejik bir ortak", ar: "شريك استراتيجي منسوج في علامتك", ru: "Стратегический партнёр, вплетённый в ваш бренд" },
  aboutH: { en: "Innovative, sustainable, high-value production.", fr: "Une production innovante, durable et à forte valeur.", tr: "Yenilikçi, sürdürülebilir, yüksek katma değerli üretim.", ar: "إنتاج مبتكر ومستدام وعالي القيمة.", ru: "Инновационное, устойчивое производство с высокой ценностью." },
  aboutP1: {
    en: "Located in Pamukkale, Denizli, Hieron Textile & Promotion is a manufacturer committed to innovative, sustainable and high-value production. Guided by a strong dedication to customer satisfaction, we combine uncompromising quality standards with a solution-oriented approach to deliver reliable results for our business partners.",
    fr: "Basée à Pamukkale, Denizli, Hieron Textile & Promotion est un fabricant engagé pour une production innovante, durable et à forte valeur ajoutée. Portés par la satisfaction client, nous associons des normes de qualité exigeantes à une approche orientée solutions pour offrir des résultats fiables à nos partenaires.",
    tr: "Pamukkale, Denizli'de bulunan Hieron Tekstil & Promosyon; yenilikçi, sürdürülebilir ve yüksek katma değerli üretime bağlı bir üreticidir. Müşteri memnuniyetine güçlü bağlılığımızla, ödünsüz kalite standartlarını çözüm odaklı yaklaşımla birleştirerek iş ortaklarımıza güvenilir sonuçlar sunuyoruz.",
    ar: "تقع هيرون للمنسوجات والترويج في باموكالي بدنيزلي، وهي جهة تصنيع ملتزمة بإنتاج مبتكر ومستدام وعالي القيمة. وانطلاقًا من التزامنا القوي برضا العملاء، نجمع بين معايير جودة لا تقبل المساومة ونهج يركّز على الحلول لتقديم نتائج موثوقة لشركائنا.",
    ru: "Hieron Textile & Promotion из Памуккале (Денизли) — производитель, приверженный инновационному, устойчивому и ценному производству. Ориентируясь на удовлетворённость клиентов, мы сочетаем строгие стандарты качества с решением задач партнёров и обеспечиваем надёжный результат.",
  },
  aboutP2: {
    en: "From hotel rooms to living rooms to brand campaigns, we blend brand stories with refined designs — offering not merely products but a modern and distinguished brand presence.",
    fr: "Des chambres d'hôtel aux salons et aux campagnes de marque, nous associons récits de marque et design raffiné — pour offrir non seulement des produits, mais une présence de marque moderne et distinguée.",
    tr: "Otel odalarından oturma odalarına ve marka kampanyalarına kadar, marka hikâyelerini zarif tasarımlarla buluşturuyor; yalnızca ürün değil, modern ve seçkin bir marka varlığı sunuyoruz.",
    ar: "من غرف الفنادق إلى غرف المعيشة وحملات العلامات التجارية، نمزج قصص العلامات بتصاميم راقية — لنقدّم ليس مجرد منتجات بل حضورًا عصريًا ومميّزًا للعلامة.",
    ru: "От гостиничных номеров до гостиных и рекламных кампаний — мы соединяем историю бренда с изысканным дизайном, предлагая не просто товары, а современное и узнаваемое присутствие бренда.",
  },
  pillar1: { en: "Timely production", fr: "Production dans les délais", tr: "Zamanında üretim", ar: "إنتاج في الموعد", ru: "Производство в срок" },
  pillar1t: { en: "Delivery dates are commitments. We plan every order so it arrives on schedule.", fr: "Les délais sont des engagements. Chaque commande est planifiée pour arriver à temps.", tr: "Teslim tarihleri birer taahhüttür. Her siparişi zamanında ulaşacak şekilde planlarız.", ar: "مواعيد التسليم التزامات؛ نخطّط لكل طلب ليصل في موعده.", ru: "Сроки — это обязательства. Каждый заказ планируется так, чтобы прийти вовремя." },
  pillar2: { en: "Superior quality", fr: "Qualité supérieure", tr: "Üstün kalite", ar: "جودة فائقة", ru: "Высокое качество" },
  pillar2t: { en: "Certified processes and strict control at every stage of production and finishing.", fr: "Des processus certifiés et un contrôle strict à chaque étape.", tr: "Üretim ve bitişin her aşamasında sertifikalı süreçler ve sıkı kontrol.", ar: "عمليات معتمدة ورقابة صارمة في كل مراحل الإنتاج والتشطيب.", ru: "Сертифицированные процессы и строгий контроль на каждом этапе." },
  pillar3: { en: "Forward-thinking design", fr: "Design visionnaire", tr: "Öncü tasarım", ar: "تصميم استشرافي", ru: "Передовой дизайн" },
  pillar3t: { en: "Our experienced designers turn each brand story into refined, memorable products.", fr: "Nos designers expérimentés transforment chaque histoire en produits raffinés.", tr: "Deneyimli tasarımcılarımız her marka hikâyesini zarif ürünlere dönüştürür.", ar: "يحوّل مصمّمونا ذوو الخبرة قصة كل علامة إلى منتجات راقية لا تُنسى.", ru: "Опытные дизайнеры превращают историю бренда в изысканные изделия." },
  valuesTitle: { en: "Six promises in every thread", fr: "Six promesses dans chaque fil", tr: "Her ipliğe altı söz", ar: "ستة وعود في كل خيط", ru: "Шесть обещаний в каждой нити" },
  vQuality: { en: "Quality", fr: "Qualité", tr: "Kalite", ar: "الجودة", ru: "Качество" },
  vWarranty: { en: "Warranty", fr: "Garantie", tr: "Garanti", ar: "الضمان", ru: "Гарантия" },
  vDesign: { en: "Design", fr: "Design", tr: "Tasarım", ar: "التصميم", ru: "Дизайн" },
  vExclusivity: { en: "Exclusivity", fr: "Exclusivité", tr: "Ayrıcalık", ar: "الحصرية", ru: "Эксклюзивность" },
  vMaterials: { en: "Materials", fr: "Matières", tr: "Malzeme", ar: "الخامات", ru: "Материалы" },
  vDurability: { en: "Durability", fr: "Durabilité", tr: "Dayanıklılık", ar: "المتانة", ru: "Долговечность" },

  // footer
  footerText: { en: "Hotel textiles, home collections, promotional products, fabrics and yarns from Denizli — made to carry your identity.", fr: "Linge hôtelier, collections maison, articles promotionnels, tissus et fils de Denizli — à votre image.", tr: "Denizli'den; kimliğinizi taşıyan otel tekstili, ev koleksiyonları, promosyon ürünleri, kumaş ve iplik.", ar: "منسوجات فندقية ومجموعات منزلية ومنتجات ترويجية وأقمشة وخيوط من دنيزلي تحمل هويتك.", ru: "Гостиничный текстиль, домашние коллекции, промо-продукция, ткани и пряжа из Денизли с вашей айдентикой." },
  company: { en: "Company", fr: "Entreprise", tr: "Şirket", ar: "الشركة", ru: "Компания" },
  contact: { en: "Contact", fr: "Contact", tr: "İletişim", ar: "اتصل بنا", ru: "Контакты" },
  rights: { en: "All rights reserved.", fr: "Tous droits réservés.", tr: "Tüm hakları saklıdır.", ar: "جميع الحقوق محفوظة.", ru: "Все права защищены." },
  notFound: { en: "This page could not be found", fr: "Page introuvable", tr: "Sayfa bulunamadı", ar: "تعذّر العثور على هذه الصفحة", ru: "Страница не найдена" },
  backToCollection: { en: "Back to the collection", fr: "Retour à la collection", tr: "Koleksiyona dön", ar: "العودة إلى المجموعة", ru: "Вернуться к коллекции" },
  staticReady: { en: "Your request is ready — send it to us", fr: "Votre demande est prête — envoyez-la-nous", tr: "Talebiniz hazır — bize gönderin", ar: "طلبك جاهز — أرسله إلينا", ru: "Ваш запрос готов — отправьте его нам" },
  whatsapp: { en: "Chat on WhatsApp", fr: "Discuter sur WhatsApp", tr: "WhatsApp'tan yazın", ar: "تحدّث عبر واتساب", ru: "Написать в WhatsApp" },
} satisfies Record<string, T>;

export type Key = keyof typeof dict;

export function getT(locale: Locale) {
  return (key: Key, vars?: Record<string, string | number>) => {
    let s: string = dict[key][locale] ?? dict[key].en;
    if (vars) for (const [k, v] of Object.entries(vars)) s = s.replace(`{${k}}`, String(v));
    return s;
  };
}

// Picks the right language from a translated value.
export const tr = (v: T, locale: Locale) => v[locale] ?? v.en;

// Number formatting per language (Arabic keeps Western digits for quantities).
export const fmt = (n: number, locale: Locale) => n.toLocaleString(locale === "ar" ? "ar-u-nu-latn" : locale);
