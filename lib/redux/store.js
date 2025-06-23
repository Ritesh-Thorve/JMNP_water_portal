import { configureStore } from '@reduxjs/toolkit'
import adminReducer from './slices/adminAuthSlice'


export const store = configureStore({
  reducer: {
    admin: adminReducer,
  }
})

export default store;