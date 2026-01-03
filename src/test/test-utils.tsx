import React, { ReactElement } from "react"
import { render, RenderOptions } from "@testing-library/react"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { baseApi } from "@/api/baseApi"
import filtersReducer from "@/features/filters/filters.slice"
import favoritesReducer from "@/features/favorites/favorites.slice"

// Create a test store
const createTestStore = (preloadedState = {}) => {
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
    preloadedState,
  })
}

interface AllTheProvidersProps {
  children: React.ReactNode
  preloadedState?: any
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
  options?: Omit<RenderOptions, "wrapper"> & { preloadedState?: any }
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

export * from "@testing-library/react"
export { customRender as render, createTestStore }

