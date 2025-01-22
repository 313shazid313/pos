import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BaseUrl = "http://localhost:7230/additionals";

const sellApi = createApi({
  reducerPath: "sellApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BaseUrl,
    credentials: "include",
  }),

  tagTypes: ["Sell"],

  endpoints: (builder) => ({
    createSell: builder.mutation({
      query: (data) => ({
        url: "/create-sell",
        method: "POST",
        body: data,
      }),
      providesTags: ["Sell"],
    }),

    getAllSells: builder.query({
      query: () => ({
        url: "/read-sell",
        method: "GET",
      }),
      providesTags: ["Sell"],
    }),

    // updateSell: builder.mutation({
    //   query: ({ id, status }) => ({
    //     url: `/update-Sell/${id}`,
    //     method: "PUT",
    //     body: status,
    //   }),
    //   invalidatesTags: ["Sell"],
    // }),

    // singleSell: builder.query({
    //   query: (id) => `/single-Sell/${id}`,
    //   providesTags: (result, error, id) => [{ type: "Sell", id }],
    // }),
  }),
});

export const { useCreateSellMutation, useGetAllSellsQuery } = sellApi;

export default sellApi;
