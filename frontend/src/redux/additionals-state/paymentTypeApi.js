import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BaseUrl = "http://localhost:7230/additionals";

const paymentTypeApi = createApi({
  reducerPath: "paymentTypeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BaseUrl,
    credentials: "include",
  }),

  tagTypes: ["PaymentType"],

  endpoints: (builder) => ({
    createPaymentType: builder.mutation({
      query: (data) => ({
        url: "/create-paymenttype",
        method: "POST",
        body: data,
      }),
      providesTags: ["PaymentType"],
    }),

    getAllPaymentType: builder.query({
      query: () => ({
        url: "/read-paymenttype",
        method: "GET",
      }),
      providesTags: ["PaymentType"],
    }),

    updatePaymentType: builder.mutation({
      query: ({ id, status }) => ({
        url: `/update-paymenttype/${id}`,
        method: "PUT",
        body: status,
      }),
      invalidatesTags: ["PaymentType"],
    }),

    singlePaymentType: builder.query({
      query: (id) => `/single-paymenttype/${id}`,
      providesTags: (result, error, id) => [{ type: "PaymentType", id }],
    }),
  }),
});

export const {
  useCreatePaymentTypeMutation,
  useGetAllPaymentTypeQuery,
  useUpdatePaymentTypeMutation,
  useSinglePaymentTypeQuery,
} = paymentTypeApi;

export default paymentTypeApi;
