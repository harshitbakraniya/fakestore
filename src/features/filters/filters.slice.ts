import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export type SortOption = "price-low-high" | "price-high-low" | "top-rated" | ""

interface FiltersState {
  search: string
  category: string
  sort: SortOption
  currentPage: number
  itemsPerPage: number
}

const initialState: FiltersState = {
  search: "",
  category: "",
  sort: "",
  currentPage: 1,
  itemsPerPage: 12,
}

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearch: (s, a: PayloadAction<string>) => {
      s.search = a.payload
      s.currentPage = 1 
    },
    setCategory: (s, a: PayloadAction<string>) => {
      s.category = a.payload
      s.currentPage = 1
    },
    setSort: (s, a: PayloadAction<SortOption>) => {
      s.sort = a.payload
      s.currentPage = 1
    },
    setCurrentPage: (s, a: PayloadAction<number>) => {
      s.currentPage = a.payload
    },
    setItemsPerPage: (s, a: PayloadAction<number>) => {
      s.itemsPerPage = a.payload
      s.currentPage = 1
    },
    clearFilters: (s) => {
      s.search = ""
      s.category = ""
      s.sort = ""
      s.currentPage = 1
      s.itemsPerPage = 12
    },
  },
})

export const {
  setSearch,
  setCategory,
  setSort,
  setCurrentPage,
  setItemsPerPage,
  clearFilters,
} = filtersSlice.actions
export default filtersSlice.reducer
