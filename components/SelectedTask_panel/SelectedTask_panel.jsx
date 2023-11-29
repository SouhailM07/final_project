"use client";
// style
import "./selectedtask_panel.css";
import { useEffect } from "react";
// assets
import Image from "next/image";
import editLogo from "@/public/ellipsis-vertical-solid.svg";
// !zustand
import useToggleStore from "@/app/zustand/toggle";
import addBoardsStore from "@/app/zustand/addBoards";

export default function SelectedTask_panel() {
  const taskPanel_tg = useToggleStore((state) => state.taskPanel_tg);
  const taskPanel_tg_r = useToggleStore((state) => state.taskPanel_tg_r);
  const task_settings_tg = useToggleStore((state) => state.task_settings_tg);
  const task_settings_tg_r = useToggleStore(
    (state) => state.task_settings_tg_r
  );
  //
  const arrOfBoards = addBoardsStore((state) => state.arrOfBoards);
  const selected_board = addBoardsStore((state) => state.selected_board);
  const selected_task = addBoardsStore((state) => state.selected_task);
  const selected_task_column = addBoardsStore(
    (state) => state.selected_task_column
  );
  let selected_task_details =
    arrOfBoards[+selected_board]?.columns[+selected_task_column]?.tasks[
      selected_task
    ];
  useEffect(() => {
    console.log(selected_task_details);
  }, [taskPanel_tg, arrOfBoards]);
  return (
    <>
      <div className="Panel z-[7]">
        <div
          onClick={() => taskPanel_tg_r(false)}
          className="Panel-transparentBackground"
        ></div>
        <div className="Panel-container w-[40rem] min-h-[22rem] px-[2rem] rounded-xl flex flex-col justify-between py-[2rem]">
          <div className="flex justify-between">
            <h2 className="text-[1.8rem] font-bold">
              {selected_task_details?.taskName}
            </h2>
            <button
              onClick={() => {
                task_settings_tg_r();
              }}
            >
              <Image src={editLogo} alt="" className="h-[2.5rem] w-[3rem]" />
              {task_settings_tg && <TaskSettings_panel />}
            </button>
          </div>
          <p className="my-[1rem]">{selected_task_details?.description}</p>
          <ul className="w-full">
            <div>
              Subtasks (<span>0</span>
              <span> of </span>
              <span>{selected_task_details?.subtasks.length}</span>)
            </div>
            {selected_task_details?.subtasks.map((e, i) => {
              return (
                <li
                  key={i}
                  className="bg-d_body h-[4rem] items-center my-[1rem] rounded-lg flex"
                >
                  <input type="checkbox" name="" id={i} className="mx-[1rem]" />
                  <label htmlFor={i} className="text-[1.2rem]  block w-full ">
                    {e.subtask}
                  </label>
                </li>
              );
            })}
          </ul>
          <div>
            <h3>Current Status</h3>
            <select
              onChange={(e) => {
                // edit_newTask_index_r(e.target.value);
              }}
            >
              {/* {arrOfBoards[+selected_board]?.columns.map((e, i) => {
                return (
                  <option key={i} value={i}>
                  {e[`input`]}
                  </option>
                  );
                })} */}
            </select>
          </div>
        </div>
      </div>
    </>
  );
}

let TaskSettings_panel = () => {
  const deleteTask_panel_tg_r = useToggleStore(
    (state) => state.deleteTask_panel_tg_r
  );
  const taskPanel_tg_r = useToggleStore((state) => state.taskPanel_tg_r);
  return (
    <>
      <div className=" translate-y-[1rem] translate-x-[-6rem] absolute flex flex-col bg-d_body h-[5rem] w-[10rem] justify-between py-[0.6rem] rounded-xl">
        <button>Edit Task</button>
        <button
          onClick={() => {
            deleteTask_panel_tg_r(true);
          }}
          className="text-red-500"
        >
          Delete Task
        </button>
      </div>
    </>
  );
};
