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
    }),
    getMyReviews: builder.query({
      query: () => ({
        url: `/reviews/my`,
        method: "GET"
      }),
      providesTags: ["review"]
    }),

    deleteReview: builder.mutation({
      query: (reviewId) => ({
        url: `/reviews/${reviewId}`,
        method: "DELETE"
      }),
      invalidatesTags: ["review"]
    }),

    updateReview: builder.mutation({
      query: ({ reviewId, data }) => ({
        url: `/reviews/${reviewId}`,
        method: "PATCH",
        body: data
      }),
      invalidatesTags: ["review"]
    }),

    getReviewByService: builder.query({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: "GET"
      }),
      providesTags: ["review"]
    })
  })
});

export const {
  useGetAllReviewQuery,
  useCreateReviewMutation,
  useGetReviewByServiceQuery,
  useGetMyReviewsQuery,
  useDeleteReviewMutation,
  useUpdateReviewMutation
} = reviewApi;
