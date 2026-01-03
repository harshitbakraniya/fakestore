import { describe, it, expect } from "vitest"
import filtersReducer, {
  setSearch,
  setCategory,
  setSort,
  setCurrentPage,
  setItemsPerPage,
  clearFilters,
  type SortOption,
} from "@/features/filters/filters.slice"

describe("filtersSlice", () => {
  const initialState = {
    search: "",
    category: "",
    sort: "" as SortOption,
    currentPage: 1,
    itemsPerPage: 12,
  }

  it("should return the initial state", () => {
    expect(filtersReducer(undefined, { type: "unknown" })).toEqual(initialState)
  })

  describe("setSearch", () => {
    it("should update search term", () => {
      const action = setSearch("laptop")
      const result = filtersReducer(initialState, action)
      expect(result.search).toBe("laptop")
    })

    it("should reset currentPage to 1 when search changes", () => {
      const stateWithPage = { ...initialState, currentPage: 3 }
      const action = setSearch("test")
      const result = filtersReducer(stateWithPage, action)
      expect(result.currentPage).toBe(1)
    })
  })

  describe("setCategory", () => {
    it("should update category", () => {
      const action = setCategory("electronics")
      const result = filtersReducer(initialState, action)
      expect(result.category).toBe("electronics")
    })

    it("should reset currentPage to 1 when category changes", () => {
      const stateWithPage = { ...initialState, currentPage: 5 }
      const action = setCategory("men's clothing")
      const result = filtersReducer(stateWithPage, action)
      expect(result.currentPage).toBe(1)
    })
  })

  describe("setSort", () => {
    it("should update sort option to price-low-high", () => {
      const action = setSort("price-low-high")
      const result = filtersReducer(initialState, action)
      expect(result.sort).toBe("price-low-high")
    })

    it("should update sort option to price-high-low", () => {
      const action = setSort("price-high-low")
      const result = filtersReducer(initialState, action)
      expect(result.sort).toBe("price-high-low")
    })

    it("should update sort option to top-rated", () => {
      const action = setSort("top-rated")
      const result = filtersReducer(initialState, action)
      expect(result.sort).toBe("top-rated")
    })

    it("should reset currentPage to 1 when sort changes", () => {
      const stateWithPage = { ...initialState, currentPage: 2 }
      const action = setSort("top-rated")
      const result = filtersReducer(stateWithPage, action)
      expect(result.currentPage).toBe(1)
    })
  })

  describe("setCurrentPage", () => {
    it("should update current page", () => {
      const action = setCurrentPage(3)
      const result = filtersReducer(initialState, action)
      expect(result.currentPage).toBe(3)
    })
  })

  describe("setItemsPerPage", () => {
    it("should update items per page", () => {
      const action = setItemsPerPage(24)
      const result = filtersReducer(initialState, action)
      expect(result.itemsPerPage).toBe(24)
    })

    it("should reset currentPage to 1 when itemsPerPage changes", () => {
      const stateWithPage = { ...initialState, currentPage: 4 }
      const action = setItemsPerPage(24)
      const result = filtersReducer(stateWithPage, action)
      expect(result.currentPage).toBe(1)
    })
  })

  describe("clearFilters", () => {
    it("should reset all filters to initial state", () => {
      const stateWithFilters = {
        search: "test",
        category: "electronics",
        sort: "price-low-high" as SortOption,
        currentPage: 3,
        itemsPerPage: 24,
      }
      const action = clearFilters()
      const result = filtersReducer(stateWithFilters, action)
      expect(result).toEqual(initialState)
    })
  })
})

