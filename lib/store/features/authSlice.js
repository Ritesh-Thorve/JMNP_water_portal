import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false, // fixed typo
    userData: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logIn: (state, action) => {
            state.isAuthenticated = true;  
            state.userData = action.payload; 
        },
        logOut: (state) => {
            state.isAuthenticated = false;
            state.userData = null;
        }
    }
});

export const { logIn, logOut } = authSlice.actions;  
export default authSlice.reducer;
