import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  name: "",
  email: "",
  reward: 0,
  page: 0
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveName: (state, action) => {
      state.name = action.payload;
    },
    saveEmail: (state, action) => {
      state.email = action.payload;
    },
    saveReward: (state, action) => {
      state.reward = action.payload;
    },
  },
});
export default userSlice.reducer;
export const { saveName, saveEmail, saveReward} = userSlice.actions;
export const selectUser = (state) => state.user;