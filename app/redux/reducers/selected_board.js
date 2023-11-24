import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  selected_board: { id: "shadow", name: "hello", columns: Array(1) },
};

let selected_board_slice = createSlice({
  name: "selected board to show it in Main",
  initialState,
  reducers: {
    select_the_board: (state, action) => {
      state.selected_board = action.payload;
    },
  },
});

export const { select_the_board } = selected_board_slice.actions;
export default selected_board_slice.reducer;
