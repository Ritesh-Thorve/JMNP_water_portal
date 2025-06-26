import { configureStore } from '@reduxjs/toolkit'
import adminAuthReducer from './slices/adminAuthSlice'
import newsReducer from './slices/newsSlice'


export const store = configureStore({
  reducer: {
    adminAuth: adminAuthReducer,
    news: newsReducer,
  }
})

export default store;