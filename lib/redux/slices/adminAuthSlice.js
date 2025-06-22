import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  adminData: null,
};

const adminAuthSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    loginAdmin(state, action) {
      state.isLoggedIn = true;
      state.adminData = action.payload;
    },
    logoutAdmin(state) {
      state.isLoggedIn = false;
      state.adminData = null;
    },
  },
});

export const { loginAdmin, logoutAdmin } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
