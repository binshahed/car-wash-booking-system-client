/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSlot: builder.query({
      query: (query: any) => {
        const params = new URLSearchParams();
        if (query?.date) params.append("date", query.date);
        if (query?.serviceId) params.append("serviceId", query.serviceId);
        return {
          url: `/slots/availability${
            params.toString() ? `?${params.toString()}` : ""
          }`,
          method: "GET"
        };
      },
      providesTags: ["slots"]
    }),
    getSlotDetails: builder.query({
      query: (slotId: string) => ({
        url: `/slots/${slotId}`,
        method: "GET"
      }),
      providesTags: ["slots"]
    })
  })
});

export const { useGetAllSlotQuery, useGetSlotDetailsQuery } = reviewApi;