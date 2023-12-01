"use client";
// style
import "./togglemode.css";
//
import { motion } from "framer-motion";
// assets
import Image from "next/image";
import sunLogo from "@/public/sun-regular.svg";
import moonLogo from "@/public/moon-solid.svg";
// zustand
import useToggleStore from "@/app/zustand/toggle";

export default function ToggleMode() {
  const darkMode_tg = useToggleStore((state) => state.darkMode_tg);
  const darkMode_tg_r = useToggleStore((state) => state.darkMode_tg_r);
  let toggleTheme = () => {
    document.documentElement.className = !darkMode_tg ? "dark" : "light";
  };

  return (
    <div className="ToggleMode">
      <Image src={sunLogo} alt="logo" />
      <motion.button
        onClick={() => {
          toggleTheme();
          darkMode_tg_r();
        }}
        transition={{ duration: 0.1, type: "spring" }}
        animate={{ paddingLeft: darkMode_tg ? "30px" : "5px" }}
      >
        <div></div>
      </motion.button>
      <Image src={moonLogo} alt="logo" />
    </div>
  );
}
