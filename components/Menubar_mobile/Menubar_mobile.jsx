"use client";
// style
import "./menubar_mobile.css";
// assets
import Image from "next/image";
import layoutLogo from "@/public/bx-layout.svg";
// components
import { ToggleMode } from "..";
// zustand
import useToggleStore from "@/app/zustand/toggle";
import addBoardsStore from "@/app/zustand/addBoards";

export default function Menubar_mobile() {
  const arrOfBoards = addBoardsStore((state) => state.arrOfBoards);
  const selected_board = addBoardsStore((state) => state.selected_board);
  const select_the_board = addBoardsStore((state) => state.select_the_board);
  const createBoard_tg_r = useToggleStore((state) => state.createBoard_tg_r);
  const menubar_mobile_tg_r = useToggleStore(
    (state) => state.menubar_mobile_tg_r
  );
  return (
    <>
      <div
        id="Menubar_mobile"
        className="Panel right-0 translate-y-[5rem] block px-[1rem]"
      >
        <div
          onClick={() => {
            menubar_mobile_tg_r(false);
          }}
          className="Panel-transparentBackground"
        ></div>
        <div className="Panel-container m-auto mt-[3rem] ">
          <div className="pl-[1rem] text-[1.3rem] text-grayishText">
            ALL BOARDS <span> ({arrOfBoards.length}) </span>
          </div>
          <ul>
            {arrOfBoards.map((e, i) => {
              return (
                <li key={i}>
                  <input
                    type="radio"
                    id={e.id}
                    name="projects"
                    className="hidden"
                  />

                  <label
                    htmlFor={e.id}
                    // ! you were looking for this
                    onClick={() => {
                      select_the_board(i);
                      console.log("check this selected board");
                      console.log(e);
                    }}
                    // e.name -> api
                  >
                    <Image src={layoutLogo} alt="logo" />
                    <span>{e?.name}</span>
                  </label>
                </li>
              );
            })}
          </ul>
          <button
            id="createBtn_mobile"
            onClick={() => {
              createBoard_tg_r(true);
            }}
            className=" py-[1rem] hover:dark:bg-white hover:bg-l_body my-[1rem] rounded-r-full"
          >
            <Image src={layoutLogo} alt="img" />
            <span>Create New Board</span>
          </button>
          <ToggleMode />
        </div>
      </div>
    </>
  );
}
