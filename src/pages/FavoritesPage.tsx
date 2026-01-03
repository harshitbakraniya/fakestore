import { useAppSelector } from "@/app/hooks"
import ProductCard from "@/components/ProductCard"
import Pagination from "@/components/Pagination"
import {
  selectFilteredFavorites,
  selectPaginatedFavorites,
  selectFavoritesTotalPages,
} from "@/features/favorites/favorites.selectors"
import { Heart } from "lucide-react"
import type { RootState } from "@/app/store"

export default function FavoritesPage() {
  const favorites = useAppSelector((s) => s.favorites)
  const filters = useAppSelector((s) => s.filters)
  const mockState = { filters } as RootState
  const filteredFavorites = selectFilteredFavorites(favorites, mockState)
  const paginatedFavorites = selectPaginatedFavorites(filteredFavorites, mockState)
  const totalPages = selectFavoritesTotalPages(filteredFavorites, mockState)

  if (favorites.length === 0) {
    return (
      <section className="max-w-7xl mx-auto py-6 px-4">
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
          <Heart className="h-16 w-16 text-muted-foreground" />
          <h2 className="text-2xl font-semibold text-foreground">
            No Favorites Yet
          </h2>
          <p className="text-muted-foreground text-center max-w-md">
            Start adding products to your favorites by clicking the heart icon
            on any product card.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="max-w-7xl mx-auto space-y-6 py-6 px-4">
      <div className="flex items-center gap-2 mb-2">
        <Heart className="h-6 w-6 text-primary fill-primary" />
        <h1 className="text-3xl font-bold text-foreground">
          My Favorites ({favorites.length})
        </h1>
      </div>

      {paginatedFavorites.length === 0 ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-muted-foreground text-lg">
            No favorites match your current filters. Try adjusting your search or
            filters.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {paginatedFavorites.map((p, index) => (
              <ProductCard key={p.id} product={p} index={index} />
            ))}
          </div>
          <Pagination totalPages={totalPages} />
        </>
      )}
    </section>
  )
}
