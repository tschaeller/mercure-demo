import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import userSlice from "../slices/userSlice";

export const chatApi = createApi({
    reducerPath: 'chatApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000'}),
    endpoints: (builder) => ({
        postMessage: builder.mutation({
            query: (data) => ({
                url: `/chat`,
                method: `POST`,
                body: {
                    ...data,
                    message: JSON.stringify({
                        type: "message",
                        message: data.message,
                        from: data.from,
                        topic: data.topic
                    })
                },
            }),
            transformResponse: (response, meta, arg) => response
        })
    }),
})

// auto-generated based on the defined endpoints
export const {usePostMessageMutation} = chatApi

export default chatApi;