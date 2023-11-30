"use client";
// hooks
import { useState } from "react";
// style
import "./boardsetting_panel.css";
// ! zustand
import addBoardsStore from "@/app/zustand/addBoards";
import useToggleStore from "@/app/zustand/toggle";

export default function BoardSetting_panel() {
  const delete_board_r = addBoardsStore((state) => state.delete_board_r);
  const delete_panel_alert_tg_r = useToggleStore(
    (state) => state.delete_panel_alert_tg_r
  );
  const updateBoard_panel_tg_r = useToggleStore(
    (state) => state.updateBoard_panel_tg_r
  );

  return (
    <>
      <div id="BoardSetting_panel">
        <button
          onClick={() => {
            updateBoard_panel_tg_r(true);
          }}
        >
          Edit board
        </button>
        <button
          onClick={() => {
            delete_panel_alert_tg_r(true);
          }}
          className="text-red-500"
        >
          Delete board
        </button>
      </div>
    </>
  );
}
