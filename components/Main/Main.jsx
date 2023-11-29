"use client";
// !redux
// hooks
import { useEffect, useState } from "react";
// style
import "./main.css";

//
import addBoardsStore from "@/app/zustand/addBoards";
import useToggleStore from "@/app/zustand/toggle";
//

export default function Main() {
  const selected_board = addBoardsStore((state) => state.selected_board);
  const arrOfBoards = addBoardsStore((state) => state.arrOfBoards);
  const taskPanel_tg_r = useToggleStore((state) => state.taskPanel_tg_r);
  const selected_task_r = addBoardsStore((state) => state.selected_task_r);
  const selected_task_column_r = addBoardsStore(
    (state) => state.selected_task_column_r
  );
  // let arrOfBoards = useSelector((state) => state.add_boards.arrOfBoards);
  useEffect(() => {}, [selected_board]);
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
                        console.log(`the element is :`);
                        console.log(e);
                        console.log(`the index is : ${i}`);
                        //
                        selected_task_column_r(e.ColumnIndex);
                        taskPanel_tg_r(true);
                        selected_task_r(i);
                      }}
                      key={i}
                      className="flex flex-col my-[1rem] justify-around px-[1rem] h-[6rem] bg-d_component rounded-xl"
                    >
                      <h2 className="text-[1.5rem] ">{e.taskName}</h2>
                      <div className="space-x-1 ">
                        <span>
                          {
                            e?.subtasks.filter((e, i) => {
                              return e.state == true;
                            }).length
                          }
                        </span>
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
