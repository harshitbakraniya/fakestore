import { describe, it, expect, vi, beforeEach } from "vitest"
import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Provider } from "react-redux"
import Pagination from "@/components/Pagination"
import { render as customRender, createTestStore } from "@/test/test-utils"

describe("Pagination", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Mock window.scrollTo
    window.scrollTo = vi.fn()
  })

  it("should not render when totalPages is 1 or less", () => {
    const { container } = customRender(<Pagination totalPages={1} />)
    expect(container.firstChild).toBeNull()
  })

  it("should render pagination controls", () => {
    customRender(<Pagination totalPages={5} />, {
      preloadedState: {
        filters: {
          search: "",
          category: "",
          sort: "",
          currentPage: 1,
          itemsPerPage: 12,
        },
      },
    })

    expect(screen.getByLabelText(/previous page/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/next page/i)).toBeInTheDocument()
    expect(screen.getByText("1")).toBeInTheDocument()
  })

  it("should disable previous button on first page", () => {
    customRender(<Pagination totalPages={5} />, {
      preloadedState: {
        filters: {
          search: "",
          category: "",
          sort: "",
          currentPage: 1,
          itemsPerPage: 12,
        },
      },
    })

    const prevButton = screen.getByLabelText(/previous page/i)
    expect(prevButton).toBeDisabled()
  })

  it("should disable next button on last page", () => {
    customRender(<Pagination totalPages={5} />, {
      preloadedState: {
        filters: {
          search: "",
          category: "",
          sort: "",
          currentPage: 5,
          itemsPerPage: 12,
        },
      },
    })

    const nextButton = screen.getByLabelText(/next page/i)
    expect(nextButton).toBeDisabled()
  })

  it("should change page when clicking page number", async () => {
    const user = userEvent.setup()
    const store = createTestStore({
      filters: {
        search: "",
        category: "",
        sort: "",
        currentPage: 1,
        itemsPerPage: 12,
      },
    })

    customRender(
      <Provider store={store}>
        <Pagination totalPages={5} />
      </Provider>
    )

    const page2Button = screen.getByText("2")
    await user.click(page2Button)

    // Wait for state update
    await waitFor(() => {
      const state = store.getState()
      expect(state.filters.currentPage).toBe(2)
    })
  })

  it("should show ellipsis for large page counts", () => {
    customRender(<Pagination totalPages={10} />, {
      preloadedState: {
        filters: {
          search: "",
          category: "",
          sort: "",
          currentPage: 5,
          itemsPerPage: 12,
        },
      },
    })

    const ellipsis = screen.getAllByText("...")
    expect(ellipsis.length).toBeGreaterThan(0)
  })
})

