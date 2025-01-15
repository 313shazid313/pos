import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BaseUrl = "http://localhost:7230/additionals";

const slideAdApi = createApi({
  reducerPath: "slideAdApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BaseUrl,
    credentials: "include",
  }),

  tagTypes: ["SlideAd"],

  endpoints: (builder) => ({
    createSlideAd: builder.mutation({
      query: (newBrand) => ({
        url: "/create-slidead",
        method: "POST",
        body: newBrand,
      }),
      providesTags: ["SlideAd"],
    }),

    getAllSlideAds: builder.query({
      query: () => ({
        url: "/read-slideads",
        method: "GET",
      }),
      providesTags: ["SlideAd"],
    }),

    updateSlideAd: builder.mutation({
      query: ({ id, status }) => ({
        url: `/update-slidead/${id}`,
        method: "PUT",
        body: status,
      }),
      invalidatesTags: ["SlideAd"],
    }),

    singleSlideAd: builder.query({
      query: (id) => `/single-slidead/${id}`,
      providesTags: (result, error, id) => [{ type: "SlideAd", id }],
    }),
  }),
});

export const {
  useCreateSlideAdMutation,
  useGetAllSlideAdsQuery,
  useUpdateSlideAdMutation,
  useSingleSlideAdQuery,
} = slideAdApi;

export default slideAdApi;
