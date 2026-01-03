import { useState, useEffect } from "react"
import { useAppDispatch } from "@/app/hooks"
import { setSearch } from "@/features/filters/filters.slice"
import { useDebounce } from "@/hooks/useDebounce"
import { Input } from "./ui/input"
import { Search } from "lucide-react"

export default function SearchBar() {
  const [value, setValue] = useState("")
  const debounced = useDebounce(value)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setSearch(debounced))
  }, [debounced, dispatch])

  return (
    <div className="relative bg-white rounded-lg p-1 shadow-sm">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search products..."
        className="pl-9 w-full rounded-lg border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  )
}
