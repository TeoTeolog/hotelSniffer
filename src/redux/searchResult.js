import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchArray: [],
  },
  reducers: {
    setSearchArr: (state, action) => {
      state.searchArray = action.payload;
    },
    clearArray: (state) => {
      state.searchArray = [];
    },
    changeSearchItemFav: (state, action) => {
      const index = state.searchArray.findIndex(
        (item) => action.payload.id === item.id
      );
      const updatedObject = {
        ...state.searchArray[index],
        isFav: action.payload.isFav,
      };
      state.searchArray = [
        ...state.searchArray.slice(0, index),
        updatedObject,
        ...state.searchArray.slice(index + 1),
      ];
    },
  },
});

export const {
  setSearchArr,
  clearArray,
  changeSearchItemFav,
} = searchSlice.actions;

export default searchSlice.reducer;
