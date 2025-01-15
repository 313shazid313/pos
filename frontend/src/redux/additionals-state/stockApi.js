import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BaseUrl = "http://localhost:7230/additionals";

const stockApi = createApi({
  reducerPath: "stockApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BaseUrl,
    credentials: "include",
  }),

  tagTypes: ["Stock"],

  endpoints: (builder) => ({
    createStock: builder.mutation({
      query: (newBrand) => ({
        url: "/create-stock",
        method: "POST",
        body: newBrand,
      }),
      providesTags: ["Stock"],
    }),

    getAllStocks: builder.query({
      query: () => ({
        url: "/read-stocks",
        method: "GET",
      }),
      providesTags: ["Stock"],
    }),

    updateStock: builder.mutation({
      query: ({ id, status }) => ({
        url: `/update-stock/${id}`,
        method: "PUT",
        body: status,
      }),
      invalidatesTags: ["Stock"],
    }),

    singleStock: builder.query({
      query: (id) => `/single-stock/${id}`,
      providesTags: (result, error, id) => [{ type: "Stock", id }],
    }),
  }),
});

export const {
  useCreateStockMutation,
  useGetAllStocksQuery,
  useSingleStockQuery,
  useUpdateStockMutation,
} = stockApi;

export default stockApi;
