import type { MockProduct, MockCategory } from './data'

export type Locale = 'fr' | 'ar'

export function getLocalizedField(
  field: { fr: string; ar: string },
  locale: string
): string {
  return locale === 'ar' ? field.ar : field.fr
}

export function getProductName(product: MockProduct, locale: string): string {
  return getLocalizedField(product.name, locale)
}

export function getProductCategory(product: MockProduct, locale: string): string {
  return getLocalizedField(product.category, locale)
}

export function getProductBadge(product: MockProduct, locale: string): string | null {
  if (!product.badge) return null
  return getLocalizedField(product.badge, locale)
}

export function getCategoryName(category: MockCategory, locale: string): string {
  return getLocalizedField(category.name, locale)
}

export function formatPrice(price: number, locale: string): string {
  return locale === 'ar' ? `${price} د.م` : `${price} DH`
}

export function calculateDiscount(price: number, originalPrice?: number): number | null {
  if (!originalPrice || originalPrice <= price) return null
  return Math.round(((originalPrice - price) / originalPrice) * 100)
}
