import { configureStore } from "@reduxjs/toolkit";
import createBoard from "./reducers/createBoard";

let store = configureStore({
  reducer: {
    toggle_createBoard: createBoard,
  },
});

export default store;
