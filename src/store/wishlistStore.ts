'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface WishlistProduct {
  id: string
  name: string
  slug: string
  price: number
  comparePrice?: number | null
  image: string
}

interface WishlistStore {
  items: WishlistProduct[]
  addItem: (product: WishlistProduct) => void
  removeItem: (productId: string) => void
  toggleItem: (product: WishlistProduct) => void
  isWishlisted: (productId: string) => boolean
  clearWishlist: () => void
  count: () => number
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        set((state) => {
          if (state.items.some((item) => item.id === product.id)) return state
          return { items: [...state.items, product] }
        })
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }))
      },

      toggleItem: (product) => {
        const { isWishlisted, addItem, removeItem } = get()
        if (isWishlisted(product.id)) {
          removeItem(product.id)
        } else {
          addItem(product)
        }
      },

      isWishlisted: (productId) => {
        return get().items.some((item) => item.id === productId)
      },

      clearWishlist: () => set({ items: [] }),

      count: () => get().items.length,
    }),
    {
      name: 'grow-beauty-wishlist',
      skipHydration: true,
    }
  )
)
