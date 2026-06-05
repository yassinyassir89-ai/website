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
    id: 'coffrets',
    name: { fr: 'Coffrets cadeaux', ar: 'علب الهدايا' },
    image: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=400&auto=format&fit=crop&q=80',
    href: '/boutique?category=coffrets',
    count: 22,
  },
]

export const mockProducts: MockProduct[] = [
  {
    id: '1',
    name: { fr: 'Sérum Éclat Hydratant', ar: 'سيروم ترطيب وإشراق' },
    category: { fr: 'Soin du visage', ar: 'العناية بالبشرة' },
    price: 249,
    originalPrice: 320,
    rating: 4.8,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80',
    badge: { fr: 'Bestseller', ar: 'الأكثر مبيعاً' },
    isBestSeller: true,
  },
  {
    id: '2',
    name: { fr: 'Crème de Nuit Réparatrice', ar: 'كريم ليلي إصلاحي' },
    category: { fr: 'Soin du visage', ar: 'العناية بالبشرة' },
    price: 299,
    rating: 4.7,
    reviews: 187,
    image: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=600&auto=format&fit=crop&q=80',
    badge: { fr: 'Nouveau', ar: 'جديد' },
    isNew: true,
  },
  {
    id: '3',
    name: { fr: 'Masque Visage Argile Rose', ar: 'قناع وجه بالطين الوردي' },
    category: { fr: 'Soin du visage', ar: 'العناية بالبشرة' },
    price: 189,
    originalPrice: 240,
    rating: 4.6,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80',
    badge: { fr: '-21%', ar: '-21%' },
  },
  {
    id: '4',
    name: { fr: 'Huile de Rose Précieuse', ar: 'زيت الورد الثمين' },
    category: { fr: 'Soin du visage', ar: 'العناية بالبشرة' },
    price: 349,
    rating: 4.9,
    reviews: 312,
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&auto=format&fit=crop&q=80',
    badge: { fr: 'Bestseller', ar: 'الأكثر مبيعاً' },
    isBestSeller: true,
  },
  {
    id: '5',
    name: { fr: 'Mousse Nettoyante Douce', ar: 'غسول رغوي لطيف' },
    category: { fr: 'Soin du visage', ar: 'العناية بالبشرة' },
    price: 149,
    originalPrice: 190,
    rating: 4.5,
    reviews: 98,
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&auto=format&fit=crop&q=80',
    badge: { fr: 'Nouveau', ar: 'جديد' },
    isNew: true,
  },
  {
    id: '6',
    name: { fr: 'Tonique Apaisant Camomille', ar: 'تونر مهدئ بالبابونج' },
    category: { fr: 'Soin du visage', ar: 'العناية بالبشرة' },
    price: 179,
    rating: 4.7,
    reviews: 143,
    image: 'https://images.unsplash.com/photo-1600428877878-1a0fd85beda8?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: '7',
    name: { fr: 'Contour des Yeux Anti-Âge', ar: 'كريم محيط العين' },
    category: { fr: 'Soin du visage', ar: 'العناية بالبشرة' },
    price: 289,
    originalPrice: 360,
    rating: 4.8,
    reviews: 201,
    image: 'https://images.unsplash.com/photo-1631730486572-226d1f595b68?w=600&auto=format&fit=crop&q=80',
    badge: { fr: '-20%', ar: '-20%' },
    isBestSeller: true,
  },
  {
    id: '8',
    name: { fr: 'Écran Solaire SPF 50+', ar: 'واقي شمس SPF 50+' },
    category: { fr: 'Protection solaire', ar: 'الحماية الشمسية' },
    price: 219,
    rating: 4.6,
    reviews: 267,
    image: 'https://images.unsplash.com/photo-1526758097130-bab247274f58?w=600&auto=format&fit=crop&q=80',
    badge: { fr: 'Bestseller', ar: 'الأكثر مبيعاً' },
    isBestSeller: true,
  },
  {
    id: '10',
    name: { fr: 'Sérum Vitamine C', ar: 'سيروم فيتامين سي' },
    category: { fr: 'Soin du visage', ar: 'العناية بالبشرة' },
    price: 279,
    originalPrice: 350,
    rating: 4.9,
    reviews: 445,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80&sat=-30',
    badge: { fr: 'Bestseller', ar: 'الأكثر مبيعاً' },
    isBestSeller: true,
  },
  {
    id: '11',
    name: { fr: 'Crème Mains Nourrissante', ar: 'كريم يدين مغذي' },
    category: { fr: 'Soin du corps', ar: 'العناية بالجسم' },
    price: 129,
    rating: 4.5,
    reviews: 112,
    image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: '12',
    name: { fr: 'Coffret Routine Glow', ar: 'علبة روتين الإشراق' },
    category: { fr: 'Coffrets cadeaux', ar: 'علب الهدايا' },
    price: 549,
    originalPrice: 720,
    rating: 4.9,
    reviews: 178,
    image: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=600&auto=format&fit=crop&q=80',
    badge: { fr: '-24%', ar: '-24%' },
    isNew: true,
  },
  // === CHEVEUX ===
  {
    id: '23',
    name: { fr: 'Shampooing Argan Réparateur', ar: 'شامبو الأركان الإصلاحي' },
    category: { fr: 'Cheveux', ar: 'العناية بالشعر' },
    price: 169,
    originalPrice: 220,
    rating: 4.7,
    reviews: 312,
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&auto=format&fit=crop&q=80',
    badge: { fr: '-23%', ar: '-23%' },
    isBestSeller: true,
  },
  {
    id: '24',
    name: { fr: 'Après-Shampooing Hydratant', ar: 'بلسم مرطب للشعر' },
    category: { fr: 'Cheveux', ar: 'العناية بالشعر' },
    price: 149,
    rating: 4.5,
    reviews: 187,
    image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: '25',
    name: { fr: 'Huile Capillaire Précieuse', ar: 'زيت الشعر الثمين' },
    category: { fr: 'Cheveux', ar: 'العناية بالشعر' },
    price: 219,
    originalPrice: 280,
    rating: 4.8,
    reviews: 256,
    image: 'https://images.unsplash.com/photo-1597354984706-fac992d9306f?w=600&auto=format&fit=crop&q=80',
    badge: { fr: 'Bestseller', ar: 'الأكثر مبيعاً' },
    isBestSeller: true,
  },
  {
    id: '26',
    name: { fr: 'Masque Capillaire Intense', ar: 'قناع شعر مكثف' },
    category: { fr: 'Cheveux', ar: 'العناية بالشعر' },
    price: 189,
    rating: 4.6,
    reviews: 143,
    image: 'https://images.unsplash.com/photo-1626015449936-5d3a399c7be1?w=600&auto=format&fit=crop&q=80',
    badge: { fr: 'Nouveau', ar: 'جديد' },
    isNew: true,
  },
  {
    id: '27',
    name: { fr: 'Sérum Anti-Frisottis', ar: 'سيروم ضد التجعّد' },
    category: { fr: 'Cheveux', ar: 'العناية بالشعر' },
    price: 129,
    rating: 4.4,
    reviews: 98,
    image: 'https://images.unsplash.com/photo-1631730486572-226d1f595b68?w=600&auto=format&fit=crop&q=80&hue=15',
  },
  // === PROTECTION SOLAIRE ===
  {
    id: '28',
    name: { fr: 'Brume Solaire SPF 30', ar: 'بخاخ شمسي SPF 30' },
    category: { fr: 'Protection solaire', ar: 'الحماية الشمسية' },
    price: 159,
    rating: 4.6,
    reviews: 167,
    image: 'https://images.unsplash.com/photo-1607602132700-068258431c6c?w=600&auto=format&fit=crop&q=80',
    badge: { fr: 'Nouveau', ar: 'جديد' },
    isNew: true,
  },
  {
    id: '29',
    name: { fr: 'Stick Solaire SPF 50', ar: 'استيك شمسي SPF 50' },
    category: { fr: 'Protection solaire', ar: 'الحماية الشمسية' },
    price: 119,
    originalPrice: 150,
    rating: 4.7,
    reviews: 198,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80&sat=20',
    badge: { fr: '-20%', ar: '-20%' },
  },
  {
    id: '30',
    name: { fr: 'Crème Après-Soleil Apaisante', ar: 'كريم مهدئ بعد الشمس' },
    category: { fr: 'Protection solaire', ar: 'الحماية الشمسية' },
    price: 139,
    rating: 4.5,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1556228852-80b6e5eeff06?w=600&auto=format&fit=crop&q=80',
  },
  // === SOIN DU CORPS ===
  {
    id: '31',
    name: { fr: 'Gel Douche Vanille Miel', ar: 'جل استحمام بالفانيليا والعسل' },
    category: { fr: 'Soin du corps', ar: 'العناية بالجسم' },
    price: 99,
    originalPrice: 130,
    rating: 4.6,
    reviews: 145,
    image: 'https://images.unsplash.com/photo-1556228841-7c4f96e83a82?w=600&auto=format&fit=crop&q=80',
    badge: { fr: '-24%', ar: '-24%' },
  },
  {
    id: '32',
    name: { fr: 'Gommage Corps Sucre Argan', ar: 'مقشّر جسم بالسكر والأركان' },
    category: { fr: 'Soin du corps', ar: 'العناية بالجسم' },
    price: 159,
    rating: 4.8,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&auto=format&fit=crop&q=80',
    badge: { fr: 'Bestseller', ar: 'الأكثر مبيعاً' },
    isBestSeller: true,
  },
  {
    id: '33',
    name: { fr: 'Lait Corporel Karité', ar: 'لوشن للجسم بزبدة الشيا' },
    category: { fr: 'Soin du corps', ar: 'العناية بالجسم' },
    price: 179,
    rating: 4.7,
    reviews: 167,
    image: 'https://images.unsplash.com/photo-1620916297893-1ef3c89bb6c2?w=600&auto=format&fit=crop&q=80',
    badge: { fr: 'Nouveau', ar: 'جديد' },
    isNew: true,
  },
  {
    id: '34',
    name: { fr: 'Huile Sèche Précieuse Corps', ar: 'زيت جاف ثمين للجسم' },
    category: { fr: 'Soin du corps', ar: 'العناية بالجسم' },
    price: 229,
    originalPrice: 290,
    rating: 4.9,
    reviews: 312,
    image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?w=600&auto=format&fit=crop&q=80',
    badge: { fr: '-21%', ar: '-21%' },
    isBestSeller: true,
  },
  // === PARFUMS ===
  {
    id: '35',
    name: { fr: 'Eau de Parfum Rose Damas', ar: 'عطر ماء الورد الدمشقي' },
    category: { fr: 'Parfums', ar: 'العطور' },
    price: 449,
    rating: 4.9,
    reviews: 287,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&auto=format&fit=crop&q=80',
    badge: { fr: 'Bestseller', ar: 'الأكثر مبيعاً' },
    isBestSeller: true,
  },
  {
    id: '36',
    name: { fr: 'Parfum Oud Précieux', ar: 'عطر العود الثمين' },
    category: { fr: 'Parfums', ar: 'العطور' },
    price: 689,
    originalPrice: 850,
    rating: 4.8,
    reviews: 198,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&auto=format&fit=crop&q=80',
    badge: { fr: '-19%', ar: '-19%' },
  },
  {
    id: '37',
    name: { fr: 'Brume Corporelle Vanille', ar: 'بخاخ جسم بالفانيليا' },
    category: { fr: 'Parfums', ar: 'العطور' },
    price: 169,
    rating: 4.6,
    reviews: 134,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&auto=format&fit=crop&q=80',
    badge: { fr: 'Nouveau', ar: 'جديد' },
    isNew: true,
  },
  {
    id: '38',
    name: { fr: 'Eau Fraîche Agrumes', ar: 'ماء معطر بالحمضيات' },
    category: { fr: 'Parfums', ar: 'العطور' },
    price: 249,
    rating: 4.5,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&auto=format&fit=crop&q=80',
  },
  // === COFFRETS CADEAUX (extra) ===
  {
    id: '39',
    name: { fr: 'Coffret Maman Premium', ar: 'علبة هدايا للأم بريميوم' },
    category: { fr: 'Coffrets cadeaux', ar: 'علب الهدايا' },
    price: 799,
    originalPrice: 1050,
    rating: 4.9,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=600&auto=format&fit=crop&q=80',
    badge: { fr: '-24%', ar: '-24%' },
    isBestSeller: true,
  },
  {
    id: '40',
    name: { fr: 'Coffret Découverte K-Beauty', ar: 'علبة اكتشاف الجمال الكوري' },
    category: { fr: 'Coffrets cadeaux', ar: 'علب الهدايا' },
    price: 449,
    rating: 4.8,
    reviews: 198,
    image: 'https://images.unsplash.com/photo-1596704017256-26e9dccfe34d?w=600&auto=format&fit=crop&q=80&sat=-10',
    badge: { fr: 'Nouveau', ar: 'جديد' },
    isNew: true,
  },
  // === SOIN DU VISAGE (extra) ===
  {
    id: '41',
    name: { fr: 'Crème Hydratante 24h', ar: 'كريم ترطيب 24 ساعة' },
    category: { fr: 'Soin du visage', ar: 'العناية بالبشرة' },
    price: 229,
    originalPrice: 290,
    rating: 4.7,
    reviews: 267,
    image: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=600&auto=format&fit=crop&q=80&hue=320',
    badge: { fr: '-21%', ar: '-21%' },
    isBestSeller: true,
  },
  {
    id: '42',
    name: { fr: 'Exfoliant Visage AHA', ar: 'مقشّر وجه AHA' },
    category: { fr: 'Soin du visage', ar: 'العناية بالبشرة' },
    price: 199,
    rating: 4.6,
    reviews: 145,
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&auto=format&fit=crop&q=80',
    badge: { fr: 'Nouveau', ar: 'جديد' },
    isNew: true,
  },
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
]

export const featuredProducts = mockProducts.slice(0, 12)
export const bestSellerProducts = mockProducts.filter((p) => p.isBestSeller)
export const promoProducts = mockProducts.filter((p) => p.originalPrice && p.originalPrice > p.price)

export const mockBrands: MockBrand[] = [
  {
    id: 'glow-naturals',
    name: 'Glow Naturals',
    tagline: { fr: 'La beauté naturelle révélée', ar: 'الجمال الطبيعي المُكتشف' },
    description: {
      fr: 'Marque française premium spécialisée dans les soins naturels et bio. Formules certifiées sans paraben ni sulfate, conçues pour révéler l\'éclat naturel de chaque peau.',
      ar: 'علامة فرنسية فاخرة متخصصة في العناية الطبيعية والعضوية. تركيبات معتمدة خالية من البارابين والكبريتات، مصممة لإبراز الإشراق الطبيعي لكل بشرة.',
    },
    logo: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&auto=format&fit=crop&q=80',
    cover: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&auto=format&fit=crop&q=85',
    origin: { fr: 'France', ar: 'فرنسا' },
    productCount: 10,
  },
  {
    id: 'rose-orient',
    name: 'Rose d\'Orient',
    tagline: { fr: 'L\'élégance marocaine', ar: 'الأناقة المغربية' },
    description: {
      fr: 'Marque marocaine d\'exception qui marie tradition et innovation. Inspirée par les rituels de beauté du Maghreb avec des ingrédients précieux : argan, rose de Damas, ghassoul.',
      ar: 'علامة مغربية استثنائية تجمع بين التقاليد والابتكار. مستوحاة من طقوس الجمال المغاربية بمكونات ثمينة: الأركان، الورد الدمشقي، الغاسول.',
    },
    logo: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=200&auto=format&fit=crop&q=80',
    cover: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=1200&auto=format&fit=crop&q=85',
    origin: { fr: 'Maroc', ar: 'المغرب' },
    productCount: 9,
  },
  {
    id: 'pure-essence',
    name: 'Pure Essence',
    tagline: { fr: 'Soins essentiels purs', ar: 'العناية الأساسية النقية' },
    description: {
      fr: 'Soins du quotidien accessibles, formulés avec rigueur scientifique. Tous les ingrédients sont traçables et la marque s\'engage pour une beauté responsable et durable.',
      ar: 'منتجات عناية يومية متاحة، مُصنّعة بدقة علمية. جميع المكونات قابلة للتتبع، والعلامة ملتزمة بجمال مسؤول ومستدام.',
    },
    logo: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=200&auto=format&fit=crop&q=80',
    cover: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1200&auto=format&fit=crop&q=85',
    origin: { fr: 'Suisse', ar: 'سويسرا' },
    productCount: 8,
  },
  {
    id: 'soleil-doree',
    name: 'Soleil Dorée',
    tagline: { fr: 'Protection & lumière', ar: 'الحماية والإشراق' },
    description: {
      fr: 'Spécialiste de la protection solaire haut de gamme. Filtres nouvelle génération qui protègent sans laisser de film blanc, pour une peau saine sous le soleil.',
      ar: 'متخصصة في الحماية الشمسية الفاخرة. فلاتر الجيل الجديد تحمي دون ترك طبقة بيضاء، لبشرة صحية تحت الشمس.',
    },
    logo: 'https://images.unsplash.com/photo-1526758097130-bab247274f58?w=200&auto=format&fit=crop&q=80',
    cover: 'https://images.unsplash.com/photo-1526758097130-bab247274f58?w=1200&auto=format&fit=crop&q=85',
    origin: { fr: 'Espagne', ar: 'إسبانيا' },
    productCount: 7,
  },
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
  // Sunscreen products always go to Soleil Dorée
  else if (p.category.fr === 'Protection solaire') p.brandId = 'soleil-doree'
  // Moroccan products (perfumes, argan-based) go to Rose d'Orient
  else if (p.category.fr === 'Parfums' || p.name.fr.includes('Argan') || p.name.fr.includes('Rose')) p.brandId = 'rose-orient'
  // Rest cycle between Glow Naturals and Pure Essence
  else p.brandId = i % 2 === 0 ? 'glow-naturals' : 'pure-essence'
})

// Auto-update productCount on each brand so the cards always show the truth
mockBrands.forEach((brand) => {
  brand.productCount = mockProducts.filter((p) => p.brandId === brand.id).length
})
