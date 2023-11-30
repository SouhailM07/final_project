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
  const update_newTask_columnsAvailable_r = addBoardsStore(
    (state) => state.update_newTask_columnsAvailable_r
  );
  // let arrOfBoards = useSelector((state) => state.add_boards.arrOfBoards);
  useEffect(() => {}, [selected_board]);
  return (
    <>
      <div className=" px-[1rem] overflow-auto flex dark:text-white w-auto space-x-[1rem] ">
        {arrOfBoards[selected_board]?.columns?.map((e, i) => {
          return (
            <div key={i} className=" px-[1rem] min-w-[20rem] ">
              <h3 className="my-[1rem] text-[1.6rem] text-grayishText">
                {e.input} ({e.tasks.length})
              </h3>
              <ul>
                {e.tasks.map((e, i) => {
                  return (
                    <li
                      onClick={async () => {
                        // console.log(`the element is :`);
                        // console.log(e);
                        // console.log(`the index is : ${i}`);
                        //
                        await selected_task_column_r(e.ColumnIndex);
                        await taskPanel_tg_r(true);
                        await selected_task_r(i);
                        await update_newTask_columnsAvailable_r(
                          arrOfBoards[selected_board]?.columns
                        );
                      }}
                      key={i}
                      className=" shadow-xl flex flex-col my-[1rem] justify-around px-[1rem] py-[1.2rem] bg-l_component dark:bg-d_component rounded-xl"
                    >
                      <h2 className="text-[1.5rem] font-bold my-3">
                        {e.taskName}
                      </h2>
                      <div className="space-x-1 text-grayishText">
                        <span>
                          {
                            e?.subtasks.filter((e, i) => {
                              return e.state == true;
                            }).length
                          }
                        </span>
                        <span>of</span>
                        <span>{e.subtasks.length} completed tasks</span>
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
