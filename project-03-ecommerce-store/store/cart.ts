'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '@/lib/products'

export type CartItem = {
  product: Product
  quantity: number
  selectedColor: string
  selectedSize?: string
}

type CartStore = {
  items: CartItem[]
  addItem: (product: Product, color: string, size?: string) => void
  removeItem: (productId: number, color: string, size?: string) => void
  updateQuantity: (productId: number, color: string, size: string | undefined, qty: number) => void
  clearCart: () => void
  itemCount: () => number
  subtotal: () => number
}

function itemKey(productId: number, color: string, size?: string) {
  return `${productId}-${color}-${size ?? ''}`
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, color, size) => {
        set((state) => {
          const key = itemKey(product.id, color, size)
          const existing = state.items.find(
            (i) => itemKey(i.product.id, i.selectedColor, i.selectedSize) === key
          )
          if (existing) {
            return {
              items: state.items.map((i) =>
                itemKey(i.product.id, i.selectedColor, i.selectedSize) === key
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            }
          }
          return {
            items: [...state.items, { product, quantity: 1, selectedColor: color, selectedSize: size }],
          }
        })
      },

      removeItem: (productId, color, size) => {
        set((state) => ({
          items: state.items.filter(
            (i) => itemKey(i.product.id, i.selectedColor, i.selectedSize) !== itemKey(productId, color, size)
          ),
        }))
      },

      updateQuantity: (productId, color, size, qty) => {
        if (qty < 1) {
          get().removeItem(productId, color, size)
          return
        }
        set((state) => ({
          items: state.items.map((i) =>
            itemKey(i.product.id, i.selectedColor, i.selectedSize) === itemKey(productId, color, size)
              ? { ...i, quantity: qty }
              : i
          ),
        }))
      },

      clearCart: () => set({ items: [] }),

      itemCount: () => get().items.reduce((acc, i) => acc + i.quantity, 0),

      subtotal: () =>
        get().items.reduce((acc, i) => acc + i.product.price * i.quantity, 0),
    }),
    { name: 'cart-store' }
  )
)
