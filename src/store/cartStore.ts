'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartProduct {
  id: string
  name: string
  slug: string
  price: number
  image: string
  stock: number
}

export interface CartItemStore {
  id: string
  product: CartProduct
  quantity: number
  variant?: string
}

interface CartStore {
  items: CartItemStore[]
  isOpen: boolean
  addItem: (product: CartProduct, quantity?: number, variant?: string) => void
  removeItem: (productId: string, variant?: string) => void
  updateQuantity: (productId: string, quantity: number, variant?: string) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  getTotal: () => number
  getItemCount: () => number
  getSubtotal: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, quantity = 1, variant) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id && item.variant === variant
          )
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id && item.variant === variant
                  ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) }
                  : item
              ),
              isOpen: true,
            }
          }
          return {
            items: [
              ...state.items,
              {
                id: `${product.id}-${variant || 'default'}-${Date.now()}`,
                product,
                quantity: Math.min(quantity, product.stock),
                variant,
              },
            ],
            isOpen: true,
          }
        })
      },

      removeItem: (productId, variant) => {
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.product.id === productId && item.variant === variant)
          ),
        }))
      },

      updateQuantity: (productId, quantity, variant) => {
        if (quantity < 1) {
          get().removeItem(productId, variant)
          return
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId && item.variant === variant
              ? { ...item, quantity: Math.min(quantity, item.product.stock) }
              : item
          ),
        }))
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        )
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0)
      },

      getSubtotal: () => get().getTotal(),
    }),
    {
      name: 'grow-beauty-cart',
      skipHydration: true,
    }
  )
)
