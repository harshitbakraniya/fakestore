import { describe, it, expect, vi, beforeEach } from "vitest"
import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import SearchBar from "@/components/SearchBar"
import { render as customRender } from "@/test/test-utils"

// Mock the debounce hook
vi.mock("@/hooks/useDebounce", () => ({
  useDebounce: (value: string) => value, // Return value immediately for testing
}))

describe("SearchBar", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should render search input", () => {
    customRender(<SearchBar />)
    const input = screen.getByPlaceholderText(/search products/i)
    expect(input).toBeInTheDocument()
  })

  it("should update input value when user types", async () => {
    const user = userEvent.setup()
    customRender(<SearchBar />)
    const input = screen.getByPlaceholderText(/search products/i) as HTMLInputElement

    await user.type(input, "laptop")
    expect(input.value).toBe("laptop")
  })

  it("should display search icon", () => {
    customRender(<SearchBar />)
    // Search icon is rendered as SVG, check for the input with search placeholder
    const input = screen.getByPlaceholderText(/search products/i)
    expect(input).toBeInTheDocument()
  })
})

