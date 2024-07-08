import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: [],
    user:{}
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser(state, action) {
            state.users.push(action.payload);
        },
        setUser(state,action) {
            state.user = action.payload;
        }
    },
});

export const { addUser, setUser , setError } = userSlice.actions;

// Selectors
export const selectUsers = (state) => state.user.users;
export const currentUser = (state) => state.user.user;

export default userSlice.reducer;