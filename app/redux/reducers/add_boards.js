import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  arrOfBoards: [],
  //
  newBoard: {
    id: "",
    name: "",
    columns: [],
  },
  selected_board_id: "",
  //
  selected_board: "",
  newTask: {
    taskName: "",
    description: "",
    subtasks: [],
  },
  task_index: 0,
  //
  selected_task: "",
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
    update_board: (state) => {
      const updatedArrOfBoards = state.arrOfBoards.map((board) => {
        return board.id == state.selected_board_id
          ? (board = state.selected_board)
          : board;
      });

      state.arrOfBoards = updatedArrOfBoards;
    },
    edit_selected_board_id: (state, action) => {
      state.selected_board_id = action.payload;
    },
    //
    select_the_board: (state, action) => {
      state.selected_board = action.payload;
    },
    edit_taskName: (state, action) => {
      state.newTask.taskName = action.payload;
    },
    edit_description: (state, action) => {
      state.newTask.description = action.payload;
    },
    edit_subtasks: (state, action) => {
      state.newTask.subtasks = action.payload;
    },
    edit_tasks_index: (state, action) => {
      state.task_index = action.payload;
    },
    add_newTask_reducer: (state, action) => {
      // state.newTask.subtasks.push(action.payload);
      state.selected_board.columns[+state.task_index].tasks.push(state.newTask);
      // modify the original selected board in arr of Boards
      state.newTask = {
        taskName: "",
        description: "",
        subtasks: [],
      };
    },
    //
    select_the_task: (state, action) => {
      state.selected_task = action.payload;
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
  select_the_board,
  edit_description,
  edit_subtasks,
  edit_taskName,
  add_newTask_reducer,
  edit_tasks_index,
  //
  select_the_task,
} = add_boards_slice.actions;
export default add_boards_slice.reducer;
