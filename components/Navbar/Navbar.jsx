"use client";
//
import "./navbar.css";
// assets
import Image from "next/image";
import plusLogo from "@/public/plus-solid.svg";
import editLogo from "@/public/ellipsis-vertical-solid.svg";
import kanbanLogo from "@/public/bars-solid.svg";
//
import useToggleStore from "@/app/zustand/toggle";
import addBoardsStore from "@/app/zustand/addBoards";

export default function Navbar() {
  const addTask_tg_r = useToggleStore((state) => state.addTask_tg_r);
  const arrOfBoards = addBoardsStore((state) => state.arrOfBoards);
  const selected_board = addBoardsStore((state) => state.selected_board);
  const delete_board_r = addBoardsStore((state) => state.delete_board_r);
  // redux state to toggle add task panel
  return (
    <>
      <nav>
        <div id="Navbar-s1">
          <div className="flex items-center">
            <Image src={kanbanLogo} alt="img" />
            <span>Kanban</span>
          </div>
          <div id="Navbar-s1-boardName">
            {arrOfBoards[+selected_board]?.name}
          </div>
        </div>
        <div id="Navbar-s2">
          <button
            onClick={() => {
              addTask_tg_r(true);
            }}
            id="Navbar-s2-addBtn"
          >
            <Image src={plusLogo} alt="" className="h-[1rem] w-[1rem]" />
            <span>Add New Task</span>
          </button>
          <button>
            <Image src={editLogo} alt="" className="h-[2.5rem] w-[3rem]" />
            <div className=" absolute flex flex-col items-start px-[1rem] space-y-3 w-[10rem] h-[5rem] translate-x-[-10rem] translate-y-[1rem] bg-d_component rounded-xl">
              <div>Edit board</div>
              <div
                onClick={() => {
                  delete_board_r();
                }}
                className="text-red-500"
              >
                Delete board
              </div>
            </div>
          </button>
        </div>
      </nav>
    </>
  );
}
