import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BaseUrl = "http://localhost:7230/products";

const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BaseUrl,
    credentials: "include",
  }),

  tagTypes: ["Category"],

  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (newCategory) => ({
        url: "/create-category",
        method: "POST",
        body: newCategory,
      }),
      providesTags: ["Category"],
    }),

    getAllCategories: builder.query({
      query: () => ({
        url: "/all-categories",
        method: "GET",
      }),
      providesTags: ["Category"],
    }),

    // update order status
    updateCategories: builder.mutation({
      query: ({ id, status }) => ({
        url: `/update-category/${id}`,
        method: "PUT",
        body: status,
      }),
      invalidatesTags: ["Category"],
    }),

    singleCategory: builder.query({
      query: (id) => `/single-category/${id}`,
      providesTags: (result, error, id) => [{ type: "Category", id }],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
  useSingleCategoryQuery,
  useUpdateCategoriesMutation,
} = categoryApi;

export default categoryApi;
