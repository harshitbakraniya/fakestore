import { describe, it, expect } from "vitest"
import {
  selectFilteredProducts,
  selectPaginatedProducts,
  selectTotalPages,
} from "@/features/products/products.selectors"
import type { RootState } from "@/app/store"
import { mockProducts } from "@/test/mockData"

const createMockState = (filters: Partial<RootState["filters"]>): RootState => {
  return {
    filters: {
      search: "",
      category: "",
      sort: "",
      currentPage: 1,
      itemsPerPage: 12,
      ...filters,
    },
    favorites: [],
    api: {
      queries: {},
      mutations: {},
      provided: {
        tags: {},
        keys: {},
      },
      subscriptions: {},
      config: {
        reducerPath: "api",
        invalidationBehavior: "delayed",
        refetchOnMountOrArgChange: false,
        refetchOnFocus: false,
        refetchOnReconnect: false,
        keepUnusedDataFor: 60,
        online: true,
        focused: true,
        middlewareRegistered: true,
      },
    },
  } as unknown as RootState
}

describe("products selectors", () => {
  describe("selectFilteredProducts", () => {
    it("should return all products when no filters are applied", () => {
      const state = createMockState({})
      const result = selectFilteredProducts(mockProducts, state)
      expect(result).toHaveLength(mockProducts.length)
      expect(result).toEqual(mockProducts)
    })

    it("should filter products by search term", () => {
      const state = createMockState({ search: "Samsung" })
      const result = selectFilteredProducts(mockProducts, state)
      expect(result).toHaveLength(1)
      expect(result[0].title).toContain("Samsung")
    })

    it("should filter products by category", () => {
      const state = createMockState({ category: "electronics" })
      const result = selectFilteredProducts(mockProducts, state)
      expect(result.every((p) => p.category === "electronics")).toBe(true)
    })

    it("should sort products by price low to high", () => {
      const state = createMockState({ sort: "price-low-high" })
      const result = selectFilteredProducts(mockProducts, state)
      expect(result[0].price).toBeLessThanOrEqual(result[1].price)
      expect(result[1].price).toBeLessThanOrEqual(result[2].price)
    })

    it("should sort products by price high to low", () => {
      const state = createMockState({ sort: "price-high-low" })
      const result = selectFilteredProducts(mockProducts, state)
      expect(result[0].price).toBeGreaterThanOrEqual(result[1].price)
      expect(result[1].price).toBeGreaterThanOrEqual(result[2].price)
    })

    it("should sort products by top rated", () => {
      const state = createMockState({ sort: "top-rated" })
      const result = selectFilteredProducts(mockProducts, state)
      expect(result[0].rating.rate).toBeGreaterThanOrEqual(result[1].rating.rate)
      expect(result[1].rating.rate).toBeGreaterThanOrEqual(result[2].rating.rate)
    })

    it("should apply multiple filters together", () => {
      const state = createMockState({
        search: "Samsung",
        category: "electronics",
        sort: "price-high-low",
      })
      const result = selectFilteredProducts(mockProducts, state)
      expect(result).toHaveLength(1)
      expect(result[0].title).toContain("Samsung")
      expect(result[0].category).toBe("electronics")
    })
  })

  describe("selectPaginatedProducts", () => {
    it("should return first page of products", () => {
      const state = createMockState({ currentPage: 1, itemsPerPage: 2 })
      const result = selectPaginatedProducts(mockProducts, state)
      expect(result).toHaveLength(2)
      expect(result[0]).toEqual(mockProducts[0])
      expect(result[1]).toEqual(mockProducts[1])
    })

    it("should return second page of products", () => {
      const state = createMockState({ currentPage: 2, itemsPerPage: 2 })
      const result = selectPaginatedProducts(mockProducts, state)
      expect(result).toHaveLength(2)
      expect(result[0]).toEqual(mockProducts[2])
      expect(result[1]).toEqual(mockProducts[3])
    })

    it("should return empty array if page is out of bounds", () => {
      const state = createMockState({ currentPage: 10, itemsPerPage: 2 })
      const result = selectPaginatedProducts(mockProducts, state)
      expect(result).toHaveLength(0)
    })
  })

  describe("selectTotalPages", () => {
    it("should calculate total pages correctly", () => {
      const state = createMockState({ itemsPerPage: 2 })
      const result = selectTotalPages(mockProducts, state)
      expect(result).toBe(3) // 5 products / 2 per page = 3 pages
    })

    it("should return 1 page if products fit in one page", () => {
      const state = createMockState({ itemsPerPage: 10 })
      const result = selectTotalPages(mockProducts, state)
      expect(result).toBe(1)
    })

    it("should handle empty products array", () => {
      const state = createMockState({ itemsPerPage: 12 })
      const result = selectTotalPages([], state)
      expect(result).toBe(0)
    })
  })
})

