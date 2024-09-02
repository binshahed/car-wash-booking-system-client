/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const servicesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllServices: builder.query({
      query: (query) => {
        const params = new URLSearchParams();
        if (query?.searchTerm) params.append("searchTerm", query.searchTerm);
        if (query?.sort) params.append("sort", query.sort);
        if (query?.order) params.append("order", query.order);
        if (query?.priceRange) params.append("priceRange", query.priceRange);
        if (query?.limit) params.append("limit", query.limit);

        return {
          url: `/services${params.toString() ? `?${params.toString()}` : ""}`,
          method: "GET"
        };
      },
      providesTags: (result) =>
        result && result.data
          ? [
              ...result.data.map(({ id }: { id: string }) => ({
                type: "services" as const,
                id
              })),
              { type: "services", id: "LIST" }
            ]
          : [{ type: "services", id: "LIST" }]
    }),
    getAllServicesAdmin: builder.query({
      query: (query) => {
        const params = new URLSearchParams();
        if (query?.searchTerm) params.append("searchTerm", query.searchTerm);
        if (query?.sort) params.append("sort", query.sort);
        if (query?.order) params.append("order", query.order);
        if (query?.priceRange) params.append("priceRange", query.priceRange);
        if (query?.page) params.append("page", query.page);
        if (query?.limit) params.append("limit", query.limit);

        return {
          url: `/services/admin${
            params.toString() ? `?${params.toString()}` : ""
          }`,
          method: "GET"
        };
      },
      providesTags: ["services"]
    }),
    serviceDetail: builder.query({
      query: (serviceId: string) => ({
        url: `/services/${serviceId}`,
        method: "GET"
      }),
      providesTags: (_result, _error, serviceId) => [
        { type: "services", id: serviceId }
      ]
    }),
    deleteService: builder.mutation({
      query: (serviceId: string) => ({
        url: `/services/${serviceId}`,
        method: "DELETE"
      }),
      invalidatesTags: ["services"]
    }),
    createService: builder.mutation({
      query: (service: any) => ({
        url: "/services",
        method: "POST",
        body: service
      }),
      invalidatesTags: ["services"]
    }),
    updateService: builder.mutation({
      query: ({ serviceId, data }) => {
        console.log(serviceId, data);

        return {
          url: `/services/${serviceId}`,
          method: "PATCH",
          body: data
        };
      },
      invalidatesTags: ["services"]
    })
  })
});

export const {
  useGetAllServicesQuery,
  useServiceDetailQuery,
  useGetAllServicesAdminQuery,
  useDeleteServiceMutation,
  useCreateServiceMutation,
  useUpdateServiceMutation
} = servicesApi;
