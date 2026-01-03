import { baseApi } from "../../api/baseApi"
import  type { Product } from "./products.types"

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "/products",
      providesTags: ["Product"],
    }),

    getProductById: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
} = productsApi
