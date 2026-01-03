import { createSlice } from "@reduxjs/toolkit"
import type {PayloadAction} from "@reduxjs/toolkit";
import  type { Product } from "../products/products.types";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: [] as Product[],
  reducers: {
    addFavorite: (state, action: PayloadAction<Product>) => {
      if (!state.find(p => p.id === action.payload.id)) {
        state.push(action.payload)
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) =>
      state.filter(p => p.id !== action.payload),
  },
})

export const { addFavorite, removeFavorite } = favoritesSlice.actions
export default favoritesSlice.reducer
