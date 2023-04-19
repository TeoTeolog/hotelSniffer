import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
    email: "",
  },
  reducers: {
    logIn: (state, action) => {
      state.isAuthenticated = true;
      state.email = action.payload;
    },
    logOut: (state) => {
      state.isAuthenticated = false;
      state.email = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { logIn, logOut } = userSlice.actions;

export default userSlice.reducer;
