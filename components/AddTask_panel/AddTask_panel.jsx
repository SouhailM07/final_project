"use client";
// hooks
import { useState } from "react";
// style
import "./addtask_panel.css";
// assets
import Image from "next/image";
import deleteLogo from "@/public/delete-left-solid.svg";
import plusLogo from "@/public/plus-solid.svg";

import useToggleStore from "@/app/zustand/toggle";
import addBoardsStore from "@/app/zustand/addBoards";
/*=========================================================================================*/
// component section
/*=========================================================================================*/

export default function AddTask_panel() {
  //
  const addTask_tg = useToggleStore((state) => state.addTask_tg);
  const addTask_tg_r = useToggleStore((state) => state.addTask_tg_r);
  return (
    <>
      {addTask_tg && (
        <div id="AddTask_panel" className="Panel">
          <div
            onClick={() => {
              addTask_tg_r(false);
            }}
            id="AddTask_panel-transparent_background"
            className="Panel-transparentBackground"
          ></div>
          <div id="AddTask_panel-container" className="Panel-container">
            <h2 className="text-[1.6rem] italic">Add New Task</h2>
            <TaskTitle />
            <TaskDescription />
            <Subtasks />
          </div>
        </div>
      )}
    </>
  );
}

/*=========================================================================================*/
// small component section
/*=========================================================================================*/

let TaskTitle = () => {
  const edit_newTask_name_r = addBoardsStore(
    (state) => state.edit_newTask_name_r
  );
  return (
    <>
      <div id="TaskTitle" className="">
        <h3>Title</h3>
        <input
          type="text"
          placeholder="e.g Take coffee break"
          onChange={(e) => {
            edit_newTask_name_r(e.target.value);
          }}
        />
      </div>
    </>
  );
};

let TaskDescription = () => {
  const edit_newTask_description_r = addBoardsStore(
    (state) => state.edit_newTask_description_r
  );
  //
  return (
    <>
      <div id="TaskDescription">
        <h3>Description</h3>
        <textarea
          name=""
          id=""
          className="w-full h-[8rem]"
          onChange={(e) => {
            edit_newTask_description_r(e.target.value);
          }}
        ></textarea>
      </div>
    </>
  );
};

let Subtasks = () => {
  let [subtasks, setSubtasks] = useState([
    { subtask: "", state: false, placeholder: "e.g Make coffee" },
    { subtask: "", state: false, placeholder: "e.g Drink coffee & smile" },
  ]);
  //   ====================================================================================
  // ! ============================[Subtasks functions]====================================
  //   ====================================================================================
  // todo :  ============================
  // todo :  add new subtask to the subtasks
  // todo :  ============================
  let ADD_NEW_SUBTASK_f = () => {
    const newSubtask = { [`subtask`]: "", state: false };
    setSubtasks([...subtasks, newSubtask]);
  };
  // todo :  =============================
  // todo :  handle input content changing
  // todo :  =============================
  const handleInputChange = (inputInfo, index) => {
    // Create a new array with the updated input value
    const newSubtasks = [...subtasks];
    newSubtasks[index][`subtask`] = inputInfo.target.value;
    // Update the state with the new array
    setSubtasks(newSubtasks);
  };

  // todo :  ==================
  // todo :  deleting an input
  // todo :  ==================
  const deleteSubtask = (index) => {
    let newSubtasks = [...subtasks];
    // Remove the input at the specified index
    newSubtasks = newSubtasks.filter((e, i) => {
      return i !== index;
    });
    setSubtasks(newSubtasks);
  };
  return (
    <>
      <div id="Subtasks">
        <h3>Subtasks</h3>
        <ul>
          {subtasks.map((e, i) => {
            return (
              <li key={i}>
                <input
                  onChange={(inputInfo) => {
                    handleInputChange(inputInfo, i);
                  }}
                  type="text"
                  placeholder={e?.placeholder}
                  value={e[`subTask`]}
                />
                <Image
                  src={deleteLogo}
                  onClick={() => deleteSubtask(i)}
                  alt=""
                  className="h-[2rem] w-[2rem] cursor-pointer "
                />
              </li>
            );
          })}
        </ul>
        <ADD_NEW_SUBTASK_BTN fnc={() => ADD_NEW_SUBTASK_f()} />
        <StatusTask />
        <CREATE_TASK_BTN subtasks_data={subtasks} />
      </div>
    </>
  );
};

let ADD_NEW_SUBTASK_BTN = ({ fnc }) => {
  return (
    <>
      <button id="ADD_NEW_SUBTASK_BTN" onClick={fnc}>
        <Image
          src={plusLogo}
          alt="plus logo"
          className="h-[1.5rem] w-[1.5rem] cursor-pointer"
        />
        <span>Add New Subtasks</span>
      </button>
    </>
  );
};

let StatusTask = () => {
  const edit_newTask_index_r = addBoardsStore(
    (state) => state.edit_newTask_index_r
  );
  //
  let arrOfBoards = addBoardsStore((state) => state.arrOfBoards);
  const selected_board = addBoardsStore((state) => state.selected_board);
  return (
    <>
      <div id="StatusTask">
        <h3>STATUS</h3>
        <select
          onChange={(e) => {
            edit_newTask_index_r(e.target.value);
          }}
        >
          {arrOfBoards[+selected_board]?.columns.map((e, i) => {
            return (
              <option key={i} value={i}>
                {e[`input`]}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
};

let CREATE_TASK_BTN = ({ subtasks_data }) => {
  const addTask_tg_r = useToggleStore((state) => state.addTask_tg_r);
  const newTask_info = addBoardsStore((state) => state.newTask);
  const edit_newTask_subtasks_r = addBoardsStore(
    (state) => state.edit_newTask_subtasks_r
  );
  const add_newTask_r = addBoardsStore((state) => state.add_newTask_r);
  const arrOfBoards = addBoardsStore((state) => state.arrOfBoards);
  return (
    <>
      <button
        id="CREATE_TASK_BTN"
        onClick={async () => {
          edit_newTask_subtasks_r(subtasks_data);
          if (newTask_info.taskName.length > 0) {
            await add_newTask_r();
            console.log(arrOfBoards);
            addTask_tg_r(false);
          }
        }}
      >
        Create Task
      </button>
    </>
  );
};
