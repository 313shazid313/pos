import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BaseUrl = "http://localhost:7230/products";

const unitApi = createApi({
  reducerPath: "unitApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BaseUrl,
    credentials: "include",
  }),

  tagTypes: ["Unit"],

  endpoints: (builder) => ({
    createUnit: builder.mutation({
      query: (newUnit) => ({
        url: "/create-unit",
        method: "POST",
        body: newUnit,
      }),
      providesTags: ["Unit"],
    }),

    getAllUnit: builder.query({
      query: () => ({
        url: "/all-units",
        method: "GET",
      }),
      providesTags: ["Unit"],
    }),

    updateUnit: builder.mutation({
      query: ({ id, status }) => ({
        url: `/update-unit/${id}`,
        method: "PUT",
        body: status,
      }),
      invalidatesTags: ["Unit"],
    }),

    singleUnit: builder.query({
      query: (id) => `/single-unit/${id}`,
      providesTags: (result, error, id) => [{ type: "Unit", id }],
    }),
  }),
});

export const {
  useCreateUnitMutation,
  useGetAllUnitQuery,
  useUpdateUnitMutation,
  useSingleUnitQuery,
} = unitApi;

export default unitApi;
