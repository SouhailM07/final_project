import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  toggle_createBoard: false,
};

let createBoard_slice = createSlice({
  name: "toggle create board",
  initialState,
  reducers: {
    toggle_createBoard_f: (state, action) => {
      state.toggle_createBoard = action.payload;
    },
  },
});

export const { toggle_createBoard_f } = createBoard_slice.actions;
export default createBoard_slice.reducer;
