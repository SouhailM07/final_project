"use client";

import "./toggle_menubar.css";
import useToggleStore from "@/app/zustand/toggle";
//
import Image from "next/image";
import hideLogo from "../../public/eye-slash-regular.svg";
import showLogo from "../../public/eye-regular.svg";

export default function Toggle_menubar() {
  let menubar_hide = useToggleStore((state) => state.menubar_hide);
  let menubar_hide_r = useToggleStore((state) => state.menubar_hide_r);
  return (
    <>
      <div
        onClick={() => menubar_hide_r()}
        className={`bg-act rounded-r-full z-[2] grid select-none place-items-center absolute self-end h-[4rem] ${
          !menubar_hide ? "w-[22rem]" : "w-[5rem]"
        }`}
      >
        {!menubar_hide ? (
          <button className="flex items-center text-[1.4rem]">
            <p className="mr-[1rem]">Hide Menubar</p>
            <Image src={hideLogo} className="h-[2rem] w-[2rem]" />
          </button>
        ) : (
          <button>
            <Image src={showLogo} className="h-[2rem] w-[2rem]" />
          </button>
        )}
      </div>
    </>
  );
}
