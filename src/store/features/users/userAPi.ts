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
    })
  })
});

export const { useGetAllUsersQuery, useUpdateUserRoleMutation } = userApi;
