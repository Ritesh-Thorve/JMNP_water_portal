import { createSlice } from "@reduxjs/toolkit"

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState: {
    admin: null,
  },
  reducers: {
    loginAdmin: (state, action) => {
      state.admin = action.payload
    },
    logoutAdmin: (state) => {
      state.admin = null
    },
  },
})

export const { loginAdmin, logoutAdmin } = adminAuthSlice.actions
export default adminAuthSlice.reducer
