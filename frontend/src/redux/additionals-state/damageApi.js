import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BaseUrl = "http://localhost:7230/additionals";

const damageApi = createApi({
  reducerPath: "damageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BaseUrl,
    credentials: "include",
  }),

  tagTypes: ["Damage"],

  endpoints: (builder) => ({
    createDamage: builder.mutation({
      query: (newBrand) => ({
        url: "/create-damage",
        method: "POST",
        body: newBrand,
      }),
      providesTags: ["Damage"],
    }),

    getAllDamages: builder.query({
      query: () => ({
        url: "/read-damages",
        method: "GET",
      }),
      providesTags: ["Damage"],
    }),

    updateDamages: builder.mutation({
      query: ({ id, status }) => ({
        url: `/update-damage/${id}`,
        method: "PUT",
        body: status,
      }),
      invalidatesTags: ["Damage"],
    }),

    singleDamage: builder.query({
      query: (id) => `/single-damage/${id}`,
      providesTags: (result, error, id) => [{ type: "Damage", id }],
    }),
  }),
});

export const {
  useCreateDamageMutation,
  useGetAllDamagesQuery,
  useSingleDamageQuery,
  useUpdateDamagesMutation,
} = damageApi;

export default damageApi;
