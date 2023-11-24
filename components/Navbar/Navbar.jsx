"use client";
// !redux
import { useDispatch, useSelector } from "react-redux";
//
import "./navbar.css";
// assets
import Image from "next/image";
import plusLogo from "@/public/plus-solid.svg";
import editLogo from "@/public/ellipsis-vertical-solid.svg";
import kanbanLogo from "@/public/bars-solid.svg";
//

export default function Navbar() {
  let selected_board = useSelector(
    (state) => state.selected_board.selected_board
  );
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
          <button id="Navbar-s2-addBtn">
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
