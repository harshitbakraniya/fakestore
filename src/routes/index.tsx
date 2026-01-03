import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProductsPage from "@/pages/ProductsPage"
import ProductDetailPage from "@/pages/ProductDetailPage"
import FavoritesPage from "@/pages/FavoritesPage"
import Header from "@/components/Header"

export default function AppRoutes() {
  return (
    <>
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}
