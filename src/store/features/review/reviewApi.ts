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
    getReviewByService: builder.query({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: "GET"
      })
    })
  })
});

export const {
  useGetAllReviewQuery,
  useCreateReviewMutation,
  useGetReviewByServiceQuery
} = reviewApi;
