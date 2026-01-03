// @ts-nocheck - Test utilities file, complex RTK Query types 
/* eslint-disable react-refresh/only-export-components */
import React, { type ReactElement } from "react"
import { render, type RenderOptions } from "@testing-library/react"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { baseApi } from "@/api/baseApi"
import filtersReducer from "@/features/filters/filters.slice"
import favoritesReducer from "@/features/favorites/favorites.slice"
import type { RootState } from "@/app/store"

// Create a test store
const createTestStore = (preloadedState: Partial<RootState> = {}) => {
  return configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
      filters: filtersReducer,
      favorites: favoritesReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(baseApi.middleware),
    preloadedState: preloadedState as Partial<RootState>,
  })
}

interface AllTheProvidersProps {
  children: React.ReactNode
  preloadedState?: Partial<RootState>
}

const AllTheProviders = ({
  children,
  preloadedState,
}: AllTheProvidersProps) => {
  const store = createTestStore(preloadedState)
  return <Provider store={store}>{children}</Provider>
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper"> & { preloadedState?: Partial<RootState> }
) => {
  const { preloadedState, ...renderOptions } = options || {}
  return render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders preloadedState={preloadedState}>
        {children}
      </AllTheProviders>
    ),
    ...renderOptions,
  })
}

// Export testing utilities separately to avoid fast refresh warning
export { customRender as render, createTestStore }
export { screen, waitFor, within, fireEvent } from "@testing-library/react"

