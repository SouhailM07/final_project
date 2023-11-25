import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  selected_board: "",
  newTask: {
    taskName: "",
    description: "",
    subtasks: [],
  },
  task_index: 0,
};

let selected_board_slice = createSlice({
  name: "selected board to show it in Main",
  initialState,
  reducers: {
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
      // ! need to make a way to select the columns and push this one to it
      // * push the subtask to newTask
      // * push the newTask to the selected task column[index of select].tasks
    },
  },
});

export const {
  select_the_board,
  edit_description,
  edit_subtasks,
  edit_taskName,
  add_newTask_reducer,
  edit_tasks_index,
} = selected_board_slice.actions;
export default selected_board_slice.reducer;
