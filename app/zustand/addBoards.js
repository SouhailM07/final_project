import { create } from "zustand";

const addBoardsStore = create((set) => ({
  arrOfBoards: [],
  newBoard: {
    id: "",
    name: "",
    columns: [],
  },
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
}));

export default addBoardsStore;
