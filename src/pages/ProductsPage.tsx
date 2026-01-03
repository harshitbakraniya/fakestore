import { useGetProductsQuery } from "@/features/products/products.api"
import ProductCard from "@/components/ProductCard"
import SearchBar from "@/components/SearchBar"
import FilterChips from "@/components/FilterChips"
import Pagination from "@/components/Pagination"
import { useAppSelector } from "@/app/hooks"
import {
  selectFilteredProducts,
  selectPaginatedProducts,
  selectTotalPages,
} from "@/features/products/products.selectors"

export default function ProductsPage() {
  const { data = [], isLoading } = useGetProductsQuery()
  const filters = useAppSelector((s) => s.filters)
  const filteredProducts = selectFilteredProducts(data, { filters } as any)
  const paginatedProducts = selectPaginatedProducts(filteredProducts, { filters } as any)
  const totalPages = selectTotalPages(filteredProducts, { filters } as any)

  if (isLoading) {
    return (
      <section className="max-w-7xl mx-auto py-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-muted-foreground">Loading products...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-background">
      <div className="max-w-7xl mx-auto container space-y-6 py-6 px-4">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex-1 w-full md:max-w-md">
          <SearchBar />
        </div>
        <div>
          <FilterChips />
        </div>
      </div>
      
      {paginatedProducts.length === 0 ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-muted-foreground text-lg">
            No products found. Try adjusting your filters.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {paginatedProducts.map((p, index) => (
              <ProductCard key={p.id} product={p} index={index} />
            ))}
          </div>
          <Pagination totalPages={totalPages} />
        </>
      )}
      </div>
    </section>
  )
}
