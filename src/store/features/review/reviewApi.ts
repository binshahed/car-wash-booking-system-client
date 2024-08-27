import { baseApi } from "../../api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReview: builder.query({
      query: () => ({
        url: "/reviews",
        method: "GET"
      })
    })
  })
});

export const { useGetAllReviewQuery } = reviewApi;
