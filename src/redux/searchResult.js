import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchArray: [],
    searchLocation: "Москва",
    searchDate: new Date(),
  },
  reducers: {
    setSearchArr: (state, action) => {
      state.searchArray = action.payload;
      if (action.payload.length > 0) {
        state.searchLocation = action.payload[0].location;
        state.searchDate = action.payload[0].checkIn;
      }
    },
    clearArray: (state) => {
      state.searchArray = [];
    },
    changeSearchItemFav: (state, action) => {
      const index = state.searchArray.findIndex(
        (item) => action.payload.id === item.id
      );
      if (index >= 0) {
        const updatedObject = {
          ...state.searchArray[index],
          isFav: action.payload.isFav,
        };
        state.searchArray = [
          ...state.searchArray.slice(0, index),
          updatedObject,
          ...state.searchArray.slice(index + 1),
        ];
      }
    },
  },
});

export const {
  setSearchArr,
  clearArray,
  changeSearchItemFav,
} = searchSlice.actions;

export default searchSlice.reducer;
