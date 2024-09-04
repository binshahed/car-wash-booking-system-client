/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSlot: builder.mutation({
      query: (slot: any) => ({
        url: "/services/slots",
        method: "POST",
        body: slot
      }),
      invalidatesTags: ["slots"]
    }),
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
    }),

    getAllBookings: builder.query({
      query: () => ({
        url: "/bookings",
        method: "GET"
      }),
      providesTags: ["booking"]
    }),
    updateSlotStatus: builder.mutation({
      query: ({ slotId, status }) => ({
        url: `/slots/${slotId}`,
        method: "PATCH",
        body: status
      }),
      invalidatesTags: ["slots"]
    })
  })
});

export const {
  useGetAllSlotQuery,
  useGetSlotDetailsQuery,
  useGetAllBookingsQuery,
  useCreateSlotMutation,
  useUpdateSlotStatusMutation
} = reviewApi;
