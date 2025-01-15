import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BaseUrl = "http://localhost:7230/additionals";

const supplierApi = createApi({
  reducerPath: "supplierApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BaseUrl,
    credentials: "include",
  }),

  tagTypes: ["Supplier"],

  endpoints: (builder) => ({
    createSupplier: builder.mutation({
      query: (newBrand) => ({
        url: "/create-supplier",
        method: "POST",
        body: newBrand,
      }),
      providesTags: ["Supplier"],
    }),

    getAllSuppliers: builder.query({
      query: () => ({
        url: "/read-suppliers",
        method: "GET",
      }),
      providesTags: ["Supplier"],
    }),

    updateSuppliers: builder.mutation({
      query: ({ id, status }) => ({
        url: `/update-supplier/${id}`,
        method: "PUT",
        body: status,
      }),
      invalidatesTags: ["Supplier"],
    }),

    singleSupplier: builder.query({
      query: (id) => `/single-supplier/${id}`,
      providesTags: (result, error, id) => [{ type: "Supplier", id }],
    }),
  }),
});

export const {
  useCreateSupplierMutation,
  useGetAllSuppliersQuery,
  useSingleSupplierQuery,
  useUpdateSuppliersMutation,
} = supplierApi;

export default supplierApi;
