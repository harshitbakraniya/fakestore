import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { setSort, setCategory, type SortOption } from "@/features/filters/filters.slice"
import { Badge } from "./ui/badge"
import { Select } from "./ui/select"
import { useGetProductsQuery } from "@/features/products/products.api"
import { X } from "lucide-react"
import { Button } from "./ui/button"

export default function FilterChips() {
  const dispatch = useAppDispatch()
  const { sort, category } = useAppSelector((state) => state.filters)
  const { data: products = [] } = useGetProductsQuery()

  // Get unique categories from products
  const categories = Array.from(
    new Set(products.map((p) => p.category))
  ).sort()

  const handleSortChange = (newSort: SortOption) => {
    dispatch(setSort(newSort === sort ? "" : newSort))
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setCategory(e.target.value))
  }

  const clearCategory = () => {
    dispatch(setCategory(""))
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Price Filters */}
      <Badge
        variant={sort === "price-low-high" ? "default" : "outline"}
        className="cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors p-2"
        onClick={() => handleSortChange("price-low-high")}
      >
        Price: Low to High
      </Badge>

      <Badge
        variant={sort === "price-high-low" ? "default" : "outline"}
        className="cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors p-2"
        onClick={() => handleSortChange("price-high-low")}
      >
        Price: High to Low
      </Badge>

      {/* Top Rated Filter */}
      <Badge
        variant={sort === "top-rated" ? "default" : "outline"}
        className="cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors p-2"
        onClick={() => handleSortChange("top-rated")}
      >
        Top Rated
      </Badge>

      {/* Category Dropdown */}
      <div className="flex items-center gap-2">
        <Select
          value={category}
          onChange={handleCategoryChange}
          className="w-[180px] bg-white border-none focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </Select>
        {category && (
          <Button
            variant="ghost"
            size="icon"
            onClick={clearCategory}
            className="h-8 w-8"
            aria-label="Clear category filter"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}

