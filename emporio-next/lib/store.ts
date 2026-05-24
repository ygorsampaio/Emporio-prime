'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, Product } from '@/types'

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem:    (product: Product) => void
  removeItem: (id: number) => void
  updateQty:  (id: number, qty: number) => void
  clear:      () => void
  setOpen:    (open: boolean) => void
}

// persist salva o carrinho no localStorage automaticamente
export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items:  [],
      isOpen: false,

      addItem: (product) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === product.id)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            }
          }
          return { items: [...state.items, { ...product, quantity: 1 }] }
        }),

      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

      updateQty: (id, qty) =>
        set((state) => ({
          items:
            qty < 1
              ? state.items.filter((i) => i.id !== id)
              : state.items.map((i) => (i.id === id ? { ...i, quantity: qty } : i)),
        })),

      clear:   () => set({ items: [] }),
      setOpen: (open) => set({ isOpen: open }),
    }),
    { name: 'emporio-cart' }
  )
)

// Seletores derivados (evita recalcular no componente)
export const cartTotal    = (items: CartItem[]) =>
  items.reduce((sum, i) => sum + i.price * i.quantity, 0)
export const cartQuantity = (items: CartItem[]) =>
  items.reduce((sum, i) => sum + i.quantity, 0)
