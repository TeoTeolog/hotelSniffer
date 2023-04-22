import { createSlice } from "@reduxjs/toolkit";

export const favSlice = createSlice({
  name: "favorites",
  initialState: {
    favArray: [],
    sortedBy: {
      type: "rate", //rate || price
      direct: true, //true - up || false - down
    },
  },
  reducers: {
    sortFavBy: (state, action) => {
      if (action.payload.type === "rate") {
        if (action.payload.direct)
          state.favArray.sort((a, b) => {
            return a.stars < b.stars;
          });
        if (!action.payload.direct)
          state.favArray.sort((a, b) => {
            return a.stars > b.stars;
          });
      }
      if (action.payload.type === "price") {
        if (action.payload.direct)
          state.favArray.sort((a, b) => {
            return a.priceFrom < b.priceFrom;
          });

        if (!action.payload.direct)
          state.favArray.sort((a, b) => {
            return a.priceFrom > b.priceFrom;
          });
      }
      state.sortedBy.direct = action.payload.direct;
      state.sortedBy.type = action.payload.type;
    },
    addItem: (state, action) => {
      state.favArray.push({ ...action.payload, isFav: true });
      sortFavBy(state.sortedBy);
    },
    deleteItem: (state, action) => {
      state.favArray = state.favArray.filter(
        (item) => item.id !== action.payload
      );
    },
    clearFav: (state) => {
      state.favArray = [];
      state.sortedBy = "rate";
    },
  },
});

export const { addItem, deleteItem, sortFavBy } = favSlice.actions;

export default favSlice.reducer;
