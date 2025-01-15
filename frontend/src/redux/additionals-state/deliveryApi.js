import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BaseUrl = "http://localhost:7230/additionals";

const deliveryApi = createApi({
  reducerPath: "deliveryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BaseUrl,
    credentials: "include",
  }),

  tagTypes: ["Delivery"],

  endpoints: (builder) => ({
    createDelivery: builder.mutation({
      query: (newBrand) => ({
        url: "/create-delivery",
        method: "POST",
        body: newBrand,
      }),
      providesTags: ["Delivery"],
    }),

    getAllDeliveries: builder.query({
      query: () => ({
        url: "/read-deliveries",
        method: "GET",
      }),
      providesTags: ["Delivery"],
    }),

    updateDelivery: builder.mutation({
      query: ({ id, status }) => ({
        url: `/update-delivery/${id}`,
        method: "PUT",
        body: status,
      }),
      invalidatesTags: ["Delivery"],
    }),

    singleDelivery: builder.query({
      query: (id) => `/single-delivery/${id}`,
      providesTags: (result, error, id) => [{ type: "Delivery", id }],
    }),
  }),
});

export const {
  useCreateDeliveryMutation,
  useGetAllDeliveriesQuery,
  useSingleDeliveryQuery,
  useUpdateDeliveryMutation,
} = deliveryApi;

export default deliveryApi;
