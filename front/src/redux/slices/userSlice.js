import {createSlice} from '@reduxjs/toolkit';
import {getUsernameFromCookie} from "../../services/userService";

const storedUsername = getUsernameFromCookie();

const initialState = {
    user: (storedUsername ? storedUsername : undefined),
    userList: []
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        create: (state, action) => {
            state.user = action.payload;
        },
        newUser: (state, action) => {
            state.userList.push({username: action.payload});
        },
        initUsers: (state, action) => {
            state.userList = action.payload;
        }
    },
});

// Action creators are generated for each case reducer function
export const {create, newUser, initUsers} = userSlice.actions

export default userSlice;