import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BaseUrl = "http://localhost:7230/products";

const originApi = createApi({
  reducerPath: "originApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BaseUrl,
    credentials: "include",
  }),

  tagTypes: ["Origin"],

  endpoints: (builder) => ({
    createOrigin: builder.mutation({
      query: (newOrigin) => ({
        url: "/create-origin",
        method: "POST",
        body: newOrigin,
      }),
      providesTags: ["Origin"],
    }),

    getAllOrigin: builder.query({
      query: () => ({
        url: "/all-origins",
        method: "GET",
      }),
      providesTags: ["Origin"],
    }),

    // update order status
    updateOrigin: builder.mutation({
      query: ({ id, status }) => ({
        url: `/update-origin/${id}`,
        method: "PUT",
        body:  status ,
      }),
      invalidatesTags: ["Origin"],
    }),

    singleOrigin: builder.query({
      query: (id) => `/single-origin/${id}`,
      providesTags: (result, error, id) => [{ type: "Origin", id }],
    }),



  }),
});

export const {
  useCreateOriginMutation,
  useGetAllOriginQuery,
  useUpdateOriginMutation,
  useSingleOriginQuery,
} = originApi;

export default originApi;