import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  news: [],
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setNews: (state, action) => {
      state.news = action.payload;
    },
    addNews: (state, action) => {
      state.news.unshift(action.payload);
    },
    updateNews: (state, action) => {
      const index = state.news.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.news[index] = action.payload;
      }
    },
    deleteNews: (state, action) => {
      state.news = state.news.filter((item) => item.id !== action.payload);
    },
  },
});

export const { setNews, addNews, updateNews, deleteNews } = newsSlice.actions;

export default newsSlice.reducer;
