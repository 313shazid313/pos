import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BaseUrl = "http://localhost:7230/additionals";

const customerApi = createApi({
  reducerPath: "customerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BaseUrl,
    credentials: "include",
  }),

  tagTypes: ["Customer"],

  endpoints: (builder) => ({
    createCustomer: builder.mutation({
      query: (newBrand) => ({
        url: "/create-customer",
        method: "POST",
        body: newBrand,
      }),
      providesTags: ["Customer"],
    }),

    getAllCustomers: builder.query({
      query: () => ({
        url: "/read-customers",
        method: "GET",
      }),
      providesTags: ["Customer"],
    }),

    updateCustomers: builder.mutation({
      query: ({ id, status }) => ({
        url: `/update-customer/${id}`,
        method: "PUT",
        body: status,
      }),
      invalidatesTags: ["Customer"],
    }),

    singleCustomer: builder.query({
      query: (id) => `/single-customer/${id}`,
      providesTags: (result, error, id) => [{ type: "Customer", id }],
    }),

    singleCustomerByPhone: builder.query({
      query: (phone) => `/customerbyphone/${phone}`,
      providesTags: (result, error, id) => [{ type: "Customer", id }],
    }),
  }),
});

export const {
  useCreateCustomerMutation,
  useGetAllCustomersQuery,
  useSingleCustomerQuery,
  useUpdateCustomersMutation,
  useSingleCustomerByPhoneQuery,
} = customerApi;

export default customerApi;
