"use client";
import "./menubar.css";
import { motion } from "framer-motion";
// hooks
import { useState, useEffect } from "react";
// assets
import Image from "next/image";
import layoutLogo from "@/public/bx-layout.svg";
import sunLogo from "@/public/sun-regular.svg";
import moonLogo from "@/public/moon-solid.svg";
import hideLogo from "../../public/eye-slash-regular.svg";
import showLogo from "../../public/eye-regular.svg";

export default function Menubar() {
  let [showMenuBar, setShowMenuBar] = useState(false);
  let showBtn = ["showMenuBar", ""];
  return (
    <>
      <motion.aside animate={{ x: showMenuBar ? "-20rem" : 0 }}>
        <div id="Menubar-s1">
          <div className="pl-[1rem]">
            ALL BOARDS <span>(2)</span>
          </div>
          <Boards />
          <button>
            <Image src={layoutLogo} alt="img" />
            <span>Create New Board</span>
          </button>
        </div>
        {/*  */}
        <div id="Menubar-s2">
          <ToggleMode />
          <div
            className={`border-2 py-[1rem] rounded-full bg-d_component ${
              showBtn[+showMenuBar]
            }`}
          >
            {!showMenuBar ? (
              <span>
                <Image
                  src={showLogo}
                  alt="logo"
                  className="h-[1rem] w-[1rem]"
                />
              </span>
            ) : (
              <span>
                <Image
                  src={hideLogo}
                  alt="logo"
                  className="h-[1rem] w-[1rem]"
                />
              </span>
            )}
          </div>
        </div>
      </motion.aside>
    </>
  );
}

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

let Boards = () => {
  let arrOfBoard = ["platform", "marketing plan", "roadmap"];
  useEffect(() => {
    let boards = document.querySelectorAll(
      "aside ul li input[type='radio'] ~ label"
    );
    boards[0].click();
  }, []);
  return (
    <>
      <ul className="font-bold capitalize text-white">
        {arrOfBoard.map((e, i) => {
          return (
            <li key={i}>
              <input type="radio" id={e} name="projects" className="hidden" />
              <label htmlFor={e}>
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
