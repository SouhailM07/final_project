"use client";
// ! redux
import { useDispatch, useSelector } from "react-redux";
import { toggle_createBoard_f } from "@/app/redux/reducers/createBoard";
// style
import "./menubar.css";
import { motion } from "framer-motion";
// hooks
import { useState, useEffect } from "react";
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
  let arrOfBoard = ["platform", "marketing plan", "roadmap"];
  let toggle_createBoard = useSelector(
    (state) => state.toggle_createBoard.toggle_createBoard
  );
  useEffect(() => {
    let boardsLabel = document.querySelectorAll(
      "aside ul li input[type='radio'] ~ label"
    );
    boardsLabel[0].click();
    // ! api
    // toggle_createBoard
  }, []);
  return (
    <>
      <ul id="Boards">
        {arrOfBoard.map((e, i) => {
          return (
            <li key={i}>
              <input type="radio" id={e} name="projects" className="hidden" />

              <label
                htmlFor={e}
                // e.name -> api
              >
                <Image src={layoutLogo} alt="logo" />
                <span>{e}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </>
  );
};
