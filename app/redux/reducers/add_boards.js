import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  arrOfBoards: [],

  newBoard: {
    id: "",
    name: "",
    columns: [],
  },
  selected_board_id: "",
};

let add_boards_slice = createSlice({
  name: "create new board",
  initialState,
  reducers: {
    add_board_reducer: (state) => {
      state.arrOfBoards.push(state.newBoard);
    },
    edit_newBoard_name: (state, action) => {
      state.newBoard.name = action.payload;
    },
    edit_newBoard_id: (state, action) => {
      state.newBoard.id = action.payload;
    },
    edit_newBoard_columns: (state, action) => {
      state.newBoard.columns = action.payload;
    },
    update_board: (state, action) => {
      const updatedArrOfBoards = state.arrOfBoards.map((board) => {
        return board.id == state.selected_board_id
          ? (board = action.payload)
          : board;
      });

      state.arrOfBoards = updatedArrOfBoards;
    },
    edit_selected_board_id: (state, action) => {
      state.selected_board_id = action.payload;
    },
  },
});

export const {
  add_board_reducer,
  edit_newBoard_name,
  edit_newBoard_id,
  edit_newBoard_columns,
  update_board,
  edit_selected_board_id,
} = add_boards_slice.actions;
export default add_boards_slice.reducer;
