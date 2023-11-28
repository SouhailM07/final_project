import { create } from "zustand";

const addBoardsStore = create((set) => ({
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
    index: 0,
  },
  // ===============
  //  ! reducers
  // ===============
  // ===================================================================================
  // todo : adding new board reducers
  // ===================================================================================
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
        index: st,
      },
    })),
  add_newTask_r: () =>
    set((state) => {
      let boardIndex = +state.selected_board;
      let taskIndex = +state.newTask.index;
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
            index: 0,
          },
        };
      } else {
        return state;
      }
    }),
}));

export default addBoardsStore;
