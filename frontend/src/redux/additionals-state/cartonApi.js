import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BaseUrl = "http://localhost:7230/additionals";

const cartonApi = createApi({
  reducerPath: "cartonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BaseUrl,
    credentials: "include",
  }),

  tagTypes: ["Carton"],

  endpoints: (builder) => ({
    createCarton: builder.mutation({
      query: (newBrand) => ({
        url: "/create-carton",
        method: "POST",
        body: newBrand,
      }),
      providesTags: ["Carton"],
    }),

    getAllCartons: builder.query({
      query: () => ({
        url: "/read-carton",
        method: "GET",
      }),
      providesTags: ["Carton"],
    }),

    updateCarton: builder.mutation({
      query: ({ id, status }) => ({
        url: `/update-carton/${id}`,
        method: "PUT",
        body: status,
      }),
      invalidatesTags: ["Carton"],
    }),

    singleCarton: builder.query({
      query: (id) => `/single-carton/${id}`,
      providesTags: (result, error, id) => [{ type: "Carton", id }],
    }),
  }),
});

export const {
  useCreateCartonMutation,
  useGetAllCartonsQuery,
  useSingleCartonQuery,
  useUpdateCartonMutation,
} = cartonApi;

export default cartonApi;
