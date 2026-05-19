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
