import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000'}),
    endpoints: (builder) => ({
        getUsers: builder.query({query: () => `/users`,}),
        createUser: builder.mutation({
            query: (data) => ({
                url: `/users`,
                method: `POST`,
                body: data
            }),
            transformResponse: (response, meta, arg) => response
        })
    }),
})

// auto-generated based on the defined endpoints
export const {useGetUsersQuery, useCreateUserMutation} = userApi

export default userApi;