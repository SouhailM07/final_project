"use client";
// hooks
import { useState, useEffect } from "react";
// style
import "./updatetask_panel.css";
// assets
import Image from "next/image";
import deleteLogo from "../../public/delete-left-solid.svg";
import plusLogo from "../../public/plus-solid.svg";
//
import addBoardsStore from "@/app/zustand/addBoards";
import useToggleStore from "@/app/zustand/toggle";

export default function UpdateTask_panel() {
  const arrOfBoards = addBoardsStore((state) => state.arrOfBoards);
  const selected_board = addBoardsStore((state) => state.selected_board);
  const selected_task = addBoardsStore((state) => state.selected_task);
  const updateTask_panel_tg_r = useToggleStore(
    (state) => state.updateTask_panel_tg_r
  );
  const selected_task_column = addBoardsStore(
    (state) => state.selected_task_column
  );
  let selected_task_details =
    arrOfBoards[+selected_board]?.columns[+selected_task_column]?.tasks[
      selected_task
    ];
  let [taskName, setTaskName] = useState("");
  let [taskDescription, setTaskDescription] = useState("");
  useEffect(() => {
    setTaskName(selected_task_details?.taskName);
    setTaskDescription(selected_task_details?.description);
  }, []);
  return (
    <>
      <div className="Panel">
        <div
          onClick={() => {
            updateTask_panel_tg_r(false);
          }}
          className="Panel-transparentBackground"
        ></div>
        <div className="Panel-container">
          <h2 className="Panel-title">Edit Task</h2>
          {/*  */}
          <div>
            <label htmlFor="">Task Name</label>
            <input
              type="text"
              className="full_input"
              value={taskName}
              onChange={(e) => {
                setTaskName(e.target.value);
              }}
            />
          </div>
          {/*  */}
          <div>
            <h3>Description</h3>
            <textarea
              name=""
              id=""
              value={taskDescription}
              className="w-full h-[8rem] Panel-description"
              onChange={(e) => {
                // edit_newTask_description_r(e.target.value);
                setTaskDescription(e.target.value);
              }}
            ></textarea>
          </div>
          <Subtasks
            taskName_state={taskName}
            taskDescription_state={taskDescription}
          />
        </div>
      </div>
    </>
  );
}

let Subtasks = ({ taskName_state, taskDescription_state }) => {
  const arrOfBoards = addBoardsStore((state) => state.arrOfBoards);
  const selected_board = addBoardsStore((state) => state.selected_board);
  const selected_task = addBoardsStore((state) => state.selected_task);
  const updateTask_panel_tg_r = useToggleStore(
    (state) => state.updateTask_panel_tg_r
  );
  const selected_task_column = addBoardsStore(
    (state) => state.selected_task_column
  );
  let selected_task_details =
    arrOfBoards[+selected_board]?.columns[+selected_task_column]?.tasks[
      selected_task
    ];
  let [taskSubtasks, setTaskSubtasks] = useState([]);
  useEffect(() => {
    setTaskSubtasks(selected_task_details?.subtasks);
    console.log(selected_task_details);
  }, []);
  //   ====================================================================================
  // ! ============================[Subtasks functions]====================================
  //   ====================================================================================
  // todo :  ============================
  // todo :  add new subtask to the subtasks
  // todo :  ============================
  let ADD_NEW_SUBTASK_f = () => {
    const newSubtask = { [`subtask`]: "", state: false };
    setTaskSubtasks([...taskSubtasks, newSubtask]);
  };
  // todo :  =============================
  // todo :  handle input content changing
  // todo :  =============================
  const handleInputChange = (inputInfo, index) => {
    // Create a new array with the updated input value
    const newSubtasks = [...taskSubtasks];
    newSubtasks[index][`subtask`] = inputInfo.target.value;
    // Update the state with the new array
    setTaskSubtasks(newSubtasks);
  };

  // todo :  ==================
  // todo :  deleting an input
  // todo :  ==================
  const deleteSubtask = (index) => {
    let newSubtasks = [...taskSubtasks];
    // Remove the input at the specified index
    newSubtasks = newSubtasks.filter((e, i) => {
      return i !== index;
    });
    setTaskSubtasks(newSubtasks);
  };
  return (
    <>
      <div id="Subtasks">
        <h3>Subtasks</h3>
        <ul>
          {taskSubtasks.map((e, i) => {
            return (
              <li key={i}>
                <input
                  onChange={(inputInfo) => {
                    handleInputChange(inputInfo, i);
                  }}
                  type="text"
                  placeholder={e?.placeholder}
                  value={e[`subtask`]}
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
        <CREATE_TASK_BTN
          subtasks_data={taskSubtasks}
          btn_taskName_state={taskName_state}
          btn_taskDescription_state={taskDescription_state}
        />
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
  const selected_task = addBoardsStore((state) => state.selected_task);
  const updateTask_panel_tg_r = useToggleStore(
    (state) => state.updateTask_panel_tg_r
  );
  const selected_task_column = addBoardsStore(
    (state) => state.selected_task_column
  );

  //
  let arrOfBoards = addBoardsStore((state) => state.arrOfBoards);
  const selected_board = addBoardsStore((state) => state.selected_board);
  let selected_task_details_columns = arrOfBoards[+selected_board]?.columns;
  return (
    <>
      <div id="StatusTask">
        <h3>STATUS</h3>
        <select
          onChange={(e) => {
            // edit_newTask_index_r(e.target.value);
          }}
        >
          {selected_task_details_columns.map((e, i) => {
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

let CREATE_TASK_BTN = ({
  subtasks_data,
  btn_taskName_state,
  btn_taskDescription_state,
}) => {
  let updateTask_name_r = addBoardsStore((state) => state.updateTask_name_r);
  let updateTask_description_r = addBoardsStore(
    (state) => state.updateTask_description_r
  );
  let updateTask_subtasks_r = addBoardsStore(
    (state) => state.updateTask_subtasks_r
  );
  let updateTask_panel_tg_r = useToggleStore(
    (state) => state.updateTask_panel_tg_r
  );
  return (
    <>
      <button
        className="Panel-endBtn"
        onClick={() => {
          updateTask_name_r(btn_taskName_state);
          updateTask_description_r(btn_taskDescription_state);
          updateTask_subtasks_r(subtasks_data);
          updateTask_panel_tg_r(false);

          // console.log(arrOfBoards);
        }}
      >
        Save changes
      </button>
    </>
  );
};
