import type { Product } from "@/features/products/products.types"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { addFavorite, removeFavorite } from "@/features/favorites/favorites.slice"
import { Button } from "./ui/button"
import { Heart, Star } from "lucide-react"
import { Link } from "react-router-dom"

export default function ProductCard({ product, index }: { product: Product, index: number }) {
    const dispatch = useAppDispatch()
    const favorites = useAppSelector(s => s.favorites)
    const isFav = favorites.some(p => p.id === product.id)

    const handleFavoriteToggle = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (isFav) {
            dispatch(removeFavorite(product.id))
        } else {
            dispatch(addFavorite(product))
        }
    }

    return (
        <div
            className="product-card group relative bg-white border-gray rounded-xl overflow-hidden shadow-sm animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            <Link to={`/product/${product.id}`} className="block">
                {/* Image Container */}
                <div className="relative aspect-square bg-background p-6 overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="product-image w-full h-full object-contain"
                        loading="lazy"
                    />

                    {/* Favorite Button */}
                    <Button
                        onClick={handleFavoriteToggle}
                        className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm shadow-soft hover:shadow-hover transition-all duration-300 hover:bg-primary/10 hover:scale-110 hover:text-white"
                        aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
                    >
                        <Heart
                            className={`h-5 w-5 transition-colors duration-300 ${isFav ? 'fill-primary text-primary' : 'text-foreground hover:text-primary'
                                }`}
                        />
                    </Button>

                    {/* Category Badge */}
                    <span className="absolute bottom-4 left-4 px-3 py-1 text-xs font-medium bg-background/90 backdrop-blur-sm rounded-full text-muted-foreground capitalize">
                        {product.category}
                    </span>
                </div>

                {/* Content */}
                <div className="p-5">
                    <h3 className="font-display text-md font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                        {product.title}
                    </h3>

                    <div className="flex items-end justify-between">
                        <span className="font-body text-xl font-bold text-foreground">
                            ${product.price.toFixed(2)}
                        </span>

                        <div className="flex items-center gap-1 text-muted-foreground">
                            <Star className="h-4 w-4 fill-primary text-primary" />
                            <span className="text-sm font-medium">{product.rating.rate}</span>
                            <span className="text-xs">({product.rating.count})</span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
