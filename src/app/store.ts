import { configureStore } from "@reduxjs/toolkit"
import { baseApi } from "@/api/baseApi"
import filters from "@/features/filters/filters.slice"
import favorites from "@/features/favorites/favorites.slice"

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    filters,
    favorites,
  },
  middleware: (gDM) =>
    gDM().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
