"use client";
// ! redux
import { useDispatch, useSelector } from "react-redux";
import { toggle_createBoard_f } from "@/app/redux/reducers/createBoard";
// style
import "./createboard.css";
// hooks
import { useState, useEffect } from "react";
// assets
import Image from "next/image";
import plusLogo from "@/public/plus-solid.svg";
import deleteLogo from "@/public/delete-left-solid.svg";

export default function CreateBoard() {
  let toggle_createBoard = useSelector(
    (state) => state.toggle_createBoard.toggle_createBoard
  );
  let dispatch = useDispatch();
  return (
    <>
      {toggle_createBoard && (
        <div className="bg-[#0000008a] fixed top-0 flex justify-center items-center h-full w-full text-white z-[10] ">
          <div
            onClick={() => dispatch(toggle_createBoard_f(false))}
            className=" h-full w-full absolute z-[1] "
          ></div>
          <div className="bg-d_component min-h-[25rem] relative z-[2] w-[32rem] px-[2rem] py-[2rem] rounded-xl flex flex-col justify-between">
            <h3>Add New Board</h3>
            <BoardName />
            <BoardColumns />
            <CREATE_NEW_BOARD_BTN />
          </div>
        </div>
      )}
    </>
  );
}

let BoardName = () => {
  return (
    <>
      <div className="text-white my-[1rem] flex flex-col">
        <label htmlFor="boardName">Board Name</label>
        <input
          type="text"
          name=""
          id="boardName"
          placeholder="e.g Web Design"
          className="pl-[1rem] focus:outline-act focus:border-none bg-transparent border-2 border-gray-500 rounded-xl py-[0.7rem] mt-[8px]"
        />
      </div>
    </>
  );
};

let ADD_NEW_COLUMN_BTN = () => {
  return (
    <>
      <button className="rounded-full my-[1rem] flex items-center justify-center py-[0.7rem] bg-gray-600 space-x-[1rem] font-bold text-[1.3rem] text-act w-full">
        <Image
          src={plusLogo}
          alt=""
          className="h-[1.5rem] w-[1.5rem] cursor-pointer"
        />
        <span>Add New Column</span>
      </button>
    </>
  );
};

let CREATE_NEW_BOARD_BTN = () => {
  let dispatch = useDispatch();
  return (
    <>
      <button
        onClick={() => dispatch(toggle_createBoard_f(false))}
        className=" bg-act  rounded-full flex  justify-center py-[0.7rem]  space-x-[1rem] font-bold text-[1.3rem] text-white w-full"
      >
        Create New Board
      </button>
    </>
  );
};

let BoardColumns = () => {
  let arrOfTest = ["todo", "doing", "4", "5", "6"];
  // let arrOfTest = [];
  return (
    <>
      <h3>Board Columns</h3>
      <div>
        {/* map with divs in atlas columns */}
        <ul className="w-full mb-[1rem]">
          {arrOfTest.map((e, i) => {
            return (
              <li className="flex items-center justify-between " key={i}>
                <input
                  type="text"
                  value={e}
                  className="pl-[1rem] my-[0.5rem] w-[90%] focus:outline-act focus:border-none bg-transparent border-2 border-gray-500 rounded-xl py-[0.6rem] "
                />
                <Image
                  src={deleteLogo}
                  alt=""
                  className="h-[2rem] w-[2rem] cursor-pointer "
                />
              </li>
            );
          })}
        </ul>
        <ADD_NEW_COLUMN_BTN />
      </div>
      <div>
        {/* map with divs in state inputs like password generator strength bars */}
      </div>
    </>
  );
};
