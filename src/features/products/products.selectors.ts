import type { RootState } from "@/app/store"
import type { Product } from "./products.types"

export const selectFilteredProducts = (
  products: Product[],
  state: RootState
) => {
  let result = [...products]
  const { search, category, sort } = state.filters

  // Apply search filter
  if (search) {
    result = result.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    )
  }

  // Apply category filter
  if (category) {
    result = result.filter((p) => p.category === category)
  }

  // Apply sort
  if (sort) {
    switch (sort) {
      case "price-low-high":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high-low":
        result.sort((a, b) => b.price - a.price)
        break
      case "top-rated":
        result.sort((a, b) => b.rating.rate - a.rating.rate)
        break
      default:
        break
    }
  }

  return result
}

export const selectPaginatedProducts = (
  products: Product[],
  state: RootState
) => {
  const { currentPage, itemsPerPage } = state.filters
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  return products.slice(startIndex, endIndex)
}

export const selectTotalPages = (products: Product[], state: RootState) => {
  const { itemsPerPage } = state.filters
  return Math.ceil(products.length / itemsPerPage)
}
