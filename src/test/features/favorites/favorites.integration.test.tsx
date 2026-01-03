import React from "react"
import { describe, it, expect, beforeEach } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Provider } from "react-redux"
import { createTestStore } from "@/test/test-utils"
import ProductCard from "@/components/ProductCard"
import { mockProducts } from "@/test/mockData"
import { addFavorite } from "@/features/favorites/favorites.slice"
import { MemoryRouter } from "react-router-dom"
import type { Product } from "@/features/products/products.types"

const renderWithRouter = (ui: React.ReactElement, store: ReturnType<typeof createTestStore>) => {
  return render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>
  )
}

describe("Favorites Integration", () => {
  let store: ReturnType<typeof createTestStore>

  beforeEach(() => {
    store = createTestStore({
      favorites: [],
    })
  })

  it("should add product to favorites", async () => {
    const user = userEvent.setup()
    renderWithRouter(<ProductCard product={mockProducts[0]} />, store)

    const favoriteButton = screen.getByLabelText(/add to favorites/i)
    await user.click(favoriteButton)

    await waitFor(() => {
      expect(screen.getByLabelText(/remove from favorites/i)).toBeInTheDocument()
    })

    const state = store.getState()
    expect(state.favorites).toHaveLength(1)
    expect(state.favorites[0].id).toBe(mockProducts[0].id)
  })

  it("should remove product from favorites", async () => {
    const user = userEvent.setup()
    store.dispatch(addFavorite(mockProducts[0]))

    renderWithRouter(<ProductCard product={mockProducts[0]} />, store)

    const favoriteButton = screen.getByLabelText(/remove from favorites/i)
    await user.click(favoriteButton)

    await waitFor(() => {
      expect(screen.getByLabelText(/add to favorites/i)).toBeInTheDocument()
    })

    const state = store.getState()
    expect(state.favorites).toHaveLength(0)
  })

  it("should not add duplicate products to favorites", () => {
    store.dispatch(addFavorite(mockProducts[0]))
    store.dispatch(addFavorite(mockProducts[0]))

    const state = store.getState()
    expect(state.favorites).toHaveLength(1)
  })
})

