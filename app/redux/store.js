import { configureStore } from "@reduxjs/toolkit";
import createBoard from "./reducers/createBoard";
import add_boards from "./reducers/add_boards";

let store = configureStore({
  reducer: {
    toggle_createBoard: createBoard,
    add_boards: add_boards,
  },
});

export default store;
