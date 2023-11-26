import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  toggle_taskPanel: false,
};

let toggle_taskPanel_slice = createSlice({
  name: "toggle selected task Panel",
  initialState,
  reducers: {
    toggle_taskPanel_reducer: (state, action) => {
      state.toggle_selected_task = action.payload;
    },
  },
});

export const { toggle_taskPanel_reducer } = toggle_taskPanel_slice.actions;
export default toggle_taskPanel_slice.reducer;
