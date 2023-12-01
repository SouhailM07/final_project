"use client";
// style
import "./selectedtask_panel.css";
import { useEffect, useRef, useState } from "react";
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
  let updateTask_subtask_r = addBoardsStore(
    (state) => state.updateTask_subtask_r
  );
  let selected_status_to_move_r = addBoardsStore(
    (state) => state.selected_status_to_move_r
  );
  let updateTask_status = addBoardsStore((state) => state.updateTask_status);
  let [newColumnIndex, setNewColumnIndex] = useState(
    selected_task_details?.ColumnIndex
  );
  useEffect(() => {
    // console.log(selected_task_details);
    // console.log(arrOfBoards[+selected_board]?.columns);
    // console.log(selected_task_details?.ColumnIndex);
  }, [arrOfBoards]);
  return (
    <>
      <div className="Panel z-[7]">
        <div
          onClick={() => {
            if (
              selected_task_details != null &&
              selected_task_details != undefined
            ) {
              // updateTask_status();
            }
            taskPanel_tg_r(false);
          }}
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
              Subtasks (
              <span>
                {
                  selected_task_details?.subtasks.filter((e, i) => {
                    return e.state == true;
                  }).length
                }
              </span>
              <span> of </span>
              <span>{selected_task_details?.subtasks.length}</span>)
            </div>
            {selected_task_details?.subtasks.map((e, i) => {
              return (
                <li
                  key={i}
                  // ! function to update the state
                  onClick={() => {
                    updateTask_subtask_r(i);
                  }}
                  className="bg-l_body dark:bg-d_body h-[4rem] items-center my-[1rem] rounded-lg flex"
                >
                  <input
                    type="checkbox"
                    name=""
                    id={i}
                    // ! dont remove it , it's here so that you dont get err in the console
                    onChange={() => {}}
                    checked={e.state == true}
                    className="mx-[1rem] "
                  />
                  <label htmlFor={i} className="text-[1.2rem]">
                    {e.subtask}
                  </label>
                </li>
              );
            })}
          </ul>
          <div className="StatusTask">
            <h3>Current Status</h3>
            <select
              value={newColumnIndex}
              onChange={(e) => {
                // ! the key to solve the final problem
                setNewColumnIndex(e.target.value);
                selected_status_to_move_r(e.target.value);
                updateTask_status();
                taskPanel_tg_r(false);
                // console.log("the keyyy is  =>");
                // console.log(e.target.value);
                // edit_newTask_index_r(e.target.value);
              }}
            >
              {selected_task_details?.ColumnsAvailable.map((e, i) => {
                return (
                  <option key={i} value={i}>
                    {e[`input`]}
                  </option>
                );
              })}
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
  const updateTask_panel_tg_r = useToggleStore(
    (state) => state.updateTask_panel_tg_r
  );
  return (
    <>
      <div className="Setting_panel translate-y-[1rem] translate-x-[-6rem]  ">
        <button
          onClick={() => {
            updateTask_panel_tg_r(true);
          }}
        >
          Edit Task
        </button>
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
