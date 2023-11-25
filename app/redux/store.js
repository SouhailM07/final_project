import { configureStore } from "@reduxjs/toolkit";
// ! reducers
import createBoard from "./reducers/createBoard";
import add_boards from "./reducers/add_boards";
import selected_board from "./reducers/selected_board";
import addTask_panel from "./reducers/addTask_panel";

let store = configureStore({
  reducer: {
    toggle_createBoard: createBoard,
    add_boards: add_boards,
    selected_board: selected_board,
    toggle_addTask: addTask_panel,
  },
});

export default store;
