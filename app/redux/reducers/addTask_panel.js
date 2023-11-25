import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  toggle_addTask: false,
};

let addTask_panel_slice = createSlice({
  name: "toggle add task panel",
  initialState,
  reducers: {
    toggle_addTask_f: (state, action) => {
      state.toggle_addTask = action.payload;
    },
  },
});

export const { toggle_addTask_f } = addTask_panel_slice.actions;
export default addTask_panel_slice.reducer;
