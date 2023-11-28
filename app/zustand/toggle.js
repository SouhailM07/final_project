import { create } from "zustand";

const useToggleStore = create((set) => ({
  addTask_tg: false,
  createBoard_tg: false,
  taskPanel_tg: false,
  board_settings_tg: false,
  delete_panel_alert_tg: false,
  createBoard_tg_r: (st) => set((state) => ({ createBoard_tg: st })),
  addTask_tg_r: (st) => set((state) => ({ addTask_tg: st })),
  taskPanel_tg_r: (st) => set((state) => ({ taskPanel_tg: st })),
  board_settings_tg_r: () =>
    set((state) => ({ board_settings_tg: !state.board_settings_tg })),
  delete_panel_alert_tg_r: (st) =>
    set((state) => ({ delete_panel_alert_tg: st })),
}));

export default useToggleStore;
