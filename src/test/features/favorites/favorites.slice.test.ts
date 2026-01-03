import { describe, it, expect } from "vitest"
import favoritesReducer, {
  addFavorite,
  removeFavorite,
} from "@/features/favorites/favorites.slice"
import type { Product } from "@/features/products/products.types"

const mockProduct1: Product = {
  id: 1,
  title: "Test Product 1",
  price: 10.99,
  description: "Test description",
  category: "electronics",
  image: "https://example.com/image.jpg",
  rating: {
    rate: 4.5,
    count: 100,
  },
}

const mockProduct2: Product = {
  id: 2,
  title: "Test Product 2",
  price: 20.99,
  description: "Test description 2",
  category: "clothing",
  image: "https://example.com/image2.jpg",
  rating: {
    rate: 4.0,
    count: 50,
  },
}

describe("favoritesSlice", () => {
  it("should return the initial state", () => {
    expect(favoritesReducer(undefined, { type: "unknown" })).toEqual([])
  })

  describe("addFavorite", () => {
    it("should add a product to favorites", () => {
      const action = addFavorite(mockProduct1)
      const result = favoritesReducer([], action)
      expect(result).toHaveLength(1)
      expect(result[0]).toEqual(mockProduct1)
    })

    it("should not add duplicate products", () => {
      const initialState = [mockProduct1]
      const action = addFavorite(mockProduct1)
      const result = favoritesReducer(initialState, action)
      expect(result).toHaveLength(1)
      expect(result[0]).toEqual(mockProduct1)
    })

    it("should add multiple different products", () => {
      const initialState = [mockProduct1]
      const action = addFavorite(mockProduct2)
      const result = favoritesReducer(initialState, action)
      expect(result).toHaveLength(2)
      expect(result).toContainEqual(mockProduct1)
      expect(result).toContainEqual(mockProduct2)
    })
  })

  describe("removeFavorite", () => {
    it("should remove a product from favorites", () => {
      const initialState = [mockProduct1, mockProduct2]
      const action = removeFavorite(1)
      const result = favoritesReducer(initialState, action)
      expect(result).toHaveLength(1)
      expect(result[0]).toEqual(mockProduct2)
    })

    it("should not remove anything if product is not in favorites", () => {
      const initialState = [mockProduct1]
      const action = removeFavorite(999)
      const result = favoritesReducer(initialState, action)
      expect(result).toHaveLength(1)
      expect(result[0]).toEqual(mockProduct1)
    })

    it("should handle removing from empty array", () => {
      const action = removeFavorite(1)
      const result = favoritesReducer([], action)
      expect(result).toEqual([])
    })
  })
})

