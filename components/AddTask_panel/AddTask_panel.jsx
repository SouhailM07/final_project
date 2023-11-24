"use client";
// hooks
import { useState, useEffect } from "react";
// style
import "./addtask_panel.css";
// assets
import Image from "next/image";
import deleteLogo from "@/public/delete-left-solid.svg";
import plusLogo from "../../public/plus-solid.svg";

/*=========================================================================================*/
// component section
/*=========================================================================================*/

export default function AddTask_panel() {
  return (
    <>
      <div id="AddTask_panel">
        <div id="AddTask_panel-transparent_background"></div>
        <div id="AddTask_panel-container">
          <h2 className="text-[1.6rem]">Add New Task</h2>
          <TaskTitle />
          <TaskDescription />
          <Subtasks />
        </div>
      </div>
    </>
  );
}

/*=========================================================================================*/
// small component section
/*=========================================================================================*/

let TaskTitle = () => {
  return (
    <>
      <div id="TaskTitle" className="">
        <h3>Title</h3>
        <input type="text" placeholder="e.g Take coffee break" />
      </div>
    </>
  );
};

let TaskDescription = () => {
  return (
    <>
      <div id="TaskDescription">
        <h3>Description</h3>
        <textarea name="" id="" className="w-full h-[8rem]"></textarea>
      </div>
    </>
  );
};

let Subtasks = () => {
  let [subtasks, setSubtasks] = useState([
    { subTask: "", state: false, placeholder: "e.g Make coffee" },
    { subTask: "", state: false, placeholder: "e.g Drink coffee & smile" },
  ]);
  return (
    <>
      <div id="Subtasks">
        <h3>Subtasks</h3>
        <ul>
          {subtasks.map((e, i) => {
            return (
              <li key={i}>
                <input
                  onChange={(inputInfo) => {}}
                  type="text"
                  placeholder={e?.placeholder}
                  value={e[`subTask`]}
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
        <ADD_NEW_SUBTASK_BTN />
        <StatusTask />
        <CREATE_TASK_BTN />
      </div>
    </>
  );
};

let ADD_NEW_SUBTASK_BTN = () => {
  return (
    <>
      <button id="ADD_NEW_SUBTASK_BTN">
        <Image
          src={plusLogo}
          alt=""
          className="h-[1.5rem] w-[1.5rem] cursor-pointer"
        />
        <span>Add New Subtasks</span>
      </button>
    </>
  );
};

let StatusTask = () => {
  return (
    <>
      <div>
        <h3>STATUS</h3>
        <select
          name=""
          id=""
          className="my-[0.8rem] pl-[1rem] py-[0.6rem] mt-[8px]  w-full border-2 focus:outline-none focus:border-act  border-gray-500 rounded-xl bg-transparent"
        ></select>
      </div>
    </>
  );
};

let CREATE_TASK_BTN = () => {
  return (
    <>
      <button
        id="CREATE_TASK_BTN"
        onClick={() => {
          // create_new_board_axios();
          // ! activate after completing redux add_boards
          // if (edited_newBoard.name.length > 0) {
          //   dispatch(toggle_createBoard_f(false));
          //   dispatch(edit_newBoard_id(randomId));
          //   dispatch(edit_newBoard_columns(newBoard_state));
          //   dispatch(add_board_reducer());
          //   console.log(newBoard_state);
          //   console.log(edited_newBoard);}
        }}
      >
        Create Task
      </button>
    </>
  );
};
