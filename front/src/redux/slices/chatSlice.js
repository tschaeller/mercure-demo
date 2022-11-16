import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    currentRoom: undefined,
    messages: {}
};

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        joinRoom: (state, action) => {
            state.currentRoom = action.payload;
        },
        initMessages: (state, action) => {
            state.messages[action.payload.room] = action.payload.messages;
        },
        newMessage: (state, action) => {
            if (!state.messages[action.payload.room]) {
                state.messages[action.payload.room] = [];
            }
            state.messages[action.payload.room].push(action.payload);
        }
    },
});

// Action creators are generated for each case reducer function
export const {joinRoom, newMessage, initMessages} = chatSlice.actions

export default chatSlice;