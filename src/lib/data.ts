export interface BilingualText {
  fr: string
  ar: string
}

export interface MockProduct {
  id: string
  name: BilingualText
  category: BilingualText
  description?: BilingualText
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  image: string
  badge?: BilingualText
  isNew?: boolean
  isBestSeller?: boolean
  brandId?: string
}

export interface MockBrand {
  id: string
  name: string
  tagline: BilingualText
  description: BilingualText
  logo: string
  cover: string
  origin: BilingualText
  productCount: number
  /** Optional spotlight metadata (used by BrandSpotlight section) */
  spotlight?: {
    bgClass: string       // Tailwind background utility (e.g. 'bg-[#3d2418]')
    accentClass: string   // Tailwind text utility for CTA (e.g. 'text-rose-400')
    headlineFr: string    // Short headline above the brand name
  }
}

export interface MockCategory {
  id: string
  name: BilingualText
  image: string
  href: string
  count: number
}

export const mockCategories: MockCategory[] = [
  {
    id: 'soin-visage',
    name: { fr: 'Soin du visage', ar: 'العناية بالبشرة' },
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&auto=format&fit=crop&q=80',
    href: '/boutique?category=soin-visage',
    count: 48,
  },
  {
    id: 'cheveux',
    name: { fr: 'Cheveux', ar: 'العناية بالشعر' },
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&auto=format&fit=crop&q=80',
    href: '/boutique?category=cheveux',
    count: 34,
  },
  {
    id: 'solaire',
    name: { fr: 'Protection solaire', ar: 'الحماية الشمسية' },
    image: 'https://images.unsplash.com/photo-1526758097130-bab247274f58?w=400&auto=format&fit=crop&q=80',
    href: '/boutique?category=solaire',
    count: 18,
  },
  {
    id: 'maquillage',
    name: { fr: 'Maquillage', ar: 'المكياج' },
    image: 'https://images.unsplash.com/photo-1522335789203-aaa4e1f93ed8?w=400&auto=format&fit=crop&q=80',
    href: '/boutique?category=maquillage',
    count: 0,
  },
  {
    id: 'coffrets',
    name: { fr: 'Coffrets cadeaux', ar: 'علب الهدايا' },
    image: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=400&auto=format&fit=crop&q=80',
    href: '/boutique?category=coffrets',
    count: 22,
  },
]

export const mockProducts: MockProduct[] = [
  {
    id: '43',
    name: { fr: 'Cerave Baume Hydratant - moisturizing cream', ar: 'بلسم سيرافي المرطب - كريم مرطب' },
    category: { fr: 'Soin du visage', ar: 'العناية بالبشرة' },
    price: 124,
    rating: 4.7,
    reviews: 0,
    image: 'https://www.cerave.ma/-/media/project/loreal/brand-sites/cerave/americas/ma/scx/ma-common-images/ma-pdp-packshots/baume-hydratant/baume-hydratant-454-g-lg.jpg?rev=-1?w=500&hash=BCCF3915C2E9E3FBCA89323483C0294B',
    isBestSeller: true,
  },
  {
    id: '44',
    name: {
      fr: 'Cerave Gel Moussant Nettoyant Peau Normale à Grasse',
      ar: 'سيرافي جل رغوي منظف للبشرة العادية إلى الدهنية',
    },
    category: { fr: 'Soin du visage', ar: 'العناية بالبشرة' },
    description: {
      fr: "Développé avec des dermatologues, le Gel Moussant CeraVe foaming cleanser nettoie en douceur, purifie en profondeur sans altérer la barrière naturelle de la peau. Ce gel purifiant, aux 3 céramides essentiels et à l'acide hyaluronique, élimine efficacement l'excès de sebum, les impuretés et le maquillage.",
      ar: 'تم تطويره بالتعاون مع أطباء الجلد. جل سيرافي الرغوي ينظف بلطف ويطهر بعمق دون الإخلال بحاجز البشرة الطبيعي. هذا الجل المنقي، المحتوي على 3 سيراميدات أساسية وحمض الهيالورونيك، يزيل بفعالية الدهون الزائدة والشوائب والمكياج.',
    },
    price: 90,
    rating: 4.7,
    reviews: 0,
    image: 'https://www.cerave.ma/-/media/project/loreal/brand-sites/cerave/americas/ma/scx/ma-common-images/ma-pdp-packshots/gel-moussant/gel-moussant-473-ml-lg.jpg?rev=-1?w=500&hash=A44572F4188AFB9A02026161135079E0',
    badge: { fr: 'Nouveau', ar: 'جديد' },
    isNew: true,
  },
  {
    id: '45',
    name: {
      fr: 'CeraVe Lait Hydratant - Moisturizing Lotion',
      ar: 'سيرافي لوشن مرطب - Moisturizing Lotion',
    },
    category: { fr: 'Soin du visage', ar: 'العناية بالبشرة' },
    description: {
      fr: "Developpé avec des dermatologues, le lait hydratant CeraVe hydrate efficacement tout en aidant à restaurer la barrière protectrice de la peau. Sa texture légère et non grasse, enrichie aux 3 céramides essentiels et à l'acide hyaluronique, offre une hydratation tout au long de la journée et dès la première application.",
      ar: 'تم تطويره بالتعاون مع أطباء الجلد. لوشن سيرافي المرطب يرطب البشرة بفعالية مع المساعدة على استعادة حاجزها الواقي. قوامه الخفيف غير الدهني، الغني بـ 3 سيراميدات أساسية وحمض الهيالورونيك، يوفر ترطيباً طوال اليوم منذ التطبيق الأول.',
    },
    price: 110,
    rating: 4.7,
    reviews: 0,
    image: 'https://haytamparfumerie.com/cdn/shop/products/cerave-lait-hydratant-cerave-236ml.jpg?v=1724506547&width=493',
    badge: { fr: 'Nouveau', ar: 'جديد' },
    isNew: true,
  },
  {
    id: '46',
    name: {
      fr: 'CeraVe Baume Hydratant 177ml',
      ar: 'سيرافي بلسم مرطب 177 مل',
    },
    category: { fr: 'Soin du visage', ar: 'العناية بالبشرة' },
    description: {
      fr: "Développé avec des dermatologues, le Baume Hydratant CeraVe aide à restaurer la barrière protectrice de la peau. Ce soin nourrissant, enrichi aux 3 céramides essentiels et à l'acide hyaluronique hydrate la peau en continu pendant 48h, dès la première application. Son efficacité est prouvée : -80% de sécheresse cutanée.",
      ar: 'تم تطويره بالتعاون مع أطباء الجلد. بلسم سيرافي المرطب يساعد على استعادة الحاجز الواقي للبشرة. هذا المنتج المغذي، الغني بـ 3 سيراميدات أساسية وحمض الهيالورونيك، يرطب البشرة باستمرار لمدة 48 ساعة منذ التطبيق الأول. فعاليته مُثبتة: -80% من جفاف البشرة.',
    },
    price: 90,
    rating: 4.7,
    reviews: 0,
    image: 'https://haytamparfumerie.com/cdn/shop/files/cerave-baume-hydratant-177ml_76fd3c36-3025-4ba0-805a-35fb64aa6834.jpg?v=1693935554&width=493',
    badge: { fr: 'Nouveau', ar: 'جديد' },
    isNew: true,
  },
  {
    id: '47',
    name: {
      fr: 'CeraVe Huile Lavante Moussante Hydratante - Hydrating Foaming Oil Cleanser 437ml',
      ar: 'سيرافي زيت غسول رغوي مرطب - Hydrating Foaming Oil Cleanser 437 مل',
    },
    category: { fr: 'Soin du visage', ar: 'العناية بالبشرة' },
    description: {
      fr: "Avec le CeraVe Huile Lavante Moussante Hydratante, votre peau sera nettoyée et hydratée en un seul geste. Cette formule unique combine une huile nourrissante avec une mousse légère pour éliminer efficacement les impuretés tout en laissant une sensation de douceur et d'hydratation. Profitez de 437 ml de pureté et de bien-être pour votre peau.",
      ar: 'مع زيت سيرافي الغسول الرغوي المرطب، ستُنظف بشرتك وتُرطب بحركة واحدة. هذه التركيبة الفريدة تجمع بين زيت مغذٍ ورغوة خفيفة لإزالة الشوائب بفعالية مع ترك إحساس بالنعومة والترطيب. استمتعي بـ 437 مل من النقاء والعافية لبشرتك.',
    },
    price: 150,
    rating: 4.7,
    reviews: 0,
    image: 'https://haytamparfumerie.com/cdn/shop/files/IMG-1648.jpg?v=1714651332&width=493',
    badge: { fr: 'Nouveau', ar: 'جديد' },
    isNew: true,
  },
  {
    id: '48',
    name: {
      fr: 'La Roche-Posay Toleriane Sensitive 40ml',
      ar: 'لا روش بوزيه توليريان سينسيتيف 40 مل',
    },
    category: { fr: 'Soin du visage', ar: 'العناية بالبشرة' },
    description: {
      fr: "Profitez d'une peau équilibrée et apaisée avec La Roche-Posay Toleriane Sensitive. Cette formule douce et sans parfum offre une hydratation intense tout en réduisant les rougeurs et les irritations cutanées. Adaptée aux peaux sensibles, elle nourrit en profondeur et laisse votre peau protégée et confortable.",
      ar: 'استمتعي ببشرة متوازنة ومهدّأة مع لا روش بوزيه توليريان سينسيتيف. هذه التركيبة اللطيفة الخالية من العطور توفّر ترطيباً مكثفاً مع تقليل الاحمرار وتهيجات البشرة. مناسبة للبشرات الحساسة، تغذّي بعمق وتترك بشرتك محمية ومريحة.',
    },
    price: 135,
    rating: 4.8,
    reviews: 0,
    image: 'https://haytamparfumerie.com/cdn/shop/files/la-roche-posay-toleriane-sensitive-creme-hydratante-apaisante-peau-sensible40ml-1-68a90e7545135.jpg?v=1755909790&width=493',
    badge: { fr: 'Nouveau', ar: 'جديد' },
    isNew: true,
  },
  {
    id: '49',
    name: {
      fr: 'La Roche-Posay Toleriane Sensitive Riche 40ml',
      ar: 'لا روش بوزيه توليريان سينسيتيف ريش 40 مل',
    },
    category: { fr: 'Soin du visage', ar: 'العناية بالبشرة' },
    description: {
      fr: "La nouvelle hydratation dermatologique, si sûre qu'elle convient aux bébés.\n\nPour les peaux sensibles à tendance sèche à très sèche. Rougeurs occasionnelles, tiraillements, picotements, sécheresse. Convient aux bébés.\n\nTOLERIANE SENSITIVE :\n• Hydrate pendant 48 heures. Protège la barrière cutanée au quotidien.\n• Apaise et réduit les irritations cutanées. Diminue les sensations de tiraillements, de picotements, de sécheresse et les rougeurs occasionnelles.",
      ar: 'الترطيب الجلدي الجديد، آمن لدرجة أنه مناسب للأطفال الرضع.\n\nللبشرات الحساسة الميّالة للجفاف إلى الجفاف الشديد. احمرار عرضي، شد، وخز، جفاف. مناسب للأطفال الرضع.\n\nتوليريان سينسيتيف:\n• يرطب لمدة 48 ساعة. يحمي حاجز البشرة يومياً.\n• يهدّئ ويقلل تهيجات البشرة. يقلل من إحساس الشد والوخز والجفاف والاحمرار العرضي.',
    },
    price: 140,
    rating: 4.8,
    reviews: 0,
    image: 'https://beautyforyou.ma/cdn/shop/files/product-2012199.jpg?v=1772094559&width=500',
    badge: { fr: 'Nouveau', ar: 'جديد' },
    isNew: true,
  },
  {
    id: '50',
    name: {
      fr: 'La Roche-Posay Effaclar Gel Moussant Purifiant 400ml',
      ar: 'لا روش بوزيه إيفاكلار جل رغوي منقّي 400 مل',
    },
    category: { fr: 'Soin du visage', ar: 'العناية بالبشرة' },
    description: {
      fr: "Ce gel moussant élimine impuretés et excès de sébum tout en purifiant la peau grasse à tendance acnéique. Formulé pour être anti-points noirs, il laisse la peau propre et fraîche. Contient des ingrédients spécialement choisis pour éliminer l'acné et la graisse, pour une peau plus saine.",
      ar: 'هذا الجل الرغوي يزيل الشوائب والدهون الزائدة مع تنقية البشرة الدهنية المعرضة لحب الشباب. مصمم ليكون مضاداً للرؤوس السوداء، يترك البشرة نظيفة ومنعشة. يحتوي على مكونات مختارة خصيصاً للقضاء على حب الشباب والدهون، لبشرة أكثر صحة.',
    },
    price: 195,
    rating: 4.7,
    reviews: 0,
    image: 'https://haytamparfumerie.com/cdn/shop/files/la-roche-posay-productpage-acne-effaclar-cleansing-foaming-gel-400ml-3337872411991-zoom-front-n.webp?v=1707850841&width=493',
    badge: { fr: 'Bestseller', ar: 'الأكثر مبيعاً' },
    isBestSeller: true,
  },
  {
    id: '51',
    name: {
      fr: 'La Roche-Posay Effaclar Gel Moussant Purifiant 200ml',
      ar: 'لا روش بوزيه إيفاكلار جل رغوي منقّي 200 مل',
    },
    category: { fr: 'Soin du visage', ar: 'العناية بالبشرة' },
    description: {
      fr: "Obtenez une peau propre et rafraîchie avec le Gel Moussant Purifiant Effaclar de La Roche-Posay. Spécialement conçu pour les peaux grasses, ce gel nettoyant purifie en douceur sans assécher la peau grâce à des agents doux. Enrichi en eau thermale et zinc, il élimine les impuretés et atténue la brillance pour une peau parfaitement équilibrée.",
      ar: 'احصلي على بشرة نظيفة ومنتعشة مع جل إيفاكلار الرغوي المنقّي من لا روش بوزيه. مصمم خصيصاً للبشرات الدهنية، هذا الجل المنظف ينقّي بلطف دون تجفيف البشرة بفضل مكوناته اللطيفة. غني بالماء الحراري والزنك، يزيل الشوائب ويقلل اللمعان لبشرة متوازنة تماماً.',
    },
    price: 140,
    rating: 4.7,
    reviews: 0,
    image: 'https://haytamparfumerie.com/cdn/shop/files/IMG-8348.jpg?v=1707894118&width=493',
    badge: { fr: 'Nouveau', ar: 'جديد' },
    isNew: true,
  },
  {
    id: "52",
    name: { fr: "La Roche-Posay Effaclar Duo+ Soin Anti-Imperfections 40ml", ar: "لا روش بوزيه إيفاكلار ديو+ عناية مضادة للعيوب 40 مل" },
    category: { fr: "Soin du visage", ar: "العناية بالبشرة" },
    description: {
      fr: "EFFACLAR Duo+ prévient l'apparition des imperfections, élimine les boutons et régule la production de sébum.\n\n• Besoin : Réduire les imperfections | Peaux Grasses à tendance acnéique.\n• Ingrédients Clés : LHA et Acide Salicylique pour exfolier sans irriter | Zinc PCA pour réduire le sébum | Mannose pour régénérer la peau | Procerad et Niacinamide pour atténuer les taches.\n• Sécurité : Hypoallergénique | Non-Comédogène | Sans Parabène.\n• Utilisation : Appliquer le matin et/ou le soir sur une peau nettoyée. Visage.",
      ar: "إيفاكلار ديو+ يمنع ظهور العيوب، يقضي على البثور وينظّم إفراز الدهون.\n\n• الاحتياج: تقليل العيوب | البشرات الدهنية المعرضة لحب الشباب.\n• المكونات الرئيسية: حمض LHA والساليسيليك لتقشير لطيف بدون تهيج | زنك PCA لتقليل الدهون | مانوز لتجديد البشرة | بروسيراد ونياسيناميد لتقليل البقع.\n• الأمان: غير مسبب للحساسية | غير مسبب لانسداد المسام | خالٍ من البارابين.\n• الاستخدام: يُطبق صباحاً و/أو مساءً على بشرة نظيفة. الوجه.",
    },
    price: 175,
    rating: 4.8,
    reviews: 0,
    image: "https://www.zinabel.ma/13745-large_default/effaclar-duom-la-roche-posay.jpg",
    badge: { fr: "Bestseller", ar: "الأكثر مبيعاً" },
    isBestSeller: true,
    brandId: "la-roche-posay",
  },
  {
    id: '53',
    name: {
      fr: 'Bioderma Hydrabio Perfecteur SPF30 40ml',
      ar: 'بيوديرما هيدرابيو بيرفكتور SPF30 40 مل',
    },
    category: { fr: 'Soin du visage', ar: 'العناية بالبشرة' },
    description: {
      fr: "Hydrabio Perfecteur SPF 30\n\nBénéfices :\n• Masque les imperfections et les micro-rides\n• Lisse durablement le grain de peau et illumine instantanément le teint\n• Ralentit le vieillissement cutané et protège des rayons UV\n• Hydrate intensément et durablement\n• Très bonne tolérance\n• Non comédogène\n• Excellente base de maquillage",
      ar: 'هيدرابيو بيرفكتور SPF 30\n\nالفوائد:\n• يخفي العيوب والتجاعيد الدقيقة\n• يُنعّم ملمس البشرة بشكل دائم ويضيء البشرة فوراً\n• يبطئ شيخوخة البشرة ويحمي من الأشعة فوق البنفسجية\n• يرطب بشكل مكثف وطويل الأمد\n• تحمّل ممتاز\n• غير مسبب لانسداد المسام\n• قاعدة مكياج ممتازة',
    },
    price: 185,
    rating: 4.7,
    reviews: 0,
    image: 'https://www.zinabel.ma/14665-large_default/hydrabio-perfecteur-spf30-40-ml.jpg',
    badge: { fr: 'Nouveau', ar: 'جديد' },
    isNew: true,
  },
  {
    id: "54",
    name: { fr: "Bioderma Sébium Mat Control 30ml", ar: "بيوديرما سيبيوم مات كنترول 30 مل" },
    category: { fr: "Soin du visage", ar: "العناية بالبشرة" },
    description: {
      fr: "Sébium Mat Control\n\nPeau mixte à grasse\n\nLe soin qui matifie et lisse, pour une peau durablement transformée.\n\nBénéfices :\n• Matifie\n• Hydrate\n• Lisse\n• Très bonne tolérance — Non comédogène — Bonne base de maquillage",
      ar: "سيبيوم مات كنترول\n\nبشرة مختلطة إلى دهنية\n\nالعناية التي تُمات وتنعّم، لبشرة متحوّلة بشكل دائم.\n\nالفوائد:\n• يخفّف لمعان البشرة\n• يرطّب\n• ينعّم\n• تحمّل ممتاز — غير مسبب لانسداد المسام — قاعدة مكياج جيدة",
    },
    price: 145,
    rating: 4.7,
    reviews: 0,
    image: "https://www.zinabel.ma/14689-large_default/sebium-mat-control-30-ml.jpg",
    badge: { fr: "Nouveau", ar: "جديد" },
    isNew: true,
    brandId: "bioderma",
  },
  {
    id: '55',
    name: {
      fr: 'Eucerin Oil Control SPF 50+ Sun Protection',
      ar: 'يوسرين أويل كنترول SPF 50+ حماية شمسية',
    },
    category: { fr: 'Protection solaire', ar: 'الحماية الشمسية' },
    description: {
      fr: "Eucerin Écran Oil Control SPF 50+ offre une protection optimale contre les rayons nocifs du soleil pour les peaux grasses et mixtes sujettes à l'acné. Sa formule avec matifiant et ses actifs anti-brillance longue durée neutralisent les reflets et maintiennent une peau saine et lisse.",
      ar: 'يوسرين شاشة أويل كنترول SPF 50+ توفر حماية مثالية ضد أشعة الشمس الضارة للبشرات الدهنية والمختلطة المعرضة لحب الشباب. تركيبتها بمواد مطفية للمعان ومضادة للبريق طويلة المفعول تحيّد الانعكاسات وتحافظ على بشرة صحية وناعمة.',
    },
    price: 140,
    rating: 4.7,
    reviews: 0,
    image: 'https://haytamparfumerie.com/cdn/shop/products/EUCERIN_SUN_PROTECTION_PHOTOAGING_CONTROL_Fluid_SPF_50.jpg?v=1713727918&width=493',
    badge: { fr: 'Nouveau', ar: 'جديد' },
    isNew: true,
  },
  {
    id: '56',
    name: {
      fr: 'Eucerin Hyaluron-Filler Soin De Jour 50ml',
      ar: 'يوسرين هيالورون-فيلر كريم نهاري 50 مل',
    },
    category: { fr: 'Soin du visage', ar: 'العناية بالبشرة' },
    description: {
      fr: "Découvrez Eucerin Hyaluron-Filler Soin De Jour 50ml, le soin anti-âge adapté aux peaux sèches. Grâce à sa formule au [Hyal] Complex, il lutte efficacement contre les rides et le vieillissement cutané en hydratant et comblant les rides grâce à l'acide hyaluronique, en stimulant sa production naturelle et en le protégeant avec l'enoxolone. Profitez d'une peau plus belle et plus jeune.",
      ar: 'اكتشفي يوسرين هيالورون-فيلر كريم نهاري 50 مل، عناية مضادة للشيخوخة مناسبة للبشرات الجافة. بفضل تركيبتها بـ [Hyal] Complex، تكافح بفعالية التجاعيد وشيخوخة البشرة عن طريق الترطيب وملء التجاعيد بحمض الهيالورونيك، وتحفّز إنتاجه الطبيعي وتحميه بالإينوكسولون. استمتعي ببشرة أجمل وأصغر سناً.',
    },
    price: 265,
    rating: 4.8,
    reviews: 0,
    image: 'https://haytamparfumerie.com/cdn/shop/files/DTER.webp?v=1705666309&width=493',
    badge: { fr: 'Bestseller', ar: 'الأكثر مبيعاً' },
    isBestSeller: true,
  },
  {
    id: '57',
    name: {
      fr: 'Eucerin Anti-Pigment Soin de Jour SPF 30',
      ar: 'يوسرين أنتي-بيغمنت كريم نهاري SPF 30',
    },
    category: { fr: 'Soin du visage', ar: 'العناية بالبشرة' },
    description: {
      fr: "Crème de jour au Thiamidol\n\n• Réduit efficacement les taches brunes et empêche leur réapparition\n• Protection UVA/UVB\n\nTaches, manque d'éclat ? 1ers résultats visibles dès 2 semaines pour une peau uniforme et éclatante.",
      ar: 'كريم نهاري بالثيامايدول\n\n• يقلّل بفعالية البقع الداكنة ويمنع ظهورها مجدداً\n• حماية UVA/UVB\n\nبقع، فقدان إشراق؟ النتائج الأولى مرئية منذ أسبوعين للحصول على بشرة موحدة ومشرقة.',
    },
    price: 275,
    rating: 4.8,
    reviews: 0,
    image: 'https://haytamparfumerie.com/cdn/shop/files/Eucerin_ANTI-PIGMENT_SOIN_DE_JOUR_SPF_30_50_ML.jpg?v=1724261560&width=493',
    badge: { fr: 'Bestseller', ar: 'الأكثر مبيعاً' },
    isBestSeller: true,
  },
  {
    id: '58',
    name: {
      fr: 'Bioderma Sensibio Gel Moussant Nettoyant Douceur 200ml',
      ar: 'بيوديرما سينسيبيو جل رغوي منظف لطيف 200 مل',
    },
    category: { fr: 'Soin du visage', ar: 'العناية بالبشرة' },
    description: {
      fr: "Le gel moussant micellaire qui renforce l'hydratation naturelle de la peau.\n\n• Nettoie et démaquille le visage et les yeux en douceur\n• Hydrate\n• Apaise et calme les irritations\n• Très bonne tolérance cutanée et oculaire\n• Non comédogène — Ne contient pas de savon — Non parfumé — pH physiologique",
      ar: 'الجل الرغوي الميسيلي الذي يعزز الترطيب الطبيعي للبشرة.\n\n• ينظّف ويزيل المكياج عن الوجه والعينين بلطف\n• يرطّب\n• يهدّئ ويخفّف التهيجات\n• تحمّل جلدي وعيني ممتاز\n• غير مسبب لانسداد المسام — خالٍ من الصابون — بدون عطور — pH متوازن',
    },
    price: 180,
    rating: 4.8,
    reviews: 0,
    image: 'https://haytamparfumerie.com/cdn/shop/files/design-sans-titre---2025-12-27t165827-155-6950026e81750.png?v=1766851184&width=493',
    badge: { fr: 'Nouveau', ar: 'جديد' },
    isNew: true,
  },
  {
    id: '59',
    name: {
      fr: 'Eucerin DermoPure Clinical Correcting Cleanser — Acne Prone Skin',
      ar: 'يوسرين ديرموبيور كلينيكال غسول تصحيحي — للبشرة المعرضة لحب الشباب',
    },
    category: { fr: 'Soin du visage', ar: 'العناية بالبشرة' },
    description: {
      fr: "C'est un produit traitant conçu pour les personnes qui ont de l'acné, des points noirs ou des taches laissées par d'anciens boutons. Il s'agit d'un nettoyant visage (et corps) intensif de la gamme DermoPure de chez Eucerin.\n\nPlus précisément, c'est un produit traitant conçu pour les personnes qui ont de l'acné, des points noirs ou des taches laissées par d'anciens boutons.",
      ar: 'منتج علاجي مصمم للأشخاص الذين يعانون من حب الشباب أو الرؤوس السوداء أو البقع الناتجة عن البثور القديمة. هو منظف وجه (وجسم) مكثف من مجموعة ديرموبيور من يوسرين.\n\nبشكل أكثر تحديداً، هو منتج علاجي مصمم للأشخاص الذين يعانون من حب الشباب أو الرؤوس السوداء أو البقع الناتجة عن البثور القديمة.',
    },
    price: 140,
    rating: 4.7,
    reviews: 0,
    image: 'https://haytamparfumerie.com/cdn/shop/files/Design_sans_titre_-_2026-01-20T210559.936.png?v=1768939894&width=493',
    badge: { fr: 'Nouveau', ar: 'جديد' },
    isNew: true,
  },
  {
    id: '60',
    name: {
      fr: 'Eucerin DermoPure Gommage 100ml',
      ar: 'يوسرين ديرموبيور مقشّر 100 مل',
    },
    category: { fr: 'Soin du visage', ar: 'العناية بالبشرة' },
    description: {
      fr: "Gommage pour peau à tendance acnéique enrichi en microparticules qui affinent les pores.\n\nLe gommage Eucerin DermoPure, idéal pour une utilisation quotidienne, contient des ingrédients doux et sans savon pour un nettoyage en profondeur. Sa formule unique élimine efficacement les impuretés et laisse votre peau propre et saine. Profitez d'une peau impeccable avec Eucerin DermoPure Gommage.",
      ar: 'مقشّر للبشرة المعرضة لحب الشباب غني بجزيئات دقيقة تشدّ المسام.\n\nمقشّر يوسرين ديرموبيور، مثالي للاستخدام اليومي، يحتوي على مكونات لطيفة وخالية من الصابون لتنظيف عميق. تركيبته الفريدة تزيل الشوائب بفعالية وتترك بشرتك نظيفة وصحية. استمتعي ببشرة نقية مع مقشّر يوسرين ديرموبيور.',
    },
    price: 135,
    rating: 4.6,
    reviews: 0,
    image: 'https://haytamparfumerie.com/cdn/shop/files/EUCERIN_DermoPure_Gommage_100_Ml.jpg?v=1724264586&width=493',
    badge: { fr: 'Nouveau', ar: 'جديد' },
    isNew: true,
  },
  {
    id: '61',
    name: {
      fr: 'Eucerin Gel Nettoyant DermoPure 200ml',
      ar: 'يوسرين جل منظف ديرموبيور 200 مل',
    },
    category: { fr: 'Soin du visage', ar: 'العناية بالبشرة' },
    description: {
      fr: "Gel nettoyant pour peau à tendance acnéique contenant 6% de tensioactifs.\n\nLe gel nettoyant DermoPure de Eucerin est conçu pour un usage quotidien, contenant des tensioactifs et sans savon pour un nettoyage doux et efficace. Profitez d'une peau propre et saine grâce à sa formule spécifique pour les peaux à problèmes. Idéal pour les peaux sensibles.",
      ar: 'جل منظف للبشرة المعرضة لحب الشباب يحتوي على 6% من المنظفات الفعّالة.\n\nجل يوسرين ديرموبيور المنظف مصمم للاستخدام اليومي، يحتوي على منظفات فعّالة وخالٍ من الصابون لتنظيف لطيف وفعّال. استمتعي ببشرة نظيفة وصحية بفضل تركيبته الخاصة بالبشرات المعرضة للمشاكل. مثالي للبشرات الحساسة.',
    },
    price: 150,
    rating: 4.7,
    reviews: 0,
    image: 'https://haytamparfumerie.com/cdn/shop/files/design-sans-titre---2026-01-20t210004-489-696fdefaa2965.png?v=1768939295&width=493',
    badge: { fr: 'Bestseller', ar: 'الأكثر مبيعاً' },
    isBestSeller: true,
  },
  {
    id: '62',
    name: {
      fr: 'Eucerin DermoPure Crème Corps Triple Action 200ml',
      ar: 'يوسرين ديرموبيور كريم جسم Triple Action 200 مل',
    },
    category: { fr: 'Soin du corps', ar: 'العناية بالجسم' },
    description: {
      fr: "Réduisez efficacement les imperfections et les marques post-acné sur votre corps avec la crème Eucerin DermoPure Triple Action. Grâce à sa formule spécialement conçue, votre peau sera plus lisse et plus uniforme. Obtenez une peau parfaite sans traces résiduelles.",
      ar: 'قلّلي بفعالية العيوب وعلامات ما بعد حب الشباب على جسمك مع كريم يوسرين ديرموبيور Triple Action. بفضل تركيبته المصممة خصيصاً، ستكون بشرتك أنعم وأكثر توحيداً. احصلي على بشرة مثالية بدون آثار متبقية.',
    },
    price: 220,
    rating: 4.8,
    reviews: 0,
    image: 'https://haytamparfumerie.com/cdn/shop/files/198ff43988cdbf81ab36d3b3f58e07dbe1a78111_fr_FR.png?v=1728993324&width=493',
    badge: { fr: 'Nouveau', ar: 'جديد' },
    isNew: true,
  },
  {
    id: '63',
    name: {
      fr: 'Fino Premium Touch Shampoo 550ml',
      ar: 'فينو بريميام تاتش شامبو 550 مل',
    },
    category: { fr: 'Cheveux', ar: 'العناية بالشعر' },
    description: {
      fr: "Le shampoing Fino Premium Touch est idéal pour traiter les cheveux secs et abîmés par les changements climatiques, les rayons UV et les cheveux colorés ou permanentés.\n\nPour tous types de cheveux — Fabriqué au Japon\n\nIngrédients clés :\n• Gelée royale EX pour hydrater\n• PCA pour renforcer\n• Lipidure EX pour réparer",
      ar: 'شامبو فينو بريميام تاتش مثالي لمعالجة الشعر الجاف والتالف بسبب التغيرات المناخية وأشعة UV والشعر المصبوغ أو المعالج كيميائياً.\n\nلجميع أنواع الشعر — صُنع في اليابان\n\nمكونات أساسية:\n• هلام ملكي EX للترطيب\n• PCA للتقوية\n• Lipidure EX للإصلاح',
    },
    price: 220,
    rating: 4.9,
    reviews: 0,
    image: 'https://haytamparfumerie.com/cdn/shop/files/Screenshot_195.png?v=1756754067&width=493',
    badge: { fr: 'Bestseller', ar: 'الأكثر مبيعاً' },
    isBestSeller: true,
  },
  {
    id: '64',
    name: {
      fr: 'Vichy Dercos Shampooing Anti-Pelliculaire DS Cheveux Secs 200ml',
      ar: 'فيشي ديركوس شامبو ضد القشرة DS للشعر الجاف 200 مل',
    },
    category: { fr: 'Cheveux', ar: 'العناية بالشعر' },
    description: {
      fr: "Shampooing Traitant Anti-Pelliculaire DS de la gamme Dercos Technique de Vichy, spécifiquement formulé pour les cheveux secs et le cuir chevelu sensible sujets aux pellicules et aux démangeaisons.\n\n✨ Actions clés :\n• Élimination des pellicules : agit efficacement dès la première application\n• Action anti-récidive : prévient la réapparition pendant jusqu'à 6 semaines (cure de 4 semaines)\n• Apaise le cuir chevelu sensible",
      ar: 'شامبو علاجي ضد القشرة DS من مجموعة ديركوس تكنيك من فيشي، مُصمَّم خصيصاً للشعر الجاف وفروة الرأس الحساسة المعرضة للقشرة والحكة.\n\n✨ المفعول الرئيسي:\n• القضاء على القشرة: يعمل بفعالية منذ الاستخدام الأول\n• فعل مضاد للتكرار: يمنع عودة الظهور لمدة تصل إلى 6 أسابيع (دورة 4 أسابيع)\n• يهدّئ فروة الرأس الحساسة',
    },
    price: 125,
    rating: 4.7,
    reviews: 0,
    image: 'https://haytamparfumerie.com/cdn/shop/files/Design_sans_titre_-_2025-12-02T125514.831.png?v=1764676713&width=493',
    badge: { fr: 'Nouveau', ar: 'جديد' },
    isNew: true,
  },
  {
    id: '65',
    name: {
      fr: 'Vichy Dercos Technique Shampooing ENERGY+ Anti-Chute 200ml',
      ar: 'فيشي ديركوس تكنيك شامبو ENERGY+ ضد تساقط الشعر 200 مل',
    },
    category: { fr: 'Cheveux', ar: 'العناية بالشعر' },
    description: {
      fr: "Le shampooing Dercos Technique Energy+ anti-chute de cheveux convient à tous types de cheveux. Sa formule réduit la chute des cheveux tout en leur apportant force et vigueur. Avec un lavage en douceur, il laisse les cheveux propres et sains. Un produit essentiel pour lutter contre la perte de cheveux.",
      ar: 'شامبو ديركوس تكنيك Energy+ ضد تساقط الشعر مناسب لجميع أنواع الشعر. تركيبته تقلل من تساقط الشعر مع منحه القوة والحيوية. بغسيل لطيف، يترك الشعر نظيفاً وصحياً. منتج ضروري لمكافحة تساقط الشعر.',
    },
    price: 120,
    rating: 4.8,
    reviews: 0,
    image: 'https://haytamparfumerie.com/cdn/shop/files/DERCOS_TECHNIQUE_Shampooing_ENERGY_Anti-Chute_200_ML.jpg?v=1728992057&width=493',
    badge: { fr: 'Bestseller', ar: 'الأكثر مبيعاً' },
    isBestSeller: true,
  },
  {
    id: '66',
    name: {
      fr: "Johnson's Baby Shampoo 500ml",
      ar: 'جونسون شامبو الأطفال 500 مل',
    },
    category: { fr: 'Cheveux', ar: 'العناية بالشعر' },
    description: {
      fr: "Johnson's Baby Shampoo 500ml est le choix parfait pour les parents soucieux de la santé et du bien-être de leur bébé. Ce shampoing doux pour la peau délicate de bébé est spécialement formulé pour des cheveux sains, lisses et propres. Il est sans danger pour les yeux (formule sans larmes) et offre un excellent soin quotidien pour garder les enfants propres et frais.",
      ar: 'شامبو جونسون للأطفال 500 مل الخيار المثالي للوالدين المهتمين بصحة وعافية طفلهم. هذا الشامبو اللطيف على بشرة الطفل الحساسة، مُصمَّم خصيصاً لشعر صحي وناعم ونظيف. آمن على العينين (تركيبة بدون دموع) ويوفر عناية يومية ممتازة للحفاظ على نظافة الأطفال وانتعاشهم.',
    },
    price: 30,
    rating: 4.6,
    reviews: 0,
    image: 'https://haytamparfumerie.com/cdn/shop/files/white-61cczaeSTLL._AC_SL1500.jpg?v=1729080558&width=493',
    badge: { fr: 'Bestseller', ar: 'الأكثر مبيعاً' },
    isBestSeller: true,
  },
  {
    id: '67',
    name: {
      fr: "Johnson's Chamomile Baby Shampoo 200ml",
      ar: 'جونسون شامبو الأطفال بالبابونج 200 مل',
    },
    category: { fr: 'Cheveux', ar: 'العناية بالشعر' },
    description: {
      fr: "Découvrez le shampooing pour bébé à la camomille Johnson's de 200 ml. Sa formule unique, enrichie en camomille, nettoie en douceur les cheveux délicats de bébé, tout en apaisant le cuir chevelu et en laissant une odeur délicatement parfumée. Offrez à votre bébé des soins capillaires de qualité avec Johnson's.",
      ar: 'اكتشفي شامبو الأطفال بالبابونج من جونسون 200 مل. تركيبته الفريدة الغنية بالبابونج تنظف بلطف شعر طفلك الناعم، مع تهدئة فروة الرأس وترك رائحة عطرة لطيفة. امنحي طفلك عناية شعر عالية الجودة مع جونسون.',
    },
    price: 25,
    rating: 4.7,
    reviews: 0,
    image: 'https://haytamparfumerie.com/cdn/shop/files/white-71C4nq083zL._AC_SL1500.jpg?v=1729081151&width=493',
    badge: { fr: 'Nouveau', ar: 'جديد' },
    isNew: true,
  },
  {
    id: '68',
    name: {
      fr: 'Disaar Shampooing Colorant Marron Ginseng & Huile de Serpent 400ml',
      ar: 'ديسار شامبو ملوّن بني بالجينسنغ وزيت الثعبان 400 مل',
    },
    category: { fr: 'Cheveux', ar: 'العناية بالشعر' },
    description: {
      fr: "Capacité 400 ml, pratique pour votre usage domestique quotidien. Non gras, agréable à utiliser.\n\n• Extraits de plantes pures qui améliorent les composants chimiques endommageant les cheveux et la peau.\n• Facile à utiliser : portez des gants, pressez le shampooing, frottez quelques minutes comme un shampooing ordinaire.\n• Colore rapidement les cheveux gris et les couvre instantanément, laissant les cheveux brillants.\n• Ingrédients sûrs, doux et non irritants — n'endommage pas le cuir chevelu ni les cheveux.",
      ar: 'سعة 400 مل، عملي للاستخدام المنزلي اليومي. غير دهني ومريح.\n\n• خلاصات نباتية نقية تحسّن المكونات الكيميائية المضرة بالشعر والبشرة.\n• سهل الاستخدام: ارتدي القفازات، اضغطي على الشامبو، افركي لبضع دقائق كشامبو عادي.\n• يصبغ الشعر الرمادي بسرعة ويغطيه فوراً، تاركاً الشعر لامعاً.\n• مكونات آمنة ولطيفة وغير مهيجة — لا تضر فروة الرأس أو الشعر.',
    },
    price: 50,
    rating: 4.4,
    reviews: 0,
    image: 'https://haytamparfumerie.com/cdn/shop/files/disaar-shampooing-colorant-marron-pour-cheveux-a-base-de-ginseng-et-d-huile-de-serpent-pour-couvrir-les-cheveux-gris-blancs.jpg?v=1703094170&width=493',
    badge: { fr: 'Nouveau', ar: 'جديد' },
    isNew: true,
  },
  {
    id: '69',
    name: {
      fr: 'Garnier Fructis Aloe Vera Hydra Bomb Shampoo 400ml',
      ar: 'غارنييه فروكتيس Aloe Vera Hydra Bomb شامبو 400 مل',
    },
    category: { fr: 'Cheveux', ar: 'العناية بالشعر' },
    description: {
      fr: "Essayez le Shampooing Hydratant Garnier Fructis Aloe Vera Hydra Bomb ! Formulé spécialement pour les cheveux normaux, il contient de l'extrait d'Aloe Vera et de la Glycérine Végétale qui offrent une hydratation optimale. Une hydratation explosive pour des cheveux nourris et doux !",
      ar: 'جربي شامبو غارنييه فروكتيس Aloe Vera Hydra Bomb المرطّب! مُصمَّم خصيصاً للشعر العادي، يحتوي على خلاصة الألوفيرا والجلسرين النباتي اللذين يوفران ترطيباً مثالياً. ترطيب انفجاري لشعر مغذّى وناعم!',
    },
    price: 35,
    rating: 4.5,
    reviews: 0,
    image: 'https://haytamparfumerie.com/cdn/shop/files/garnier-fructis-aloe-vera-hydra-bomb-hydrating-shampoo-400ml.jpg?v=1701132946&width=493',
    badge: { fr: 'Nouveau', ar: 'جديد' },
    isNew: true,
  },
  {
    id: '70',
    name: {
      fr: 'Garnier Fructis Liso & Brillo Shampoo',
      ar: 'غارنييه فروكتيس Liso & Brillo شامبو',
    },
    category: { fr: 'Cheveux', ar: 'العناية بالشعر' },
    description: {
      fr: "Le shampooing Garnier Fructis Liso & Brillo redonne brillance et vigueur à vos cheveux. Son concentré de fruits actif (extrait de zeste de citron, vitamines et nutriments des fruits) nourrit et renforce la fibre capillaire et le cuir chevelu en profondeur.",
      ar: 'شامبو غارنييه فروكتيس Liso & Brillo يعيد البريق والحيوية لشعرك. مركز الفواكه الفعّال (خلاصة قشر الليمون، الفيتامينات والعناصر الغذائية للفواكه) يغذي ويقوي خصلة الشعر وفروة الرأس في العمق.',
    },
    price: 35,
    rating: 4.5,
    reviews: 0,
    image: 'https://haytamparfumerie.com/cdn/shop/files/3600542024204.webp?v=1701133096&width=493',
    badge: { fr: 'Nouveau', ar: 'جديد' },
    isNew: true,
  },
  {
    id: '71',
    name: {
      fr: 'Garnier Ambre Solaire Sensitive Expert+ Brume Sèche Protectrice SPF50+',
      ar: 'غارنييه أمبر سولير Sensitive Expert+ بخاخ جاف واقٍ SPF50+',
    },
    category: { fr: 'Protection solaire', ar: 'الحماية الشمسية' },
    description: {
      fr: "Découvrez la protection solaire haute performance avec Garnier Ambre Solaire Sensitive Expert+ SPF50+, une brume sèche protectrice spécialement conçue pour les peaux claires, sensibles et intolérantes au soleil. Sa formule légère et non grasse offre une très haute protection contre les rayons UVA et UVB, tout en laissant un fini sec et confortable sur la peau. Grâce à sa texture brume ultra-légère, cette protection solaire est facile à appliquer et pénètre rapidement sans effet collant. Hypoallergénique, sans parfum et sans alcool, elle convient parfaitement aux peaux sensibles recherchant une protection efficace au quotidien.",
      ar: 'اكتشفي الحماية الشمسية عالية الأداء مع غارنييه أمبر سولير Sensitive Expert+ SPF50+، بخاخ جاف واقٍ مصمم خصيصاً للبشرة الفاتحة والحساسة وغير المتحملة للشمس. تركيبته الخفيفة وغير الدهنية توفر حماية عالية جداً ضد أشعة UVA و UVB، مع ترك لمسة جافة ومريحة على البشرة. بفضل قوامه فائق الخفة، يسهل تطبيقه ويتغلغل بسرعة دون أثر لزج. مضاد للحساسية، خالٍ من العطر والكحول.',
    },
    price: 90,
    rating: 4.7,
    reviews: 0,
    image: 'https://haytamparfumerie.com/cdn/shop/files/garnier-ambre-solaire-sensitive-expert--brume-s--che-protectrice-spf50-6a1047949a685.jpg?v=1779451798&width=493',
    badge: { fr: 'Nouveau', ar: 'جديد' },
    isNew: true,
  },
  {
    id: '72',
    name: {
      fr: 'Garnier Ambre Solaire Ideal Bronze Huile Protectrice Sublimatrice SPF 20',
      ar: 'غارنييه أمبر سولير Ideal Bronze زيت واقٍ مُبرز للسمرة SPF 20',
    },
    category: { fr: 'Protection solaire', ar: 'الحماية الشمسية' },
    description: {
      fr: "Obtenez un bronzage lumineux et uniforme tout en protégeant votre peau avec l'huile protectrice sublimatrice Garnier Ambre Solaire Ideal Bronze SPF 20. Sa formule légère aide à nourrir la peau et à révéler un fini satiné éclatant pendant l'exposition au soleil. Enrichie en huiles nourrissantes, cette huile solaire offre une protection moyenne contre les rayons UVA et UVB tout en sublimant le bronzage naturel de la peau. Sa texture non grasse pénètre facilement pour un confort optimal.",
      ar: 'احصلي على سمرة مشرقة ومتجانسة مع حماية بشرتك بزيت غارنييه أمبر سولير Ideal Bronze SPF 20 الواقي والمبرز للسمرة. تركيبته الخفيفة تساعد على تغذية البشرة وإظهار لمسة ساتانية متألقة أثناء التعرض للشمس. غني بالزيوت المغذية، يوفر هذا الزيت الشمسي حماية متوسطة ضد أشعة UVA و UVB مع إبراز السمرة الطبيعية للبشرة. قوامه غير الدهني يتغلغل بسهولة لراحة مثالية.',
    },
    price: 90,
    rating: 4.6,
    reviews: 0,
    image: 'https://haytamparfumerie.com/cdn/shop/files/black-and-white-aesthetic-minimalist-modern-simple-typography-coconut-cosmetics-logo-6a18c6ab3ad84.png?v=1780008621&width=493',
    badge: { fr: 'Nouveau', ar: 'جديد' },
    isNew: true,
  },
  {
    id: '73',
    name: {
      fr: 'Garnier Ambre Solaire Ideal Bronze Spray Protecteur Révélateur de Bronzage SPF 30',
      ar: 'غارنييه أمبر سولير Ideal Bronze بخاخ واقٍ مُظهر للسمرة SPF 30',
    },
    category: { fr: 'Protection solaire', ar: 'الحماية الشمسية' },
    description: {
      fr: "Découvrez le spray solaire Garnier Ambre Solaire Ideal Bronze SPF 30, conçu pour protéger la peau tout en révélant un bronzage uniforme et lumineux. Sa formule légère aide à obtenir un teint éclatant naturellement pendant l'exposition au soleil. Grâce à sa haute protection UVA et UVB, ce spray solaire protège efficacement la peau contre les effets du soleil tout en offrant une texture agréable et facile à appliquer.",
      ar: 'اكتشفي بخاخ غارنييه أمبر سولير Ideal Bronze SPF 30 الشمسي، المصمم لحماية البشرة مع إظهار سمرة متجانسة ومشرقة. تركيبته الخفيفة تساعد على الحصول على بشرة متألقة بشكل طبيعي أثناء التعرض للشمس. بفضل حمايته العالية ضد أشعة UVA و UVB، يحمي هذا البخاخ الشمسي البشرة بفعالية من تأثيرات الشمس مع توفير قوام لطيف وسهل التطبيق.',
    },
    price: 90,
    rating: 4.6,
    reviews: 0,
    image: 'https://haytamparfumerie.com/cdn/shop/files/black-and-white-aesthetic-minimalist-modern-simple-typography-coconut-cosmetics-logo-6a18c61d68482.png?v=1780008479&width=493',
    badge: { fr: 'Nouveau', ar: 'جديد' },
    isNew: true,
  },
  {
    id: '74',
    name: { fr: 'Topface Perfect Coverage Foundation', ar: 'توب فيس كريم أساس Perfect Coverage' },
    category: { fr: 'Maquillage', ar: 'المكياج' },
    description: {
      fr: "Topface Lasting Color — couverture parfaite, longue tenue toute la journée, formule hydratante tout en un. L'extrait de Palmaria Palmata aide à réduire les signes de fatigue sur la peau et lui donne un aspect plus vif, tandis que les minéraux contenus dans la formule aident à maintenir l'équilibre hydrique de la peau. Le FPS 20 offre une protection contre les rayons UV nocifs. Une formule non invasive et parfaitement compatible pour une expérience de maquillage parfaite.",
      ar: 'توب فيس Lasting Color — تغطية مثالية، ثبات طوال اليوم، تركيبة مرطبة الكل في واحد. خلاصة Palmaria Palmata تساعد على تقليل علامات التعب على البشرة ومنحها مظهراً أكثر حيوية، بينما تساعد المعادن في الحفاظ على التوازن المائي للبشرة. SPF 20 يوفر حماية ضد الأشعة فوق البنفسجية الضارة.',
    },
    price: 110,
    rating: 4.7,
    reviews: 0,
    image: 'https://haytamparfumerie.com/cdn/shop/files/32495439_Topface-Perfect-Coverage-Foundation-N-680x680.png?v=1702740759&width=493',
    badge: { fr: 'Nouveau', ar: 'جديد' },
    isNew: true,
  },
  {
    id: '75',
    name: { fr: 'Topface Baked Choice Rich Touch Blush On', ar: 'توب فيس بلاش Baked Choice Rich Touch' },
    category: { fr: 'Maquillage', ar: 'المكياج' },
    description: {
      fr: "Rich Touch Baked Blush On — avec sa formule unique et ses couleurs vibrantes, il donne un aspect lisse et attrayant. Sa formule enrichie en complexe minéral et en vitamine E offre à la peau un aspect sain et énergique.",
      ar: 'بلاش Rich Touch المخبوز — بتركيبته الفريدة وألوانه النابضة بالحياة، يمنح مظهراً ناعماً وجذاباً. تركيبته الغنية بمركب المعادن وفيتامين E تمنح البشرة مظهراً صحياً ومفعماً بالطاقة.',
    },
    price: 60,
    rating: 4.6,
    reviews: 0,
    image: 'https://haytamparfumerie.com/cdn/shop/files/Screenshot2023-12-16165224.png?v=1702741997&width=493',
    badge: { fr: 'Nouveau', ar: 'جديد' },
    isNew: true,
  },
  {
    id: '76',
    name: { fr: 'Topface Instyle Extra Black Rich Curl Mascara', ar: 'توب فيس ماسكارا Instyle Extra Black Rich Curl' },
    category: { fr: 'Maquillage', ar: 'المكياج' },
    description: {
      fr: "En une seule touche : un volume supplémentaire, des cils extra longs et extra noirs, un look glamour et durable.",
      ar: 'بلمسة واحدة: حجم إضافي، رموش طويلة جداً وسوداء جداً، إطلالة فاتنة وطويلة الأمد.',
    },
    price: 30,
    rating: 4.5,
    reviews: 0,
    image: 'https://haytamparfumerie.com/cdn/shop/files/pdt2_3_0_9_1_700x700_AAAAB26309.jpg?v=1702742112&width=493',
    badge: { fr: 'Nouveau', ar: 'جديد' },
    isNew: true,
  },
  {
    id: '77',
    name: { fr: 'Topface Instyle Extreme Matte Lip Paint', ar: 'توب فيس Instyle Extreme أحمر شفاه مات' },
    category: { fr: 'Maquillage', ar: 'المكياج' },
    description: {
      fr: "Extreme Matte Lip Paint pour une finition mate nette en une seule application. Le rouge à lèvres liquide intense longue tenue protège vos lèvres contre le dessèchement grâce à sa texture légère contenant de la vitamine E et de l'huile de macadamia, qui gardent sa couleur et son effet protecteur toute la journée — jusqu'à 12 heures.",
      ar: 'أحمر شفاه سائل مات Extreme Matte Lip Paint للحصول على لمسة نهائية مات نظيفة بتطبيق واحد. خط أحمر الشفاه السائل المكثف طويل الأمد يحمي شفتيك من الجفاف بفضل قوامه الخفيف الذي يحتوي على فيتامين E وزيت المكاديميا، يدوم حتى 12 ساعة.',
    },
    price: 50,
    rating: 4.6,
    reviews: 0,
    image: 'https://haytamparfumerie.com/cdn/shop/files/topface-instyle-extreme-matte-lip-paint-014-parfumerie-parapharmacie-palmarosa-shop-maroc-en-ligne-discount_1.jpg?v=1702744328&width=493',
    badge: { fr: 'Nouveau', ar: 'جديد' },
    isNew: true,
  },
  {
    id: '78',
    name: { fr: 'Topface Instyle Eyebrow Gel', ar: 'توب فيس جل الحواجب Instyle' },
    category: { fr: 'Maquillage', ar: 'المكياج' },
    description: {
      fr: "Eyebrow Gel — une formule non pénétrante et résistante à l'eau rend vos sourcils plus distinctifs. Remplissez les espaces entre les sourcils et protégez leur forme. Il aide à avoir des sourcils plus forts grâce à sa riche teneur en huile d'amande et huile soyeuse. Texture crémeuse et pinceau pratique pour une application facile et une riche pigmentation.",
      ar: 'جل الحواجب — تركيبة غير منفذة ومقاومة للماء تجعل حواجبك أكثر تميزاً. املئي الفراغات بين الحواجب واحمي شكلها. يساعد على الحصول على حواجب أقوى بفضل محتواه الغني بزيت اللوز والزيت الحريري. قوام كريمي وفرشاة عملية للتطبيق السهل.',
    },
    price: 55,
    rating: 4.6,
    reviews: 0,
    image: 'https://haytamparfumerie.com/cdn/shop/files/Instyle-Eyebrow-Gel-003.jpg?v=1701567372&width=493',
    badge: { fr: 'Nouveau', ar: 'جديد' },
    isNew: true,
  },
  {
    id: '79',
    name: { fr: 'Topface Skin Editor Matte Foundation', ar: 'توب فيس كريم أساس مات Skin Editor' },
    category: { fr: 'Maquillage', ar: 'المكياج' },
    description: {
      fr: "Skin Editor Matte Foundation est un fond de teint enrichi d'un mélange d'actifs pour une action matifiante. Les riches minéraux de sa formule aident à diminuer l'apparence des ridules et des rides sans dessécher la peau. Texture veloutée et saturée, extrêmement facile à appliquer. Le SPF 20 protège la peau des rayons UV nocifs. Dure jusqu'à 12 heures.",
      ar: 'كريم الأساس Skin Editor Matte غني بمزيج من المكونات الفعالة لعمل مطفي. المعادن الغنية في تركيبته تساعد على تقليل مظهر الخطوط الدقيقة والتجاعيد دون تجفيف البشرة. قوام مخملي مشبع، سهل التطبيق للغاية. SPF 20 يحمي البشرة من الأشعة فوق البنفسجية. يدوم حتى 12 ساعة.',
    },
    price: 82,
    rating: 4.7,
    reviews: 0,
    image: 'https://haytamparfumerie.com/cdn/shop/files/81874157_8681217229174-1-680x680.png?v=1702740446&width=493',
    badge: { fr: 'Nouveau', ar: 'جديد' },
    isNew: true,
  },
  {
    id: '80',
    name: { fr: 'Absolute New York 2 in 1 Brow Perfecter', ar: 'أبسولوت نيويورك Brow Perfecter 2 في 1' },
    category: { fr: 'Maquillage', ar: 'المكياج' },
    description: {
      fr: "Le Perfecteur Sourcils 2 en 1 ABSOLUTE offre un outil double-extrémité pour définir et remplir parfaitement les sourcils. La mine réfractaire et la pommade étanche avec sa mini brosse sont 100% sans parabène, sulfate, phtalate et parfum. Utilisez la mine pour peigner les sourcils, puis trempez la brosse dans la pommade avant de l'appliquer et de l'estomper. Remplissez les trous pour un arc parfait.",
      ar: 'محسّن الحواجب 2 في 1 من ABSOLUTE يوفر أداة مزدوجة الطرفين لتحديد وملء الحواجب بشكل مثالي. المخروط المقاوم والمرهم المقاوم للماء مع فرشاته الصغيرة خالية 100% من البارابين والسلفات والفثالات والعطر. استخدمي المخروط لتمشيط الحواجب، ثم اغمسي الفرشاة في المرهم قبل تطبيقه ودمجه.',
    },
    price: 94,
    rating: 4.7,
    reviews: 0,
    image: 'https://haytamparfumerie.com/cdn/shop/files/AEBD04_1024x1024_6b8fd36d-f591-4f53-9f8c-25aa2de03f15.webp?v=1698495318&width=493',
    badge: { fr: 'Nouveau', ar: 'جديد' },
    isNew: true,
  },
  {
    id: '81',
    name: { fr: 'Absolute New York Match Maker Jelly Rouge à Lèvres', ar: 'أبسولوت نيويورك Match Maker Jelly أحمر شفاه' },
    category: { fr: 'Maquillage', ar: 'المكياج' },
    description: {
      fr: "Découvrez le rouge à lèvres Match Maker Jelly ABSOLUTE NEW YORK, conçu en quatre nouvelles teintes sublimées. Ce rouge à lèvres réagit au pH naturel des lèvres pour créer des couleurs personnalisées avec une finition sans effet collant. Chaque couleur est liée à une romance différente, et vos lèvres dégageront un parfum léger et rafraîchissant. Sans sulfate ni phtalate, ce produit est la touche finale pour les amoureux de la beauté.",
      ar: 'اكتشفي أحمر الشفاه Match Maker Jelly من ABSOLUTE NEW YORK، مصمم بأربع درجات جديدة فاتنة. يتفاعل أحمر الشفاه هذا مع درجة الحموضة الطبيعية للشفاه لخلق ألوان مخصصة بلمسة نهائية غير لزجة. كل لون مرتبط برومانسية مختلفة، وستفوح من شفتيك رائحة عطرة منعشة. خالٍ من السلفات والفثالات.',
    },
    price: 95,
    rating: 4.8,
    reviews: 0,
    image: 'https://haytamparfumerie.com/cdn/shop/files/230503_MLMM03_MatchMaker_KS_1024x1024_0798fb8e-a68b-473a-8659-9cbb914cd6c0.webp?v=1698498497&width=493',
    badge: { fr: 'Nouveau', ar: 'جديد' },
    isNew: true,
  },
  {
    id: '82',
    name: { fr: 'Absolute New York Second Skin Primer Drops', ar: 'أبسولوت نيويورك Second Skin قطرات البرايمر' },
    category: { fr: 'Maquillage', ar: 'المكياج' },
    description: {
      fr: "Obtenez un teint brillant et velouté en hydratant votre peau grâce à l'huile de tournesol, de pépins de raisin et d'amande douce d'ABSOLUTE NEW YORK - Second Skin Primer Drops. Misez sur un primer qui offre une finition à la fois légère et délicate. Avec le sérum anti-âge ABSOLUTE NEW YORK - Second Skin Primer Drops, réduisez instantanément les ridules et défauts cutanés. Grâce à l'applicateur compte-gouttes, vous avez confort et contrôle total pour créer une base parfaite qui apportera une texture seconde peau et une finition légère à votre maquillage.",
      ar: 'احصلي على بشرة مشرقة ومخملية بترطيب بشرتك بفضل زيت دوار الشمس وبذور العنب واللوز الحلو من ABSOLUTE NEW YORK - Second Skin Primer Drops. راهني على برايمر يقدم لمسة نهائية خفيفة وناعمة في آن. مع سيروم مكافحة الشيخوخة، قلّلي فوراً الخطوط الدقيقة وعيوب البشرة. بفضل التطبيق بقطارة، لديك راحة وتحكم كامل لإنشاء قاعدة مثالية تمنح ملمس البشرة الثانية ولمسة نهائية خفيفة لمكياجك.',
    },
    price: 150,
    rating: 4.8,
    reviews: 0,
    image: 'https://haytamparfumerie.com/cdn/shop/files/51_H9eotvvL.jpg?v=1698496332&width=493',
    badge: { fr: 'Nouveau', ar: 'جديد' },
    isNew: true,
  },
]

export const featuredProducts = mockProducts.slice(0, 12)
export const bestSellerProducts = mockProducts.filter((p) => p.isBestSeller)
export const promoProducts = mockProducts.filter((p) => p.originalPrice && p.originalPrice > p.price)

export const mockBrands: MockBrand[] = [
  {
    id: 'cerave',
    name: 'CeraVe',
    tagline: { fr: 'Développé avec des dermatologues', ar: 'مُطوّر بالتعاون مع أطباء الجلد' },
    description: {
      fr: 'CeraVe est une marque américaine de référence, développée avec des dermatologues. Sa gamme de soins quotidiens à base des 3 céramides essentiels et acide hyaluronique restaure la barrière protectrice de la peau. Convient à tous les types de peau, même les plus sensibles. Sans parfum, non comédogène.',
      ar: 'سيرافي علامة أمريكية رائدة، تم تطويرها بالتعاون مع أطباء الجلد. مجموعة العناية اليومية المعتمدة على 3 سيراميدات أساسية وحمض الهيالورونيك تعيد بناء حاجز البشرة الواقي. مناسبة لجميع أنواع البشرة بما فيها الأكثر حساسية. خالية من العطور وغير مسببة لانسداد المسام.',
    },
    logo: 'https://www.cerave.ma/-/media/project/loreal/brand-sites/cerave/americas/ma/scx/ma-common-images/ma-pdp-packshots/baume-hydratant/baume-hydratant-454-g-lg.jpg?rev=-1?w=200&hash=BCCF3915C2E9E3FBCA89323483C0294B',
    cover: 'https://www.cerave.ma/-/media/project/loreal/brand-sites/cerave/americas/ma/scx/ma-common-images/ma-pdp-packshots/gel-moussant/gel-moussant-473-ml-lg.jpg?rev=-1?w=1200&hash=A44572F4188AFB9A02026161135079E0',
    origin: { fr: 'États-Unis', ar: 'الولايات المتحدة' },
    productCount: 3,
    spotlight: {
      bgClass: 'bg-[#1e3a8a]',
      accentClass: 'text-sky-300',
      headlineFr: 'Recommandé par les dermatologues',
    },
  },
  {
    id: 'la-roche-posay',
    name: 'La Roche-Posay',
    tagline: { fr: 'Recommandée par les dermatologues', ar: 'موصى بها من قبل أطباء الجلد' },
    description: {
      fr: "La Roche-Posay est une marque pharmaceutique française de référence, recommandée par 90 000 dermatologues dans le monde. Ses formules à base d'eau thermale de La Roche-Posay, riche en sélénium antioxydant, sont conçues pour les peaux sensibles, intolérantes et à problèmes. Chaque produit est testé sous strict contrôle dermatologique.",
      ar: 'لا روش بوزيه علامة صيدلية فرنسية رائدة، موصى بها من قبل 90 ألف طبيب جلد حول العالم. تركيباتها المعتمدة على ماء لا روش بوزيه الحراري الغني بالسيلينيوم المضاد للأكسدة مصممة للبشرات الحساسة والمتطلبة والمشكلة. كل منتج مختبر تحت إشراف دقيق من أطباء الجلد.',
    },
    logo: 'https://haytamparfumerie.com/cdn/shop/files/la-roche-posay-toleriane-sensitive-creme-hydratante-apaisante-peau-sensible40ml-1-68a90e7545135.jpg?v=1755909790&width=200',
    cover: 'https://haytamparfumerie.com/cdn/shop/files/la-roche-posay-productpage-acne-effaclar-cleansing-foaming-gel-400ml-3337872411991-zoom-front-n.webp?v=1707850841&width=1200',
    origin: { fr: 'France', ar: 'فرنسا' },
    productCount: 3,
    spotlight: {
      bgClass: 'bg-[#3d2418]',
      accentClass: 'text-rose-300',
      headlineFr: 'L\'exigence dermatologique française',
    },
  },
  {
    id: 'bioderma',
    name: 'Bioderma',
    tagline: { fr: 'La biologie au service de la dermatologie', ar: 'علم الأحياء في خدمة طب الجلد' },
    description: {
      fr: "Bioderma est une marque dermatologique française pionnière, fondée à Lyon en 1977. Première à appliquer la biologie cutanée à la formulation, elle développe des soins ciblés inspirés des mécanismes naturels de la peau. Ses gammes Sensibio, Hydrabio, Sébium, Atoderm et Photoderm sont reconnues mondialement par les dermatologues pour leur efficacité et leur tolérance exceptionnelle.",
      ar: 'بيوديرما علامة فرنسية رائدة في طب الجلد، تأسست في ليون عام 1977. أول من طبّق علم الأحياء الجلدي في تركيب المنتجات، تطوّر منتجات عناية مستهدفة مستوحاة من الآليات الطبيعية للبشرة. مجموعاتها سينسيبيو، هيدرابيو، سيبيوم، أتوديرم وفوتوديرم معتمدة عالمياً من قبل أطباء الجلد لفعاليتها وتحمّلها الاستثنائي.',
    },
    logo: 'https://www.zinabel.ma/14665-large_default/hydrabio-perfecteur-spf30-40-ml.jpg',
    cover: 'https://www.zinabel.ma/14689-large_default/sebium-mat-control-30-ml.jpg',
    origin: { fr: 'France', ar: 'فرنسا' },
    productCount: 1,
    spotlight: {
      bgClass: 'bg-[#0f4c5c]',
      accentClass: 'text-amber-300',
      headlineFr: 'La biologie au service de la peau',
    },
  },
  {
    id: 'eucerin',
    name: 'Eucerin',
    tagline: { fr: 'L\'expertise dermatologique allemande', ar: 'الخبرة الجلدية الألمانية' },
    description: {
      fr: "Eucerin est une marque dermatologique allemande de référence, fondée à Hambourg en 1900 et reconnue mondialement pour son expertise scientifique. Recommandée par les dermatologues, elle développe des soins efficaces pour les peaux sensibles, sèches, mixtes ou présentant des problèmes spécifiques. Ses gammes phares Hyaluron-Filler, Anti-Pigment, Sun Protection et AQUAporin allient innovation pharmaceutique et tolérance optimale.",
      ar: 'يوسرين علامة جلدية ألمانية رائدة، تأسست في هامبورغ عام 1900 ومعتمدة عالمياً بخبرتها العلمية. موصى بها من أطباء الجلد، تطوّر منتجات عناية فعّالة للبشرات الحساسة والجافة والمختلطة أو ذات المشاكل المحددة. مجموعاتها الرئيسية هيالورون-فيلر، أنتي-بيغمنت، الحماية الشمسية و AQUAporin تجمع بين الابتكار الصيدلي والتحمّل الأمثل.',
    },
    logo: 'https://haytamparfumerie.com/cdn/shop/products/EUCERIN_SUN_PROTECTION_PHOTOAGING_CONTROL_Fluid_SPF_50.jpg?v=1713727918&width=200',
    cover: 'https://haytamparfumerie.com/cdn/shop/files/Eucerin_ANTI-PIGMENT_SOIN_DE_JOUR_SPF_30_50_ML.jpg?v=1724261560&width=1200',
    origin: { fr: 'Allemagne', ar: 'ألمانيا' },
    productCount: 3,
    spotlight: {
      bgClass: 'bg-[#1c3a4f]',
      accentClass: 'text-amber-200',
      headlineFr: 'Pharmacie allemande depuis 1900',
    },
  },
  {
    id: 'vichy',
    name: 'Vichy',
    tagline: { fr: 'La santé est belle', ar: 'الصحة هي الجمال' },
    description: {
      fr: "Vichy est une marque dermatologique française pionnière, née de l'eau thermale volcanique de Vichy aux minéraux fortifiants. Recommandée par les dermatologues, elle développe des soins du visage, du corps et des cheveux d'efficacité prouvée pour les peaux et cuirs chevelus sensibles. Ses gammes Dercos, Liftactiv, Minéral 89, Capital Soleil et Normaderm allient science, sécurité et résultats visibles.",
      ar: 'فيشي علامة جلدية فرنسية رائدة، وُلدت من مياه فيشي الحرارية البركانية الغنية بالمعادن المقوية. موصى بها من قبل أطباء الجلد، تطوّر منتجات عناية بالوجه والجسم والشعر بفعالية مُثبتة للبشرات وفروات الرأس الحساسة. مجموعاتها ديركوس، ليفتاكتيف، مينرال 89، كابيتال سولي ونورمادرم تجمع بين العلم والأمان والنتائج المرئية.',
    },
    logo: 'https://haytamparfumerie.com/cdn/shop/files/Design_sans_titre_-_2025-12-02T125514.831.png?v=1764676713&width=200',
    cover: 'https://haytamparfumerie.com/cdn/shop/files/DERCOS_TECHNIQUE_Shampooing_ENERGY_Anti-Chute_200_ML.jpg?v=1728992057&width=1200',
    origin: { fr: 'France', ar: 'فرنسا' },
    productCount: 2,
    spotlight: {
      bgClass: 'bg-[#0d3b66]',
      accentClass: 'text-sky-200',
      headlineFr: 'La science thermale française',
    },
  },
  {
    id: 'fino',
    name: 'Fino',
    tagline: { fr: 'La perfection capillaire japonaise', ar: 'إتقان العناية بالشعر اليابانية' },
    description: {
      fr: "Fino est une marque japonaise haut de gamme du groupe Shiseido, dédiée aux soins capillaires intensifs. Ses formules raffinées combinent la gelée royale EX, le PCA et le Lipidure EX pour offrir aux cheveux secs, abîmés, colorés ou permanentés une réparation en profondeur et une brillance soyeuse. Made in Japan, l'expression du savoir-faire cosmétique nippon.",
      ar: 'فينو علامة يابانية فاخرة من مجموعة شيسيدو، مخصصة للعناية المكثفة بالشعر. تركيباتها الراقية تجمع بين الهلام الملكي EX و PCA و Lipidure EX لتقديم إصلاح عميق ولمعان حريري للشعر الجاف والتالف والمصبوغ أو المعالج كيميائياً. صُنع في اليابان، تعبير عن الحرفية اليابانية في التجميل.',
    },
    logo: 'https://haytamparfumerie.com/cdn/shop/files/Screenshot_195.png?v=1756754067&width=200',
    cover: 'https://haytamparfumerie.com/cdn/shop/files/Screenshot_195.png?v=1756754067&width=1200',
    origin: { fr: 'Japon', ar: 'اليابان' },
    productCount: 1,
    spotlight: {
      bgClass: 'bg-[#1a0e1a]',
      accentClass: 'text-pink-300',
      headlineFr: 'L\'art capillaire japonais',
    },
  },
  {
    id: 'johnsons',
    name: "Johnson's",
    tagline: { fr: 'La douceur depuis 1894', ar: 'اللطف منذ 1894' },
    description: {
      fr: "Johnson's est la marque pédiatrique américaine de référence, fondée en 1894 et présente dans des millions de foyers à travers le monde. Sa gamme de soins pour bébés — shampooings, gels lavants, lotions hydratantes — est formulée avec une douceur extrême, sans larmes, hypoallergénique, et testée sous contrôle pédiatrique. La référence en soins infantiles.",
      ar: 'جونسون العلامة الأمريكية الرائدة في عناية الأطفال، تأسست عام 1894 وموجودة في ملايين البيوت حول العالم. مجموعة عناية الأطفال — شامبوهات، جل غسول، لوشن مرطب — مصممة بلطف فائق، بدون دموع، مضادة للحساسية، ومختبرة تحت إشراف طب الأطفال. المرجع في عناية الأطفال.',
    },
    logo: 'https://haytamparfumerie.com/cdn/shop/files/white-61cczaeSTLL._AC_SL1500.jpg?v=1729080558&width=200',
    cover: 'https://haytamparfumerie.com/cdn/shop/files/white-71C4nq083zL._AC_SL1500.jpg?v=1729081151&width=1200',
    origin: { fr: 'États-Unis', ar: 'الولايات المتحدة' },
    productCount: 2,
    spotlight: {
      bgClass: 'bg-[#3d5e8c]',
      accentClass: 'text-amber-100',
      headlineFr: 'Pour la peau délicate de bébé',
    },
  },
  {
    id: 'garnier',
    name: 'Garnier',
    tagline: { fr: 'La nature au cœur de chaque flacon', ar: 'الطبيعة في قلب كل قنينة' },
    description: {
      fr: "Garnier est une marque française historique du groupe L'Oréal, célèbre pour ses formules naturelles et accessibles. Ses gammes Fructis (cheveux), Skin Active (visage), Ambre Solaire (solaire) et Color Naturals (coloration) puisent dans la science et la nature : aloe vera, vitamine C, charbon végétal, eaux florales. Beauté efficace pour toutes.",
      ar: 'غارنييه علامة فرنسية تاريخية من مجموعة لوريال، مشهورة بتركيباتها الطبيعية والمتاحة للجميع. مجموعاتها فروكتيس (الشعر)، سكين أكتيف (الوجه)، أمبر سولير (الحماية الشمسية) وكولور ناتشورالز (الصبغة) تستلهم من العلم والطبيعة: ألوفيرا، فيتامين سي، فحم نباتي، مياه زهور. جمال فعّال للجميع.',
    },
    logo: 'https://haytamparfumerie.com/cdn/shop/files/garnier-fructis-aloe-vera-hydra-bomb-hydrating-shampoo-400ml.jpg?v=1701132946&width=200',
    cover: 'https://haytamparfumerie.com/cdn/shop/files/3600542024204.webp?v=1701133096&width=1200',
    origin: { fr: 'France', ar: 'فرنسا' },
    productCount: 2,
    spotlight: {
      bgClass: 'bg-[#0e3b1c]',
      accentClass: 'text-lime-300',
      headlineFr: 'La nature au cœur de la beauté',
    },
  },
  {
    id: 'topface',
    name: 'Topface',
    tagline: { fr: 'Maquillage longue tenue, formule hydratante', ar: 'مكياج يدوم طويلاً، تركيبة مرطبة' },
    description: {
      fr: "Topface est une marque de maquillage internationale offrant des fonds de teint, blush, mascaras, rouges à lèvres et soins des sourcils à des prix accessibles. Ses formules combinent tenue longue durée, hydratation et protection UV (SPF 20) pour un maquillage parfait au quotidien.",
      ar: 'توب فيس علامة مكياج عالمية تقدم كريم الأساس، البلاش، الماسكارا، أحمر الشفاه وعناية الحواجب بأسعار في المتناول. تركيباتها تجمع بين الثبات الطويل والترطيب والحماية من الأشعة فوق البنفسجية (SPF 20) لمكياج مثالي يومياً.',
    },
    logo: 'https://haytamparfumerie.com/cdn/shop/files/32495439_Topface-Perfect-Coverage-Foundation-N-680x680.png?v=1702740759&width=200',
    cover: 'https://haytamparfumerie.com/cdn/shop/files/32495439_Topface-Perfect-Coverage-Foundation-N-680x680.png?v=1702740759&width=1200',
    origin: { fr: 'International', ar: 'دولية' },
    productCount: 6,
    spotlight: {
      bgClass: 'bg-[#2a0e1f]',
      accentClass: 'text-pink-300',
      headlineFr: 'Maquillage longue tenue',
    },
  },
  {
    id: 'absolute-ny',
    name: 'Absolute New York',
    tagline: { fr: 'Beauté audacieuse, qualité professionnelle', ar: 'جمال جريء بجودة احترافية' },
    description: {
      fr: "Absolute New York est une marque américaine de maquillage professionnel qui propose des produits de haute qualité — primers, rouges à lèvres, soins des sourcils — sans parabène, sulfate ni phtalate. Inspirée de l'énergie créative de New York, elle s'adresse aux amoureux de la beauté qui veulent un maquillage tendance et performant.",
      ar: 'أبسولوت نيويورك علامة مكياج احترافية أمريكية تقدم منتجات عالية الجودة — برايمر، أحمر شفاه، عناية الحواجب — خالية من البارابين والسلفات والفثالات. مستوحاة من الطاقة الإبداعية لنيويورك، تخاطب عشاق الجمال الذين يريدون مكياجاً عصرياً وفعّالاً.',
    },
    logo: 'https://haytamparfumerie.com/cdn/shop/files/AEBD04_1024x1024_6b8fd36d-f591-4f53-9f8c-25aa2de03f15.webp?v=1698495318&width=200',
    cover: 'https://haytamparfumerie.com/cdn/shop/files/230503_MLMM03_MatchMaker_KS_1024x1024_0798fb8e-a68b-473a-8659-9cbb914cd6c0.webp?v=1698498497&width=1200',
    origin: { fr: 'États-Unis', ar: 'الولايات المتحدة' },
    productCount: 3,
    spotlight: {
      bgClass: 'bg-[#1a0e2a]',
      accentClass: 'text-fuchsia-300',
      headlineFr: 'Beauté professionnelle de NY',
    },
  },
  {
    id: 'disaar',
    name: 'Disaar',
    tagline: { fr: 'Coloration capillaire aux extraits naturels', ar: 'صبغة شعر بمكونات طبيعية' },
    description: {
      fr: "Disaar propose des shampooings colorants innovants à base d'extraits de plantes (ginseng, huile de serpent) pour couvrir les cheveux gris efficacement en quelques minutes. Formulation douce sans ammoniaque agressive, faciles à utiliser à domicile, ils colorent tout en respectant la fibre capillaire et le cuir chevelu.",
      ar: 'ديسار يقدم شامبوهات صبغ مبتكرة بخلاصات نباتية (الجينسنغ، زيت الثعبان) لتغطية الشعر الرمادي بفعالية في دقائق. تركيبة لطيفة بدون أمونيا قاسية، سهلة الاستخدام في المنزل، تصبغ مع احترام بنية الشعر وفروة الرأس.',
    },
    logo: 'https://haytamparfumerie.com/cdn/shop/files/disaar-shampooing-colorant-marron-pour-cheveux-a-base-de-ginseng-et-d-huile-de-serpent-pour-couvrir-les-cheveux-gris-blancs.jpg?v=1703094170&width=200',
    cover: 'https://haytamparfumerie.com/cdn/shop/files/disaar-shampooing-colorant-marron-pour-cheveux-a-base-de-ginseng-et-d-huile-de-serpent-pour-couvrir-les-cheveux-gris-blancs.jpg?v=1703094170&width=1200',
    origin: { fr: 'Chine', ar: 'الصين' },
    productCount: 1,
    spotlight: {
      bgClass: 'bg-[#3d1a14]',
      accentClass: 'text-amber-300',
      headlineFr: 'Coloration naturelle express',
    },
  },
]

// Assign products to brands — smart category-based rules
mockProducts.forEach((p, i) => {
  // CeraVe-branded products → CeraVe brand
  if (/\bcerave\b/i.test(p.name.fr)) p.brandId = 'cerave'
  // La Roche-Posay products → La Roche-Posay brand (catches "La Roche-Posay", "La Roche Posay", "La roche posay")
  else if (/roche[\s-]?posay/i.test(p.name.fr)) p.brandId = 'la-roche-posay'
  // Bioderma products → Bioderma brand
  else if (/\bbioderma\b/i.test(p.name.fr)) p.brandId = 'bioderma'
  // Eucerin products → Eucerin brand
  else if (/\beucerin\b/i.test(p.name.fr)) p.brandId = 'eucerin'
  // Vichy products (including Dercos line which is a Vichy sub-brand)
  else if (/\bvichy\b/i.test(p.name.fr) || /\bdercos\b/i.test(p.name.fr)) p.brandId = 'vichy'
  // Fino products → Fino brand
  else if (/\bfino\b/i.test(p.name.fr)) p.brandId = 'fino'
  // Johnson's products → Johnson's brand
  else if (/\bjohnson'?s?\b/i.test(p.name.fr)) p.brandId = 'johnsons'
  // Garnier products → Garnier brand (includes Fructis line)
  else if (/\bgarnier\b/i.test(p.name.fr) || /\bfructis\b/i.test(p.name.fr)) p.brandId = 'garnier'
  // Disaar products → Disaar brand
  else if (/\bdisaar\b/i.test(p.name.fr)) p.brandId = 'disaar'
  // Topface products → Topface brand
  else if (/\btopface\b/i.test(p.name.fr)) p.brandId = 'topface'
  // Absolute New York products → Absolute NY brand
  else if (/\babsolute\s*(new\s*york|ny)?\b/i.test(p.name.fr)) p.brandId = 'absolute-ny'
})

// Auto-update productCount on each brand so the cards always show the truth
mockBrands.forEach((brand) => {
  brand.productCount = mockProducts.filter((p) => p.brandId === brand.id).length
})
