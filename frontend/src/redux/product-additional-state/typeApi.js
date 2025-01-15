import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BaseUrl = "http://localhost:7230/products";

const typeApi = createApi({
  reducerPath: "typeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BaseUrl,
    credentials: "include",
  }),

  tagTypes: ["Types"],

  endpoints: (builder) => ({
    createType: builder.mutation({
      query: (newType) => ({
        url: "/create-type",
        method: "POST",
        body: newType,
      }),
      providesTags: ["Types"],
    }),

    getAllTypes: builder.query({
      query: () => ({
        url: "/all-types",
        method: "GET",
      }),
      providesTags: ["Types"],
    }),

    // update order status
    updateType: builder.mutation({
      query: ({ id, status }) => ({
        url: `/update-type/${id}`,
        method: "PUT",
        body: status,
      }),
      invalidatesTags: ["Types"],
    }),

    singleType: builder.query({
      query: (id) => `/single-type/${id}`,
      providesTags: (result, error, id) => [{ type: "Types", id }],
    }),
  }),
});

export const {
  useCreateTypeMutation,
  useGetAllTypesQuery,
  useUpdateTypeMutation,
  useSingleTypeQuery,
} = typeApi;

export default typeApi;
