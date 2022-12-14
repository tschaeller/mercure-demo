import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const chatApi = createApi({
    reducerPath: 'chatApi',
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_API_ENTRYPOINT}),
    endpoints: (builder) => ({
        getMessages: builder.query({query: (room) => `/chat?room=${room}`}),
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
export const {usePostMessageMutation, useGetMessagesQuery} = chatApi

export default chatApi;