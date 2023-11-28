"use client";
// !redux
import { useDispatch, useSelector } from "react-redux";
// hooks
import { useEffect, useState } from "react";
// style
import "./main.css";

//
import addBoardsStore from "@/app/zustand/addBoards";
//

export default function Main() {
  let toggle_addTask = useSelector(
    (state) => state.toggle_addTask.toggle_addTask
  );
  const selected_board = addBoardsStore((state) => state.selected_board);
  const arrOfBoards = addBoardsStore((state) => state.arrOfBoards);

  // let arrOfBoards = useSelector((state) => state.add_boards.arrOfBoards);
  useEffect(() => {}, [toggle_addTask, arrOfBoards]);
  return (
    <>
      <div className="border-2 px-[1rem] border-yellow-400 w-full  flex space-x-[1rem] overflow-auto">
        {arrOfBoards[selected_board]?.columns?.map((e, i) => {
          return (
            <div key={i} className="border-2 px-[1rem] w-[20rem] text-white">
              <h3 className="my-[1rem]">
                {e.input} ({e.tasks.length})
              </h3>
              <ul>
                {e.tasks.map((e, i) => {
                  return (
                    <li
                      onClick={() => {
                        console.log(e);
                      }}
                      key={i}
                      className="flex flex-col my-[1rem] justify-around px-[1rem] h-[6rem] bg-d_component rounded-xl"
                    >
                      <h2 className="text-[1.5rem] ">{e.taskName}</h2>
                      <div className="space-x-1 ">
                        <span>0</span>
                        <span>of</span>
                        <span>{e.subtasks.length}</span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
        {/* <div className="border-2 w-[20rem] flex items-center justify-center text-white">
          <p>+ New Column</p>
        </div> */}
      </div>
    </>
  );
}
