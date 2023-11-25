"use client";
// ! redux
import { useDispatch, useSelector } from "react-redux";
import { toggle_createBoard_f } from "@/app/redux/reducers/createBoard";
import { select_the_board } from "@/app/redux/reducers/add_boards";
// style
import "./menubar.css";
import { motion } from "framer-motion";
// hooks
import { useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";
// assets
import Image from "next/image";
import layoutLogo from "@/public/bx-layout.svg";
import sunLogo from "@/public/sun-regular.svg";
import moonLogo from "@/public/moon-solid.svg";
import hideLogo from "../../public/eye-slash-regular.svg";
import showLogo from "../../public/eye-regular.svg";

/*=======================================================================================*/
// component section
/*=======================================================================================*/

export default function Menubar() {
  let [showMenuBar, setShowMenuBar] = useState(false);
  let dispatch = useDispatch();
  let arrOfBoards = useSelector((state) => state.add_boards.arrOfBoards);
  useEffect(() => {}, [arrOfBoards]);
  return (
    <>
      <motion.aside animate={{ x: showMenuBar ? "-20rem" : 0 }}>
        <div id="Menubar-s1">
          <div className="pl-[1rem]">
            ALL BOARDS <span>(2)</span>
          </div>
          <Boards />
          <button
            onClick={() => dispatch(toggle_createBoard_f(true))}
            className="border-2 border-red-500 py-[1rem] hover:bg-white"
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

  return (
    <div id="ToggleMode">
      <Image src={sunLogo} alt="logo" />
      <motion.button
        onClick={() => setQ(!q)}
        transition={{ duration: 0.1, type: "spring" }}
        animate={{ paddingLeft: !q ? "30px" : "5px" }}
      >
        <div></div>
      </motion.button>
      <Image src={moonLogo} alt="logo" />
    </div>
  );
};

/*=======================================================================================*/

let Boards = () => {
  // let arrOfBoard = ["platform", "marketing plan", "roadmap"];
  let dispatch = useDispatch();
  let arrOfBoards = useSelector((state) => state.add_boards.arrOfBoards);
  let selected_board = useSelector((state) => state.add_boards.selected_board);
  let toggle_addTask = useSelector(
    (state) => state.toggle_addTask.toggle_addTask
  );
  useLayoutEffect(() => {
    let boardsLabel = document.querySelectorAll(
      "aside ul li input[type='radio'] ~ label"
    );
    // boardsLabel[0].click();
    console.log(arrOfBoards);
    console.log("Menubar updated");
    console.log("check this arr of boards");
    console.log(arrOfBoards);
    console.log("check this selected board");
    console.log(selected_board);
    // ! api
    // toggle_createBoard
  }, [arrOfBoards]);
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
                onClick={() => {
                  dispatch(select_the_board(e));
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
