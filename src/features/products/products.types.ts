export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: Count,
}

interface Count {
  rate: number,
  count: number,
}