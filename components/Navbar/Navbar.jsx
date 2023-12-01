"use client";
// components
import { BoardSetting_panel, Menubar_mobile } from "..";
// style
import "./navbar.css";
// assets
import Image from "next/image";
import plusLogo from "@/public/plus-solid.svg";
import editLogo from "@/public/ellipsis-vertical-solid.svg";
import kanbanLogo from "@/public/bars-solid.svg";
// ! zustand
import useToggleStore from "@/app/zustand/toggle";
import addBoardsStore from "@/app/zustand/addBoards";

export default function Navbar() {
  const addTask_tg_r = useToggleStore((state) => state.addTask_tg_r);
  const arrOfBoards = addBoardsStore((state) => state.arrOfBoards);
  const selected_board = addBoardsStore((state) => state.selected_board);
  const board_settings_tg_r = useToggleStore(
    (state) => state.board_settings_tg_r
  );
  const board_settings_tg = useToggleStore((state) => state.board_settings_tg);
  const menubar_mobile_tg = useToggleStore((state) => state.menubar_mobile_tg);

  // redux state to toggle add task panel
  return (
    <>
      <nav>
        <div id="Navbar-s1">
          <div className="flex xs:w-auto sm:w-[20rem] items-center">
            <Image src={kanbanLogo} alt="img" />
            <SelectBoard_mobile />
            <span className="xs:hidden md:inline">Kanban</span>
          </div>
          <div id="Navbar-s1-boardName">
            {arrOfBoards[selected_board]?.name}
          </div>
        </div>
        <div id="Navbar-s2">
          <button
            onClick={() => {
              addTask_tg_r(true);
            }}
            id="Navbar-s2-addBtn"
          >
            <Image
              src={plusLogo}
              alt=""
              className="h-[1rem] md:w-[1rem] xs:w-[3rem]"
            />
            <span className="xs:hidden md:block">Add New Task</span>
          </button>
          <button>
            <Image
              onClick={() => board_settings_tg_r()}
              src={editLogo}
              alt=""
              className="h-[2.5rem] w-[3rem]"
            />
            {board_settings_tg && <BoardSetting_panel />}
          </button>
        </div>
        {menubar_mobile_tg && <Menubar_mobile />}
      </nav>
    </>
  );
}

let SelectBoard_mobile = () => {
  const arrOfBoards = addBoardsStore((state) => state.arrOfBoards);
  const selected_board = addBoardsStore((state) => state.selected_board);
  const menubar_mobile_tg_r = useToggleStore(
    (state) => state.menubar_mobile_tg_r
  );
  return (
    <>
      <div
        onClick={() => menubar_mobile_tg_r(true)}
        className="text-[1.8rem] font-bold xs:flex md:hidden items-center"
      >
        <button className="mr-[5px]">
          {arrOfBoards[selected_board].name || ""}
        </button>
        <ArrowLogo />
      </div>
    </>
  );
};

let ArrowLogo = () => {
  const menubar_mobile_tg = useToggleStore((state) => state.menubar_mobile_tg);
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        style={{ fill: " #4ADE80" }}
        className={menubar_mobile_tg ? "rotate-0" : "rotate-180"}
      >
        <path d="m6.293 13.293 1.414 1.414L12 10.414l4.293 4.293 1.414-1.414L12 7.586z"></path>
      </svg>
    </>
  );
};
