import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET"
      }),
      providesTags: ["users"]
    }),
    updateUserRole: builder.mutation({
      query: ({ userId, role }) => ({
        url: `/users/${userId}`,
        method: "PATCH",
        body: role
      }),
      invalidatesTags: ["users"]
    }),
    getMe: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET"
      }),
      providesTags: ["users"]
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/users/me",
        method: "PATCH",
        body: data
      }),
      invalidatesTags: ["users"]
    })
  })
});

export const {
  useUpdateProfileMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useGetMeQuery
} = userApi;
