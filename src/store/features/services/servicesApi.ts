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
      }
    })
  })
});

export const { useGetAllServicesQuery } = servicesApi;
