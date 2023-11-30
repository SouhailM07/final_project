import { create } from "zustand";

const useToggleStore = create((set) => ({
  addTask_tg: false,
  createBoard_tg: false,
  taskPanel_tg: false,
  board_settings_tg: false,
  task_settings_tg: false,
  delete_panel_alert_tg: false,
  deleteTask_panel_tg: false,
  updateBoard_panel_tg: false,
  updateTask_panel_tg: false,
  darkMode_tg: false,
  createBoard_tg_r: (st) => set((state) => ({ createBoard_tg: st })),
  addTask_tg_r: (st) => set((state) => ({ addTask_tg: st })),
  taskPanel_tg_r: (st) => set((state) => ({ taskPanel_tg: st })),
  board_settings_tg_r: () =>
    set((state) => ({ board_settings_tg: !state.board_settings_tg })),
  delete_panel_alert_tg_r: (st) =>
    set((state) => ({ delete_panel_alert_tg: st })),
  deleteTask_panel_tg_r: (st) => set((state) => ({ deleteTask_panel_tg: st })),
  task_settings_tg_r: (st) =>
    set((state) => ({ task_settings_tg: !state.task_settings_tg })),
  updateBoard_panel_tg_r: (st) =>
    set((state) => ({ updateBoard_panel_tg: st })),
  updateTask_panel_tg_r: (st) => set((state) => ({ updateTask_panel_tg: st })),
  darkMode_tg_r: () => set((state) => ({ darkMode_tg: !state.darkMode_tg })),
}));

export default useToggleStore;
