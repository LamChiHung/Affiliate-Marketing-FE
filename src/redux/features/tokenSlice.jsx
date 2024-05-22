import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  token: localStorage.getItem("token"),
};
export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    saveToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    removeToken: (state, action) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});
export default tokenSlice.reducer;
export const { saveToken, removeToken } = tokenSlice.actions;
export const selectToken = (state) => state.token;