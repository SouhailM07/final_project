import { create } from "zustand";
import { persist } from "zustand/middleware";

let addBoardsStore = create((set) => ({
  // ===============
  // states
  // ===============
  arrOfBoards: [],
  newBoard: {
    id: "",
    name: "",
    columns: [],
  },
  selected_board: "",
  newTask: {
    taskName: "",
    description: "",
    subtasks: [],
    ColumnIndex: 0,
  },
  selected_task_column: "",
  selected_task: "",
  // ===============
  //  ! reducers
  // ===============
  // todo ===================================================================================
  // todo : adding new board reducers
  // todo ==============================================================================
  edit_newBoard_name_r: (st) =>
    set((state) => ({
      newBoard: {
        ...state.newBoard,
        name: st,
      },
    })),
  edit_newBoard_id_r: (st) =>
    set((state) => ({
      newBoard: {
        ...state.newBoard,
        id: st,
      },
    })),
  edit_newBoard_columns_r: (st) =>
    set((state) => ({
      newBoard: {
        ...state.newBoard,
        columns: st,
      },
    })),
  add_newBoard: () =>
    set((state) => {
      const updated_arrOfBoards = [...state.arrOfBoards, state.newBoard];
      return {
        arrOfBoards: updated_arrOfBoards,
        newBoard: {
          id: "",
          name: "",
          columns: "",
        },
      };
    }),
  select_the_board: (Index) => set((state) => ({ selected_board: Index })),
  // ===================================================================================
  // todo : adding new task reducers
  // ===================================================================================
  edit_newTask_name_r: (st) =>
    set((state) => ({
      newTask: {
        ...state.newTask,
        taskName: st,
      },
    })),
  edit_newTask_description_r: (st) =>
    set((state) => ({
      newTask: {
        ...state.newTask,
        description: st,
      },
    })),
  edit_newTask_subtasks_r: (st) =>
    set((state) => ({
      newTask: {
        ...state.newTask,
        subtasks: st,
      },
    })),
  edit_newTask_index_r: (st) =>
    set((state) => ({
      newTask: {
        ...state.newTask,
        ColumnIndex: st,
      },
    })),
  add_newTask_r: () =>
    set((state) => {
      let boardIndex = +state.selected_board;
      let taskIndex = +state.newTask.ColumnIndex;
      let board = state.arrOfBoards[boardIndex];
      let column = board?.columns[taskIndex];

      if (board && column) {
        let newTasks = [...column.tasks, state.newTask];

        let newColumns = board.columns.map((col, index) =>
          index === taskIndex ? { ...col, tasks: newTasks } : col
        );

        let newBoard = { ...board, columns: newColumns };
        let newBoards = state.arrOfBoards.map((b, index) =>
          index === boardIndex ? newBoard : b
        );

        return {
          ...state,
          arrOfBoards: newBoards,
          newTask: {
            taskName: "",
            description: "",
            subtasks: [],
            ColumnIndex: 0,
          },
        };
      } else {
        return state;
      }
    }),
  // todo ===================================================================================
  // todo : deleting reducers
  // todo ==============================================================================
  delete_board_r: () =>
    set((state) => {
      const updated_arrOfBoards = state.arrOfBoards.filter((e, i) => {
        return i != +state.selected_board;
      });
      return {
        arrOfBoards: updated_arrOfBoards,
      };
    }),
  delete_task_r: () =>
    set((state) => {
      const selectedBoardIndex = +state.selected_board;
      const selectedTaskColumnIndex = +state.selected_task_column;
      const selectedTaskIndex = +state.selected_task;

      // Copy the existing state
      const updatedArrOfBoards = [...state.arrOfBoards];

      // Get the selected board
      const selectedBoard = updatedArrOfBoards[selectedBoardIndex];

      // Get the selected column
      const selectedColumn = selectedBoard.columns[selectedTaskColumnIndex];

      // Filter out the selected task from the column's tasks
      const updatedTasks = selectedColumn.tasks.filter(
        (task, i) => i !== selectedTaskIndex
      );

      // Create a new column with the updated tasks
      const updatedColumn = { ...selectedColumn, tasks: updatedTasks };

      // Create a new board with the updated column
      const updatedBoard = {
        ...selectedBoard,
        columns: selectedBoard.columns.map((col, index) =>
          index === selectedTaskColumnIndex ? updatedColumn : col
        ),
      };

      // Update the selected board in the array of boards
      updatedArrOfBoards[selectedBoardIndex] = updatedBoard;

      return {
        arrOfBoards: updatedArrOfBoards,
        selected_task_column: 0,
        selected_task: 0,
      };
    }),

  // todo ===================================================================================
  // todo : selected task reducers
  // todo ==============================================================================
  selected_task_r: (st) => set((state) => ({ selected_task: st })),
  selected_task_column_r: (st) =>
    set((state) => ({ selected_task_column: st })),
  // todo ===================================================================================
  // todo : updating  board reducers
  // todo ==============================================================================
  updateBoard_r: () =>
    set((state) => {
      const { selected_board, newBoard } = state;

      if (selected_board !== null && selected_board !== undefined) {
        const updated_arrOfBoards = [...state.arrOfBoards];
        updated_arrOfBoards[selected_board] = newBoard;

        return {
          arrOfBoards: updated_arrOfBoards,
          newBoard: {
            id: "",
            name: "",
            columns: [],
          },
        };
      }

      return state;
    }),
}));

// making this store like localStorage
// addBoardsStore = persist(addBoardsStore);

export default addBoardsStore;
