import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  page: 1,
  maxPage: 1,
  formDisplay: "none",
  links: []
};
export const linkSlice = createSlice({
  name: "link",
  initialState,
  reducers: {
    savePage: (state, action) => {
      state.page = action.payload;
    },
    saveMaxPage: (state, action) => {
      state.maxPage = action.payload;
    },
    saveFormDisplay: (state, action) => {
      state.formDisplay = action.payload;
    },
    saveLinks: (state, action) => {
      state.links = action.payload;
    },
  },
});
export default linkSlice.reducer;
export const { savePage, saveMaxPage, saveFormDisplay, saveLinks } = linkSlice.actions;
export const selectLink = (state) => state.link;