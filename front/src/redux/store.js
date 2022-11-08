import {configureStore} from '@reduxjs/toolkit'
import {userSlice} from "./slices/userSlice";
import {userApi} from "./api/userApi";
import chatApi from "./api/chatApi";
import chatSlice from "./slices/chatSlice";

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        chat: chatSlice.reducer,
        userApi: userApi.reducer,
        chatApi: chatApi.reducer,
        middleware: {
            userApiMiddleware: userApi.middleware,
            chatApiMiddleware: chatApi.middleware,
        }
    },
})