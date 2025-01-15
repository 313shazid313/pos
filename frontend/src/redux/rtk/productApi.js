import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BaseUrl = "http://localhost:7230/products";

const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BaseUrl,
    credentials: "include",
  }),

  tagTypes: ["Product"],

  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (newProduct) => ({
        url: "/create-product",
        method: "POST",
        body: newProduct,
      }),
      providesTags: ["Product"],
    }),

    getAllProducts: builder.query({
      query: () => ({
        url: "/all-products",
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    updateProduct: builder.mutation({
      query: ({ id, status }) => ({
        url: `/update-product/${id}`,
        method: "PUT",
        body: status,
      }),
      invalidatesTags: ["Product"],
    }),

    singleProduct: builder.query({
      query: (id) => `/single-product/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),

    searchProducts: builder.query({
      query: (searchedname) => `/search?query=${searchedname}`,
      providesTags: ["Product"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useSingleProductQuery,
  useUpdateProductMutation,
  useSearchProductsQuery,
} = productApi;

export default productApi;
