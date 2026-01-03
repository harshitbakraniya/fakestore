import type { RootState } from "@/app/store"
import type { Product } from "../products/products.types"
import {
  selectFilteredProducts,
  selectPaginatedProducts,
  selectTotalPages,
} from "../products/products.selectors"

// Reuse the same filtering and pagination logic from products
export const selectFilteredFavorites = (
  favorites: Product[],
  state: RootState
) => {
  return selectFilteredProducts(favorites, state)
}

export const selectPaginatedFavorites = (
  favorites: Product[],
  state: RootState
) => {
  return selectPaginatedProducts(favorites, state)
}

export const selectFavoritesTotalPages = (
  favorites: Product[],
  state: RootState
) => {
  return selectTotalPages(favorites, state)
}

