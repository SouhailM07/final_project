import { configureStore } from "@reduxjs/toolkit";
import createBoard from "./reducers/createBoard";
import add_boards from "./reducers/add_boards";
import selected_board from "./reducers/selected_board";

let store = configureStore({
  reducer: {
    toggle_createBoard: createBoard,
    add_boards: add_boards,
    selected_board: selected_board,
  },
});

export default store;
