import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const j = (arr: any[]) => JSON.stringify(arr)

async function main() {
  console.log('Seeding database...')

  const adminPassword = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@growbeauty.ma' },
    update: {},
    create: { name: 'Admin Grow Beauty', email: 'admin@growbeauty.ma', password: adminPassword, role: 'ADMIN' },
  })

  const userPassword = await bcrypt.hash('user123', 12)
  await prisma.user.upsert({
    where: { email: 'test@growbeauty.ma' },
    update: {},
    create: { name: 'Yasmine Benali', email: 'test@growbeauty.ma', password: userPassword, role: 'USER' },
  })

  // Categories
  const parfums = await prisma.category.upsert({
    where: { slug: 'parfums' }, update: {},
    create: { name: 'Parfums', slug: 'parfums', description: 'Fragrances d\'exception', image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&auto=format&fit=crop&q=80' },
  })
  const soinsPeau = await prisma.category.upsert({
    where: { slug: 'soins-peau' }, update: {},
    create: { name: 'Soins de la Peau', slug: 'soins-peau', description: 'Rituels luxueux pour votre peau', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80' },
  })
  const soinsCheveux = await prisma.category.upsert({
    where: { slug: 'soins-cheveux' }, update: {},
    create: { name: 'Soins des Cheveux', slug: 'soins-cheveux', description: 'Pour une chevelure sublime', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80' },
  })
  const maquillage = await prisma.category.upsert({
    where: { slug: 'maquillage' }, update: {},
    create: { name: 'Maquillage', slug: 'maquillage', description: 'Sublimez votre beauté', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&auto=format&fit=crop&q=80' },
  })
  const accessoires = await prisma.category.upsert({
    where: { slug: 'accessoires-beaute' }, update: {},
    create: { name: 'Accessoires Beauté', slug: 'accessoires-beaute', description: 'Les indispensables beauté', image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&auto=format&fit=crop&q=80' },
  })

  // Sub-categories
  const parfumsFemme = await prisma.category.upsert({ where: { slug: 'parfums-femme' }, update: {}, create: { name: 'Parfums Femme', slug: 'parfums-femme', parentId: parfums.id, image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&auto=format&fit=crop&q=80' } })
  const parfumsHomme = await prisma.category.upsert({ where: { slug: 'parfums-homme' }, update: {}, create: { name: 'Parfums Homme', slug: 'parfums-homme', parentId: parfums.id, image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400&auto=format&fit=crop&q=80' } })
  await prisma.category.upsert({ where: { slug: 'parfums-unisexes' }, update: {}, create: { name: 'Parfums Unisexes', slug: 'parfums-unisexes', parentId: parfums.id, image: 'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=400&auto=format&fit=crop&q=80' } })
  const serums = await prisma.category.upsert({ where: { slug: 'serums' }, update: {}, create: { name: 'Sérums', slug: 'serums', parentId: soinsPeau.id, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&auto=format&fit=crop&q=80' } })
  const hydratants = await prisma.category.upsert({ where: { slug: 'hydratants' }, update: {}, create: { name: 'Hydratants', slug: 'hydratants', parentId: soinsPeau.id, image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&auto=format&fit=crop&q=80' } })
  const nettoyants = await prisma.category.upsert({ where: { slug: 'nettoyants' }, update: {}, create: { name: 'Nettoyants', slug: 'nettoyants', parentId: soinsPeau.id, image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&auto=format&fit=crop&q=80' } })
  const masques = await prisma.category.upsert({ where: { slug: 'masques-visage' }, update: {}, create: { name: 'Masques Visage', slug: 'masques-visage', parentId: soinsPeau.id, image: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=400&auto=format&fit=crop&q=80' } })

  // Products
  const products = [
    // --- SÉRUMS ---
    {
      name: 'Sérum Éclat Rose', slug: 'serum-eclat-rose',
      description: 'Notre sérum signature enrichi en extraits de rose bulgare et en acide hyaluronique triple concentration. Cette formule luxueuse pénètre en profondeur pour hydrater, illuminer et lisser votre peau. Résultat visible dès la première application.',
      shortDesc: 'Sérum illuminateur à la rose bulgare',
      price: 189, comparePrice: 240, stock: 45, sku: 'SER-001',
      images: j(['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1617897903246-719242758050?w=800&auto=format&fit=crop&q=80']),
      categoryId: serums.id, featured: true, isBestSeller: true, isNew: false,
      tags: j(['sérum', 'rose', 'éclat', 'hydratation']),
    },
    {
      name: 'Sérum Vitamine C Éclat', slug: 'serum-vitamine-c-eclat',
      description: 'Un sérum à haute concentration en vitamine C stabilisée (15%) associée à la niacinamide et à la ferulic acid. Combat les taches brunes, unifie le teint et protège des radicaux libres. Texture légère, absorption immédiate.',
      shortDesc: 'Sérum anti-taches à la vitamine C',
      price: 159, comparePrice: 200, stock: 60, sku: 'SER-002',
      images: j(['https://images.unsplash.com/photo-1631390213190-fc40a96b8d7c?w=800&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80']),
      categoryId: serums.id, featured: false, isBestSeller: true, isNew: true,
      tags: j(['sérum', 'vitamine C', 'anti-taches', 'éclat']),
    },
    {
      name: 'Sérum Rétinol Anti-Âge', slug: 'serum-retinol-anti-age',
      description: 'Formule de nuit au rétinol encapsulé 0.3% pour une efficacité maximale sans irritation. Réduit visiblement rides et ridules, affine le grain de peau et stimule le renouvellement cellulaire. Associé à du squalane et peptides.',
      shortDesc: 'Sérum de nuit au rétinol 0.3%',
      price: 210, comparePrice: 270, stock: 30, sku: 'SER-003',
      images: j(['https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1631390213190-fc40a96b8d7c?w=800&auto=format&fit=crop&q=80']),
      categoryId: serums.id, featured: false, isBestSeller: false, isNew: true,
      tags: j(['sérum', 'rétinol', 'anti-âge', 'nuit']),
    },

    // --- HYDRATANTS ---
    {
      name: 'Crème Royale Or 24K', slug: 'creme-royale-or-24k',
      description: 'Une crème d\'exception infusée de particules d\'or 24 carats et de caviar de perle. Cette formule anti-âge d\'élite revitalise, raffermit et donne un éclat incomparable à votre visage. Le nec plus ultra du soin visage luxueux.',
      shortDesc: 'Crème anti-âge à l\'or 24K',
      price: 320, comparePrice: 420, stock: 28, sku: 'CRM-001',
      images: j(['https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&auto=format&fit=crop&q=80']),
      categoryId: hydratants.id, featured: true, isBestSeller: true, isNew: false,
      tags: j(['crème', 'or', 'anti-âge', 'luxe']),
    },
    {
      name: 'Crème Hydratante Acide Hyaluronique', slug: 'creme-hydratante-acide-hyaluronique',
      description: 'Crème légère non-comédogène à l\'acide hyaluronique 3 poids moléculaires pour une hydratation intense en surface et en profondeur. Convient à tous types de peau, même sensible. Apaise, lisse et protège la barrière cutanée.',
      shortDesc: 'Hydratation intense toutes peaux',
      price: 98, comparePrice: 125, stock: 120, sku: 'CRM-002',
      images: j(['https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80']),
      categoryId: hydratants.id, featured: false, isBestSeller: true, isNew: false,
      tags: j(['crème', 'acide hyaluronique', 'hydratation', 'toutes peaux']),
    },
    {
      name: 'Crème de Nuit Régénérante', slug: 'creme-nuit-regenerante',
      description: 'Soin intensif de nuit formulé avec du bakuchiol (rétinol naturel), du beurre de karité et des peptides de soie. Travaille pendant votre sommeil pour régénérer, nourrir et lisser votre peau. Teint reposé et lumineux au réveil.',
      shortDesc: 'Soin régénérant de nuit au bakuchiol',
      price: 145, comparePrice: 185, stock: 55, sku: 'CRM-003',
      images: j(['https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?w=800&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&auto=format&fit=crop&q=80']),
      categoryId: hydratants.id, featured: false, isBestSeller: false, isNew: true,
      tags: j(['crème', 'nuit', 'régénérant', 'bakuchiol']),
    },

    // --- NETTOYANTS ---
    {
      name: 'Gel Nettoyant Moussant Doux', slug: 'gel-nettoyant-moussant-doux',
      description: 'Nettoyant facial en gel qui se transforme en mousse douce et crémeuse. Élimine maquillage, impuretés et excès de sébum sans dessécher ni irriter. Formulé avec de l\'aloe vera, de la niacinamide et sans sulfates agressifs. pH équilibré.',
      shortDesc: 'Nettoyant gel-mousse sans sulfates',
      price: 75, comparePrice: 95, stock: 150, sku: 'NET-001',
      images: j(['https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=800&auto=format&fit=crop&q=80']),
      categoryId: nettoyants.id, featured: false, isBestSeller: true, isNew: false,
      tags: j(['nettoyant', 'gel', 'doux', 'sans sulfates']),
    },
    {
      name: 'Huile Démaquillante Camélia', slug: 'huile-demaquillante-camelia',
      description: 'Huile légère à base d\'huile de camélia et jojoba qui dissout instantanément maquillage waterproof, crème solaire et impuretés. La méthode "oil cleansing" pour une peau propre et nourrie. Formule sans résidus, rinçage facile.',
      shortDesc: 'Huile démaquillante à l\'huile de camélia',
      price: 89, comparePrice: 110, stock: 80, sku: 'NET-002',
      images: j(['https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=800&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&auto=format&fit=crop&q=80']),
      categoryId: nettoyants.id, featured: false, isBestSeller: false, isNew: true,
      tags: j(['nettoyant', 'huile', 'démaquillant', 'camélia']),
    },

    // --- MASQUES ---
    {
      name: 'Masque Purifiant Argile Blanche', slug: 'masque-purifiant-argile-blanche',
      description: 'Ce masque détoxifiant alliant argile blanche kaolin et charbon végétal élimine impuretés et excès de sébum en profondeur. Enrichi en aloe vera et eau de rose pour respecter la barrière cutanée. Peau nette, lisse et rayonnante en 10 minutes.',
      shortDesc: 'Masque détox à l\'argile blanche',
      price: 78, comparePrice: null, stock: 90, sku: 'MSK-001',
      images: j(['https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=800&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?w=800&auto=format&fit=crop&q=80']),
      categoryId: masques.id, featured: false, isBestSeller: false, isNew: true,
      tags: j(['masque', 'argile', 'purifiant', 'détox']),
    },
    {
      name: 'Masque Hydratant au Miel & Propolis', slug: 'masque-hydratant-miel-propolis',
      description: 'Masque hydratant et apaisant à base de miel de manuka (MGO 250+) et de propolis. Répare la barrière cutanée, calme les rougeurs et procure une hydratation intense de longue durée. Idéal pour les peaux sensibles et déshydratées.',
      shortDesc: 'Masque apaisant au miel de manuka',
      price: 95, comparePrice: 120, stock: 65, sku: 'MSK-002',
      images: j(['https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?w=800&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=800&auto=format&fit=crop&q=80']),
      categoryId: masques.id, featured: false, isBestSeller: true, isNew: false,
      tags: j(['masque', 'miel', 'hydratant', 'apaisant']),
    },

    // --- PARFUMS FEMME ---
    {
      name: 'Eau de Parfum "Rose Éternelle"', slug: 'eau-de-parfum-rose-eternelle',
      description: 'Une fragrance florale envoûtante qui capture l\'essence de la rose de mai. Notes de tête : bergamote et litchi. Notes de cœur : rose de mai, pivoine, jasmin. Notes de fond : musc blanc, bois de santal, ambre. Un parfum qui dure toute la journée.',
      shortDesc: 'Fragrance florale à la rose de mai',
      price: 245, comparePrice: 295, stock: 60, sku: 'PAR-001',
      images: j(['https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&auto=format&fit=crop&q=80']),
      categoryId: parfumsFemme.id, featured: true, isBestSeller: true, isNew: false,
      tags: j(['parfum', 'rose', 'floral', 'femme']),
    },
    {
      name: 'Eau de Parfum "Jasmin Précieux"', slug: 'eau-de-parfum-jasmin-precieux',
      description: 'Une ode au jasmin de Grasse dans sa forme la plus pure. Ce parfum captive par ses notes florales chaleureuses et sensuelles. Notes de tête : poivre rose, mandarine. Notes de cœur : jasmin absolu, tubéreuse. Notes de fond : vanille, cèdre.',
      shortDesc: 'Parfum floral au jasmin de Grasse',
      price: 285, comparePrice: 350, stock: 40, sku: 'PAR-003',
      images: j(['https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&auto=format&fit=crop&q=80']),
      categoryId: parfumsFemme.id, featured: false, isBestSeller: false, isNew: true,
      tags: j(['parfum', 'jasmin', 'floral', 'femme']),
    },

    // --- PARFUMS HOMME ---
    {
      name: 'Eau de Parfum "Bois Noir"', slug: 'eau-de-parfum-bois-noir',
      description: 'Un parfum masculin intense aux accents boisés et épicés. Notes de tête : poivre noir, gingembre. Notes de cœur : cèdre de l\'Atlas, vétiver. Notes de fond : oud fumé, ambre gris, musc. Sillage puissant, tenue exceptionnelle 12h.',
      shortDesc: 'Parfum boisé & épicé pour homme',
      price: 265, comparePrice: 320, stock: 45, sku: 'PAR-004',
      images: j(['https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=800&auto=format&fit=crop&q=80']),
      categoryId: parfumsHomme.id, featured: false, isBestSeller: true, isNew: false,
      tags: j(['parfum', 'boisé', 'homme', 'épicé']),
    },

    // --- PARFUMS (OUD) ---
    {
      name: 'Eau de Parfum "Oud Mystère"', slug: 'eau-de-parfum-oud-mystere',
      description: 'Un parfum oriental envoûtant qui marie l\'oud précieux aux épices chaudes. Notes de tête : cardamome, safran. Notes de cœur : rose, oud, patchouli. Notes de fond : ambre, encens, musc. Une fragrance unisexe d\'exception pour les amateurs de parfums intenses.',
      shortDesc: 'Parfum oriental à l\'oud',
      price: 380, comparePrice: 450, stock: 35, sku: 'PAR-002',
      images: j(['https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=800&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&auto=format&fit=crop&q=80']),
      categoryId: parfums.id, featured: true, isBestSeller: false, isNew: true,
      tags: j(['parfum', 'oud', 'oriental', 'unisexe']),
    },

    // --- SOINS CHEVEUX ---
    {
      name: 'Huile Précieuse Camélia', slug: 'huile-precieuse-camelia',
      description: 'L\'huile de camélia pure, extraite à froid, nourrit intensément les cheveux secs et abîmés. Sa formule légère s\'absorbe instantanément sans alourdir, laissant vos cheveux brillants, soyeux et protégés de la chaleur.',
      shortDesc: 'Huile capillaire au camélia',
      price: 98, comparePrice: 125, stock: 75, sku: 'HUI-001',
      images: j(['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=800&auto=format&fit=crop&q=80']),
      categoryId: soinsCheveux.id, featured: false, isBestSeller: true, isNew: true,
      tags: j(['huile', 'camélia', 'cheveux', 'brillance']),
    },
    {
      name: 'Masque Capillaire Kératine', slug: 'masque-capillaire-keratine',
      description: 'Masque restructurant intensif à la kératine hydrolysée et aux protéines de soie. Répare les cheveux abîmés par la chaleur ou la coloration, lisse les écailles et apporte une brillance miroir. Résultat visible après une seule application.',
      shortDesc: 'Masque restructurant à la kératine',
      price: 115, comparePrice: 145, stock: 55, sku: 'MSK-CAP-001',
      images: j(['https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=800&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80']),
      categoryId: soinsCheveux.id, featured: false, isBestSeller: false, isNew: false,
      tags: j(['masque', 'kératine', 'cheveux', 'réparateur']),
    },
    {
      name: 'Shampooing Éclat Argan', slug: 'shampooing-eclat-argan',
      description: 'Shampooing sans sulfates enrichi en huile d\'argan du Maroc et en kératine végétale. Nettoie en douceur, apporte brillance et douceur, démêle facilement. Préserve la couleur des cheveux colorés. Formule végan et sans silicones.',
      shortDesc: 'Shampooing sans sulfates à l\'argan',
      price: 68, comparePrice: 85, stock: 100, sku: 'SHA-001',
      images: j(['https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80']),
      categoryId: soinsCheveux.id, featured: false, isBestSeller: true, isNew: false,
      tags: j(['shampooing', 'argan', 'sans sulfates', 'brillance']),
    },

    // --- MAQUILLAGE ---
    {
      name: 'Rouge à Lèvres Velours "Grenat"', slug: 'rouge-levres-velours-grenat',
      description: 'Un rouge à lèvres longue tenue à la texture velours mat ultra-confortable. Sa formule enrichie en huile de rose et en vitamine E hydrate et protège vos lèvres tout en sublimant votre sourire d\'un rouge profond et sensuel.',
      shortDesc: 'Rouge à lèvres mat longue tenue',
      price: 65, comparePrice: 85, stock: 120, sku: 'MAK-001',
      images: j(['https://images.unsplash.com/photo-1586495777744-4e6b8f4b9f4b?w=800&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&auto=format&fit=crop&q=80']),
      categoryId: maquillage.id, featured: false, isBestSeller: true, isNew: false,
      tags: j(['rouge à lèvres', 'mat', 'longue tenue', 'grenat']),
    },
    {
      name: 'Fond de Teint Lumière Naturelle', slug: 'fond-de-teint-lumiere-naturelle',
      description: 'Un fond de teint fluide à couverture modulable qui laisse un fini naturel et lumineux. Sa formule légère et breathable s\'adapte à tous les types de peau. Enrichi en SPF 30 et en perles d\'huile d\'argan pour une tenue 24h parfaite.',
      shortDesc: 'Fond de teint fluide SPF 30',
      price: 95, comparePrice: 120, stock: 85, sku: 'MAK-002',
      images: j(['https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&auto=format&fit=crop&q=80']),
      categoryId: maquillage.id, featured: false, isBestSeller: false, isNew: true,
      tags: j(['fond de teint', 'SPF', 'naturel', 'longue tenue']),
    },
    {
      name: 'Palette Ombres à Paupières "Sahara"', slug: 'palette-ombres-sahara',
      description: 'Une palette de 12 ombres inspirées des tons chauds du Sahara : de l\'ivoire au bronze doré en passant par le terracotta et le brun profond. Formule ultra-pigmentée, longue tenue 16h. Mixe finitions mates, satinées et métalliques.',
      shortDesc: 'Palette 12 ombres tons chauds',
      price: 145, comparePrice: 180, stock: 70, sku: 'MAK-003',
      images: j(['https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&auto=format&fit=crop&q=80']),
      categoryId: maquillage.id, featured: true, isBestSeller: true, isNew: false,
      tags: j(['palette', 'ombres', 'yeux', 'sahara']),
    },
    {
      name: 'Mascara Volume Extrême', slug: 'mascara-volume-extreme',
      description: 'Mascara gainant et volumisant avec brosse en forme de sablier. La formule enrichie en kératine et en cire de candelilla allonge, courbe et gaine chaque cil pour un regard intense. Résistant à l\'eau et aux transferts. Formule nourrissante.',
      shortDesc: 'Mascara waterproof volumisant',
      price: 58, comparePrice: 75, stock: 95, sku: 'MAK-004',
      images: j(['https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1586495777744-4e6b8f4b9f4b?w=800&auto=format&fit=crop&q=80']),
      categoryId: maquillage.id, featured: false, isBestSeller: true, isNew: false,
      tags: j(['mascara', 'volume', 'waterproof', 'cils']),
    },

    // --- ACCESSOIRES ---
    {
      name: 'Set de Pinceaux Maquillage Pro', slug: 'set-pinceaux-maquillage-pro',
      description: 'Set professionnel de 12 pinceaux avec poils synthétiques ultra-doux de qualité professionnelle. Comprend : 2 pinceaux fond de teint, 3 pinceaux yeux, 1 pinceau contouring, 1 pinceau blush, 1 pinceau enlumineur et 4 pinceaux de précision. Manche en bambou recyclé.',
      shortDesc: 'Set 12 pinceaux professionnels en bambou',
      price: 185, comparePrice: 240, stock: 40, sku: 'ACC-001',
      images: j(['https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&auto=format&fit=crop&q=80']),
      categoryId: accessoires.id, featured: false, isBestSeller: true, isNew: false,
      tags: j(['pinceaux', 'maquillage', 'professionnel', 'bambou']),
    },
    {
      name: 'Rouleau de Jade Visage', slug: 'rouleau-jade-visage',
      description: 'Rouleau massant en jade véritable pour drainer, tonifier et dégonfler le visage. Ce rituel ancestral stimule la microcirculation, réduit les poches sous les yeux et améliore l\'absorption de vos soins. À utiliser le matin sur peau propre ou après l\'application de votre sérum.',
      shortDesc: 'Rouleau de jade anti-gonflement',
      price: 75, comparePrice: 95, stock: 60, sku: 'ACC-002',
      images: j(['https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&auto=format&fit=crop&q=80']),
      categoryId: accessoires.id, featured: false, isBestSeller: false, isNew: true,
      tags: j(['jade', 'rouleau', 'massage', 'visage']),
    },
  ]

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product as any,
    })
  }

  console.log('✅ Seeding terminé!')
  console.log(`👤 Admin: admin@growbeauty.ma / admin123`)
  console.log(`👤 User:  test@growbeauty.ma / user123`)
  console.log(`📦 ${products.length} produits créés`)
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
