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
  return (
    <>
      <div className=" absolute flex flex-col items-start px-[1rem] space-y-3 w-[10rem] h-[5rem] translate-x-[-10rem] translate-y-[1rem] bg-d_component rounded-xl">
        <button>Edit board</button>
        <button
          onClick={() => {
            // delete_board_r();
          }}
          className="text-red-500"
        >
          Delete board
        </button>
      </div>
    </>
  );
}
