import { useParams } from "react-router-dom"
import { useGetProductByIdQuery } from "@/features/products/products.api"
import { addFavorite } from "@/features/favorites/favorites.slice"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { Button } from "@/components/ui/button"
import { Heart, RefreshCw, Shield, Star, Truck } from "lucide-react"
import { useState } from "react"

export default function ProductDetailPage() {
    const { id } = useParams()
    const { data } = useGetProductByIdQuery(Number(id))
    const dispatch = useAppDispatch()
    const favorites = useAppSelector(s => s.favorites)
    const productId = Number(id)
    const isFav = !Number.isNaN(productId) && favorites.some(p => p.id === productId);
    const [imageLoaded, setImageLoaded] = useState(false);

    if (!data) return null

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                    {/* Product Image */}
                    <div className="relative animate-fade-in">
                        <div className="aspect-square bg-card rounded-2xl p-8 lg:p-12 shadow-soft overflow-hidden">
                            {!imageLoaded && (
                                <div className="absolute inset-0 flex items-center justify-center bg-muted">
                                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                                </div>
                            )}
                            <img
                                src={data.image}
                                alt={data.title}
                                className={`w-full h-full object-contain transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                                    }`}
                                onLoad={() => setImageLoaded(true)}
                            />
                        </div>

                        {/* Category Badge */}
                        <span className="absolute top-6 left-6 px-4 py-2 text-sm font-medium bg-background/90 backdrop-blur-sm rounded-full text-muted-foreground capitalize shadow-soft">
                            {data.category}
                        </span>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col animate-slide-up">
                        <div className="flex-1">
                            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
                                {data.title}
                            </h1>

                            {/* Rating */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <Star
                                            key={index}
                                            className={`h-5 w-5 ${index < Math.round(data.rating.rate)
                                                ? 'fill-primary text-primary'
                                                : 'text-border'
                                                }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-muted-foreground">
                                    {data.rating.rate} ({data.rating.count} reviews)
                                </span>
                            </div>

                            {/* Price */}
                            <p className="font-display text-4xl font-bold text-foreground mb-6">
                                ${data.price.toFixed(2)}
                            </p>

                            {/* Description */}
                            <p className="text-muted-foreground leading-relaxed mb-8">
                                {data.description}
                            </p>

                            {/* Features */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                                <div className="flex items-center gap-3 p-4 bg-card rounded-xl">
                                    <Truck className="h-5 w-5 text-primary" />
                                    <span className="text-sm text-foreground">Free Shipping</span>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-card rounded-xl">
                                    <Shield className="h-5 w-5 text-primary" />
                                    <span className="text-sm text-foreground">2 Year Warranty</span>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-card rounded-xl">
                                    <RefreshCw className="h-5 w-5 text-primary" />
                                    <span className="text-sm text-foreground">Easy Returns</span>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                size="lg"
                                onClick={() => dispatch(addFavorite(data))}
                                variant={isFav ? 'default' : 'outline'}
                                className="flex-1 gap-2"
                            >
                                <Heart className={`h-5 w-5 ${isFav ? 'fill-current' : ''}`} />
                                {isFav ? 'Remove from Favorites' : 'Add to Favorites'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
