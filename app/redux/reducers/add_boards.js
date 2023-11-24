import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  arrOfBoards: [
    {
      id: "shadow",
      name: "hello",
      columns: [
        {
          input: "Todo",
          tasks: [
            {
              taskName: "testing this task",
              description:
                "hello how are you am under the water please help me",
              subtasks: [],
            },
          ],
        },
        {
          input: "Doing",
          tasks: [
            {
              taskName: "testing this task",
              description:
                "hello how are you am under the water please help me",
              subtasks: [],
            },
          ],
        },
      ],
    },
  ],
  newBoard: {
    id: "",
    name: "",
    columns: [],
  },
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
  },
});

export const {
  add_board_reducer,
  edit_newBoard_name,
  edit_newBoard_id,
  edit_newBoard_columns,
} = add_boards_slice.actions;
export default add_boards_slice.reducer;
