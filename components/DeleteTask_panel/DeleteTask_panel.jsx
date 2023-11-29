"use client";
import "./deletetask_panel.css";
// hooks
import { useEffect } from "react";
//
import useToggleStore from "@/app/zustand/toggle";
import addBoardsStore from "@/app/zustand/addBoards";

export default function DeleteTask_panel() {
  // task_settings_tg_r
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
  const deleteTask_panel_tg = useToggleStore(
    (state) => state.deleteTask_panel_tg
  );
  const deleteTask_panel_tg_r = useToggleStore(
    (state) => state.deleteTask_panel_tg_r
  );
  const taskPanel_tg_r = useToggleStore((state) => state.taskPanel_tg_r);
  const delete_task_r = addBoardsStore((state) => state.delete_task_r);
  const task_settings_tg_r = useToggleStore(
    (state) => state.task_settings_tg_r
  );
  //
  let test = () => {
    const updated_arrOfBoards = arrOfBoards[+selected_board]?.columns[
      +selected_task_column
    ].tasks.filter((e, i) => {
      return i != selected_task;
    });
    return updated_arrOfBoards;
  };
  useEffect(() => {}, [arrOfBoards]);
  return (
    <>
      {deleteTask_panel_tg && (
        <div id="DeleteTask_panel" className="Panel z-[8]">
          <div className="Panel-transparentBackground"></div>
          <div className="Panel-container px-[2rem] w-[34rem] min-h-[16rem]  rounded-xl flex flex-col items-center justify-between py-[2rem]">
            <h2 className="w-full font-bold text-[2rem] text-red-500">
              Delete this board?
            </h2>
            <div className=" min-h-[8rem] flex flex-col justify-between">
              <p className="text-[1.2rem] my-[1rem]">
                Are you sure you want to delete the
                <span className="text-red-500">
                  " {selected_task_details?.taskName || "test"} "
                </span>
                task and its subtasks? This action cannot be reversed.
              </p>
              <div className="flex justify-between">
                <button
                  onClick={() => {
                    taskPanel_tg_r(false);
                    deleteTask_panel_tg_r(false);
                    // console.log(test());
                    delete_task_r();

                    // delete_panel_alert_tg_r(false);
                    // delete_board_r();
                    // board_settings_tg_r();
                  }}
                  className=" bg-red-500"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    deleteTask_panel_tg_r(false);

                    // board_settings_tg_r();
                  }}
                  className=" bg-white text-act"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
