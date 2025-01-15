import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BaseUrl = "http://localhost:7230/products";

const brandApi = createApi({
  reducerPath: "brandApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BaseUrl,
    credentials: "include",
  }),

  tagTypes: ["Brand"],

  endpoints: (builder) => ({
    createBrand: builder.mutation({
      query: (newBrand) => ({
        url: "/create-brand",
        method: "POST",
        body: newBrand,
      }),
      providesTags: ["Brand"],
    }),

    getAllBrands: builder.query({
      query: () => ({
        url: "/all-brands",
        method: "GET",
      }),
      providesTags: ["Brand"],
    }),

    updateBrand: builder.mutation({
      query: ({ id, status }) => ({
        url: `/update-brand/${id}`,
        method: "PUT",
        body: status,
      }),
      invalidatesTags: ["Brand"],
    }),

    singleBrand: builder.query({
      query: (id) => `/single-brand/${id}`,
      providesTags: (result, error, id) => [{ type: "Brand", id }],
    }),
  }),
});

export const {
  useCreateBrandMutation,
  useGetAllBrandsQuery,
  useUpdateBrandMutation,
  useSingleBrandQuery,
} = brandApi;

export default brandApi;
