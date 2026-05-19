export interface Product {
  id: string
  name: string
  slug: string
  description: string
  shortDesc?: string | null
  price: number
  comparePrice?: number | null
  stock: number
  sku?: string | null
  images: string[]
  categoryId: string
  category?: Category
  tags: string[]
  featured: boolean
  isNew: boolean
  isBestSeller: boolean
  isActive: boolean
  weight?: number | null
  variants?: ProductVariant[]
  reviews?: Review[]
  createdAt: Date
  updatedAt: Date
  _count?: {
    reviews?: number
    wishlist?: number
  }
}

export interface ProductVariant {
  id: string
  productId: string
  name: string
  value: string
  stock: number
  price?: number | null
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string | null
  image?: string | null
  parentId?: string | null
  parent?: Category | null
  children?: Category[]
  _count?: {
    products?: number
  }
}

export interface CartItem {
  id: string
  productId: string
  product: Product
  quantity: number
  variant?: string | null
}

export interface WishlistItem {
  id: string
  productId: string
  product: Product
}

export interface Order {
  id: string
  orderNumber: string
  userId: string
  user?: User
  status: OrderStatus
  items: OrderItem[]
  subtotal: number
  shippingCost: number
  total: number
  shippingAddress: ShippingAddress
  notes?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  product?: Product
  name: string
  image?: string | null
  price: number
  quantity: number
  variant?: string | null
}

export interface ShippingAddress {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
  country: string
}

export interface Review {
  id: string
  userId: string
  user?: User
  productId: string
  rating: number
  title?: string | null
  comment: string
  isVerified: boolean
  createdAt: Date
}

export interface User {
  id: string
  name?: string | null
  email: string
  image?: string | null
  role: 'USER' | 'ADMIN'
  phone?: string | null
  createdAt: Date
  _count?: {
    orders?: number
  }
}

export interface Address {
  id: string
  userId: string
  firstName: string
  lastName: string
  address: string
  city: string
  postalCode: string
  country: string
  phone: string
  isDefault: boolean
}

export type OrderStatus =
  | 'EN_ATTENTE'
  | 'CONFIRMEE'
  | 'EN_PREPARATION'
  | 'EXPEDIEE'
  | 'LIVREE'
  | 'ANNULEE'

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  EN_ATTENTE: 'En attente',
  CONFIRMEE: 'Confirmée',
  EN_PREPARATION: 'En préparation',
  EXPEDIEE: 'Expédiée',
  LIVREE: 'Livrée',
  ANNULEE: 'Annulée',
}

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  EN_ATTENTE: 'bg-yellow-100 text-yellow-800',
  CONFIRMEE: 'bg-blue-100 text-blue-800',
  EN_PREPARATION: 'bg-purple-100 text-purple-800',
  EXPEDIEE: 'bg-indigo-100 text-indigo-800',
  LIVREE: 'bg-green-100 text-green-800',
  ANNULEE: 'bg-red-100 text-red-800',
}
