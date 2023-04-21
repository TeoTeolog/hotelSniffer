import { createSlice } from "@reduxjs/toolkit";

export const favSlice = createSlice({
  name: "favorites",
  initialState: {
    favArray: [],
    sortedBy: "rate", //rate || price
  },
  reducers: {
    addItem: (state, action) => {
      state.favArray.push({ ...action.payload, isFav: true });
    },
    deleteItem: (state, action) => {
      state.favArray = state.favArray.filter(
        (item) => item.id !== action.payload
      );
    },
    sortByRate: (state) => {
      state.favArray.sort((a, b) => {
        return a.stars > b.stars;
      });
      state.sortedBy = "rate";
    },
    sortByPrice: (state) => {
      state.favArray.sort((a, b) => {
        return a.priceFrom > b.priceFrom;
      });
      state.sortedBy = "price";
    },
    clearFav: (state) => {
      state.favArray = [];
      state.sortedBy = "rate";
    },
  },
});

export const {
  addItem,
  deleteItem,
  sortByRate,
  sortByPrice,
} = favSlice.actions;

export default favSlice.reducer;
