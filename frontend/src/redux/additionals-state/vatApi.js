import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BaseUrl = "http://localhost:7230/additionals";

const vatApi = createApi({
  reducerPath: "vatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BaseUrl,
    credentials: "include",
  }),

  tagTypes: ["vat"],

  endpoints: (builder) => ({
    createvat: builder.mutation({
      query: (newBrand) => ({
        url: "/create-vat",
        method: "POST",
        body: newBrand,
      }),
      providesTags: ["vat"],
    }),

    getAllvats: builder.query({
      query: () => ({
        url: "/read-vats",
        method: "GET",
      }),
      providesTags: ["vat"],
    }),

    updatevats: builder.mutation({
      query: ({ id, status }) => ({
        url: `/update-vat/${id}`,
        method: "PUT",
        body: status,
      }),
      invalidatesTags: ["vat"],
    }),
  }),
});

export const {
  useCreatevatMutation,
  useGetAllvatsQuery,
  useUpdatevatsMutation,
} = vatApi;

export default vatApi;
