import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  toggle_createBoard: false,
  input_boardName: "",
};

let createBoard_slice = createSlice({
  name: "toggle create board",
  initialState,
  reducers: {
    toggle_createBoard_f: (state, action) => {
      state.toggle_createBoard = action.payload;
    },
    adding_boardName: (state, action) => {
      state.input_boardName = action.payload;
    },
  },
});

export const { toggle_createBoard_f, adding_boardName } =
  createBoard_slice.actions;
export default createBoard_slice.reducer;
