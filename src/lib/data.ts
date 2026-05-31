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
]

export const featuredProducts = mockProducts.slice(0, 8)
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
    cover: 'https://www.zinabel.ma/14665-large_default/hydrabio-perfecteur-spf30-40-ml.jpg',
    origin: { fr: 'France', ar: 'فرنسا' },
    productCount: 1,
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
