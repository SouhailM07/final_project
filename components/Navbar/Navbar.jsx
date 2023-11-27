"use client";
// !redux
import { useSelector } from "react-redux";
//
import "./navbar.css";
// assets
import Image from "next/image";
import plusLogo from "@/public/plus-solid.svg";
import editLogo from "@/public/ellipsis-vertical-solid.svg";
import kanbanLogo from "@/public/bars-solid.svg";
//
import useToggleStore from "@/app/zustand/toggle";

export default function Navbar() {
  const addTask_tg = useToggleStore((state) => state.addTask_tg);
  const addTask_tg_r = useToggleStore((state) => state.addTask_tg_r);
  let selected_board = useSelector((state) => state.add_boards.selected_board);
  // redux state to toggle add task panel
  return (
    <>
      <nav>
        <div id="Navbar-s1">
          <div className="flex items-center">
            <Image src={kanbanLogo} alt="img" />
            <span>Kanban</span>
          </div>
          <div id="Navbar-s1-boardName">{selected_board.name}</div>
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
          </button>
        </div>
      </nav>
    </>
  );
}
