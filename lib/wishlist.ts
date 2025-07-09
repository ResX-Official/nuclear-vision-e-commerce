"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Product } from "./products"

interface WishlistStore {
  items: Product[]
  addItem: (product: Product) => void
  removeItem: (productId: number) => void
  isInWishlist: (productId: number) => boolean
  clearWishlist: () => void
  getTotalItems: () => number
}

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product) => {
        set((state) => {
          const exists = state.items.some((item) => item.id === product.id)
          if (exists) return state

          return {
            items: [...state.items, product],
          }
        })
      },

      removeItem: (productId: number) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }))
      },

      isInWishlist: (productId: number) => {
        return get().items.some((item) => item.id === productId)
      },

      clearWishlist: () => {
        set({ items: [] })
      },

      getTotalItems: () => {
        return get().items.length
      },
    }),
    {
      name: "wishlist-storage",
    },
  ),
)
