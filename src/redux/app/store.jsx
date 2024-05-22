import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "../features/tokenSlice"
import userReducer from "../features/userSlice"
import linkReducer from "../features/linkSlice"

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    user: userReducer,
    link: linkReducer
  },
});

export default store;