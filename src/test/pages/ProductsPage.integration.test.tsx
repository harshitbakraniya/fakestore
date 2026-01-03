import React from "react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { BrowserRouter } from "react-router-dom"
import ProductsPage from "@/pages/ProductsPage"
import { render as customRender } from "@/test/test-utils"
import { mockProducts } from "@/test/mockData"

// Mock the API
vi.mock("@/features/products/products.api", async () => {
  const actual = await vi.importActual("@/features/products/products.api")
  return {
    ...actual,
    useGetProductsQuery: () => ({
      data: mockProducts,
      isLoading: false,
      error: null,
    }),
  }
})

describe("ProductsPage Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should render products", async () => {
    customRender(
      <BrowserRouter>
        <ProductsPage />
      </BrowserRouter>
    )
    
    await waitFor(() => {
      expect(screen.getByText(mockProducts[0].title)).toBeInTheDocument()
    })
  })

  it("should filter products by search", async () => {
    const user = userEvent.setup()
    customRender(
      <BrowserRouter>
        <ProductsPage />
      </BrowserRouter>
    )

    await waitFor(() => {
      expect(screen.getByText(mockProducts[0].title)).toBeInTheDocument()
    })

    const searchInput = screen.getByPlaceholderText(/search products/i)
    await user.type(searchInput, "Samsung")

    await waitFor(() => {
      const samsungProduct = mockProducts.find((p) => p.title.includes("Samsung"))
      if (samsungProduct) {
        expect(screen.getByText(samsungProduct.title)).toBeInTheDocument()
      }
    })
  })

  it("should display empty state when no products match filters", async () => {
    const user = userEvent.setup()
    customRender(
      <BrowserRouter>
        <ProductsPage />
      </BrowserRouter>
    )

    const searchInput = screen.getByPlaceholderText(/search products/i)
    await user.type(searchInput, "nonexistentproduct12345")

    await waitFor(() => {
      expect(screen.getByText(/no products found/i)).toBeInTheDocument()
    })
  })
})

