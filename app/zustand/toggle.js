import { create } from "zustand";

const useToggleStore = create((set) => ({
  addTask_tg: false,
  createBoard_tg: false,
  taskPanel_tg: false,
  board_settings_tg: false,
  createBoard_tg_r: (st) => set((state) => ({ createBoard_tg: st })),
  addTask_tg_r: (st) => set((state) => ({ addTask_tg: st })),
  taskPanel_tg_r: (st) => set((state) => ({ taskPanel_tg: st })),
  board_settings_tg_r: (st) => set((state) => ({ board_settings_tg: st })),
}));

export default useToggleStore;
