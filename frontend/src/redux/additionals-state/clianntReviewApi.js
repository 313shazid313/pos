import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BaseUrl = "http://localhost:7230/additionals";

const cliantReviewApi = createApi({
  reducerPath: "cliantReviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BaseUrl,
    credentials: "include",
  }),

  tagTypes: ["CliantReview"],

  endpoints: (builder) => ({
    createCliantReview: builder.mutation({
      query: (newBrand) => ({
        url: "/create-review",
        method: "POST",
        body: newBrand,
      }),
      providesTags: ["CliantReview"],
    }),

    getAllCliantReview: builder.query({
      query: () => ({
        url: "/read-reviews",
        method: "GET",
      }),
      providesTags: ["CliantReview"],
    }),

    updateCliantReview: builder.mutation({
      query: ({ id, status }) => ({
        url: `/update-review/${id}`,
        method: "PUT",
        body: status,
      }),
      invalidatesTags: ["CliantReview"],
    }),

    singleCliantReview: builder.query({
      query: (id) => `/single-review/${id}`,
      providesTags: (result, error, id) => [{ type: "CliantReview", id }],
    }),
  }),
});

export const {
  useCreateCliantReviewMutation,
  useGetAllCliantReviewQuery,
  useUpdateCliantReviewMutation,
  useSingleCliantReviewQuery,
} = cliantReviewApi;

export default cliantReviewApi;
