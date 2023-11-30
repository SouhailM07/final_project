"use client";
// ! redux
// style
import "./menubar.css";
import { motion } from "framer-motion";
// hooks
import { useState } from "react";
import axios from "axios";
// assets
import Image from "next/image";
import layoutLogo from "@/public/bx-layout.svg";
import sunLogo from "@/public/sun-regular.svg";
import moonLogo from "@/public/moon-solid.svg";
import hideLogo from "../../public/eye-slash-regular.svg";
import showLogo from "../../public/eye-regular.svg";

import useToggleStore from "@/app/zustand/toggle";
import addBoardsStore from "@/app/zustand/addBoards";
/*=======================================================================================*/
// component section
/*=======================================================================================*/

export default function Menubar() {
  let [showMenuBar, setShowMenuBar] = useState(false);

  //
  const createBoard_tg_r = useToggleStore((state) => state.createBoard_tg_r);
  const arrOfBoards = addBoardsStore((state) => state.arrOfBoards);
  //
  return (
    <>
      <motion.aside animate={{ x: showMenuBar ? "-20rem" : 0 }}>
        <div id="Menubar-s1">
          <div className="pl-[1rem]">
            ALL BOARDS <span>({arrOfBoards.length})</span>
          </div>
          <Boards />
          <button
            onClick={() => {
              createBoard_tg_r(true);
            }}
            className="border-2 border-red-500 py-[1rem] hover:dark:bg-white hover:bg-l_body rounded-r-full"
          >
            <Image src={layoutLogo} alt="img" />
            <span>Create New Board</span>
          </button>
        </div>
        {/*  */}
        <div id="Menubar-s2">
          <ToggleMode />
          <div>hide SideBar</div>
        </div>
      </motion.aside>
    </>
  );
}

/*=======================================================================================*/
// small component section
/*=======================================================================================*/

let ToggleMode = () => {
  let [q, setQ] = useState(false);
  const darkMode_tg = useToggleStore((state) => state.darkMode_tg);
  const darkMode_tg_r = useToggleStore((state) => state.darkMode_tg_r);
  let toggleTheme = () => {
    document.documentElement.className = darkMode_tg ? "dark" : "light";
  };

  return (
    <div id="ToggleMode">
      <Image src={sunLogo} alt="logo" />
      <motion.button
        onClick={() => {
          darkMode_tg_r();
          toggleTheme();
        }}
        transition={{ duration: 0.1, type: "spring" }}
        animate={{ paddingLeft: darkMode_tg ? "30px" : "5px" }}
      >
        <div></div>
      </motion.button>
      <Image src={moonLogo} alt="logo" />
    </div>
  );
};

/*=======================================================================================*/

let Boards = () => {
  //
  const arrOfBoards = addBoardsStore((state) => state.arrOfBoards);
  const select_the_board = addBoardsStore((state) => state.select_the_board);
  //
  return (
    <>
      <ul id="Boards">
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
                <span>{e.name}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </>
  );
};
