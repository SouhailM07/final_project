"use client";
// style
import "./selectedtask_panel.css";
// assets
import Image from "next/image";
import editLogo from "@/public/ellipsis-vertical-solid.svg";
// !zustand
import useToggleStore from "@/app/zustand/toggle";
import addBoardsStore from "@/app/zustand/addBoards";

export default function SelectedTask_panel() {
  const taskPanel_tg = useToggleStore((state) => state.taskPanel_tg);
  const taskPanel_tg_r = useToggleStore((state) => state.taskPanel_tg_r);
  //
  const arrOfBoards = addBoardsStore((state) => state.arrOfBoards);
  const selected_task = addBoardsStore((state) => state.selected_task);
  const selected_task_column = addBoardsStore(
    (state) => state.selected_task_column
  );
  let selected_task_details =
    arrOfBoards[+selected_task]?.columns[+selected_task_column].tasks[
      selected_task
    ];
  console.log(selected_task_details);
  return (
    <>
      {taskPanel_tg && (
        <div className="Panel">
          <div
            onClick={() => taskPanel_tg_r(false)}
            className="Panel-transparentBackground"
          ></div>
          <div className="Panel-container w-[40rem] min-h-[22rem] px-[2rem] rounded-xl flex flex-col justify-between py-[2rem]">
            <div className="flex justify-between">
              <h2 className="text-[1.8rem] font-bold">
                {selected_task_details.taskName}
              </h2>
              <button>
                <Image src={editLogo} alt="" className="h-[2.5rem] w-[3rem]" />
              </button>
            </div>
            <p className="my-[1rem]">{selected_task_details.description}</p>
            <ul className="w-full">
              <div>
                Subtasks (<span>0</span>
                <span> of </span>
                <span>{selected_task_details.subtasks.length}</span>)
              </div>
              {selected_task_details.subtasks.map((e, i) => {
                return (
                  <li
                    key={i}
                    className="bg-d_body py-[1rem]  my-[1rem] rounded-lg flex"
                  >
                    <input
                      type="checkbox"
                      name=""
                      id={i}
                      className="mx-[1rem]"
                    />
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
      )}
    </>
  );
}
