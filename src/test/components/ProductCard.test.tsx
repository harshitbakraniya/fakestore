import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import ProductCard from "@/components/ProductCard"
import { render as customRender } from "@/test/test-utils"
import { mockProducts } from "@/test/mockData"
import { MemoryRouter } from "react-router-dom"

const renderWithRouter = (ui: React.ReactElement) => {
  return customRender(<MemoryRouter>{ui}</MemoryRouter>)
}

describe("ProductCard", () => {
  it("should render product information", () => {
    renderWithRouter(<ProductCard product={mockProducts[0]} />)

    expect(screen.getByText(mockProducts[0].title)).toBeInTheDocument()
    expect(screen.getByText(`$${mockProducts[0].price.toFixed(2)}`)).toBeInTheDocument()
    expect(screen.getByText(mockProducts[0].category)).toBeInTheDocument()
  })

  it("should render product image", () => {
    renderWithRouter(<ProductCard product={mockProducts[0]} />)
    const image = screen.getByAltText(mockProducts[0].title)
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute("src", mockProducts[0].image)
  })

  it("should render rating information", () => {
    renderWithRouter(<ProductCard product={mockProducts[0]} />)
    expect(screen.getByText(mockProducts[0].rating.rate.toString())).toBeInTheDocument()
  })

  it("should toggle favorite when heart button is clicked", async () => {
    const user = userEvent.setup()
    renderWithRouter(<ProductCard product={mockProducts[0]} />)

    const favoriteButton = screen.getByLabelText(/add to favorites/i)
    await user.click(favoriteButton)

    // After clicking, the button should show "Remove from favorites"
    await screen.findByLabelText(/remove from favorites/i)
  })

  it("should link to product detail page", () => {
    renderWithRouter(<ProductCard product={mockProducts[0]} />)
    const link = screen.getByRole("link")
    expect(link).toHaveAttribute("href", `/product/${mockProducts[0].id}`)
  })
})

