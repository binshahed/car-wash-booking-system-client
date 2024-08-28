import { baseApi } from "../../api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReview: builder.query({
      query: () => ({
        url: "/reviews",
        method: "GET"
      }),
      providesTags: ["review"]
    }),
    createReview: builder.mutation({
      query: (review) => ({
        url: "/reviews",
        method: "POST",
        body: review
      }),
      invalidatesTags: ["review"]
    })
  })
});

export const { useGetAllReviewQuery, useCreateReviewMutation } = reviewApi;
