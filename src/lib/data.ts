export interface BilingualText {
  fr: string
  ar: string
}

export interface MockProduct {
  id: string
  name: BilingualText
  category: BilingualText
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
    id: 'maquillage',
    name: { fr: 'Maquillage', ar: 'المكياج' },
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&auto=format&fit=crop&q=80',
    href: '/boutique?category=maquillage',
    count: 62,
  },
  {
    id: 'cheveux',
    name: { fr: 'Cheveux', ar: 'العناية بالشعر' },
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&auto=format&fit=crop&q=80',
    href: '/boutique?category=cheveux',
    count: 34,
  },
  {
    id: 'k-beauty',
    name: { fr: 'K-Beauty', ar: 'الجمال الكوري' },
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&auto=format&fit=crop&q=80',
    href: '/boutique?category=k-beauty',
    count: 29,
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
    id: '9',
    name: { fr: 'Baume à Lèvres Repulpant', ar: 'بلسم شفاه ممتلئ' },
    category: { fr: 'Maquillage', ar: 'المكياج' },
    price: 89,
    originalPrice: 120,
    rating: 4.4,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1586495777744-4e6232bf2176?w=600&auto=format&fit=crop&q=80',
    badge: { fr: 'Nouveau', ar: 'جديد' },
    isNew: true,
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
    productCount: 4,
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
    productCount: 3,
  },
  {
    id: 'k-bloom',
    name: 'K-Bloom',
    tagline: { fr: 'L\'innovation coréenne', ar: 'الابتكار الكوري' },
    description: {
      fr: 'Pionnière de la K-Beauty haut de gamme. Technologies avancées et ingrédients fermentés pour une peau visiblement plus jeune et lumineuse en seulement quelques semaines.',
      ar: 'رائدة في الجمال الكوري الفاخر. تقنيات متطورة ومكونات مخمرة لبشرة أصغر سناً وأكثر إشراقاً خلال أسابيع قليلة.',
    },
    logo: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&auto=format&fit=crop&q=80',
    cover: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&auto=format&fit=crop&q=85',
    origin: { fr: 'Corée du Sud', ar: 'كوريا الجنوبية' },
    productCount: 2,
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
    productCount: 2,
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
    productCount: 1,
  },
]

// Assign products to brands (cycling through brands by index)
mockProducts.forEach((p, i) => {
  if (i < 4) p.brandId = 'glow-naturals'
  else if (i < 7) p.brandId = 'rose-orient'
  else if (i < 9) p.brandId = 'k-bloom'
  else if (i < 11) p.brandId = 'pure-essence'
  else p.brandId = 'soleil-doree'
})
