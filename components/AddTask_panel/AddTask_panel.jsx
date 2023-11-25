"use client";
// ! redux
import { useDispatch, useSelector } from "react-redux";
import { toggle_addTask_f } from "@/app/redux/reducers/addTask_panel";
import {
  edit_selected_board_id,
  edit_description,
  edit_subtasks,
  edit_taskName,
  add_newTask_reducer,
  edit_tasks_index,
  select_the_board,
  update_board,
} from "@/app/redux/reducers/add_boards";
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
  let toggle_addTask = useSelector(
    (state) => state.toggle_addTask.toggle_addTask
  );
  //

  let dispatch = useDispatch();
  useEffect(() => {}, [toggle_addTask]);
  return (
    <>
      {toggle_addTask && (
        <div id="AddTask_panel">
          <div
            onClick={() => {
              dispatch(toggle_addTask_f(false));
            }}
            id="AddTask_panel-transparent_background"
          ></div>
          <div id="AddTask_panel-container">
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
  let dispatch = useDispatch();
  return (
    <>
      <div id="TaskTitle" className="">
        <h3>Title</h3>
        <input
          type="text"
          placeholder="e.g Take coffee break"
          onChange={(e) => {
            dispatch(edit_taskName(e.target.value));
          }}
        />
      </div>
    </>
  );
};

let TaskDescription = () => {
  let newTask_info = useSelector((state) => state.add_boards.newTask);
  let dispatch = useDispatch();
  return (
    <>
      <div id="TaskDescription">
        <h3>Description</h3>
        <textarea
          name=""
          id=""
          className="w-full h-[8rem]"
          onChange={(e) => {
            dispatch(edit_description(e.target.value));
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
  // import the selected board
  let dispatch = useDispatch();
  let selected_board = useSelector((state) => state.add_boards.selected_board);
  return (
    <>
      <div id="StatusTask">
        <h3>STATUS</h3>
        <select
          onChange={(e) => {
            dispatch(edit_tasks_index(e.target.value));
            console.log(`the value is `);
            console.log(e.target.value);
          }}
        >
          {selected_board.columns.map((e, i) => {
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
  let dispatch = useDispatch();
  let selected_board = useSelector((state) => state.add_boards.selected_board);
  let somethig = useSelector((state) => state.add_boards.task_index);
  let task_info = useSelector((state) => state.add_boards.newTask);
  // let arrOfBoards = useSelector((state) => state.add_boards.arrOfBoards);
  // let idOf = useSelector((state) => state.add_boards.selected_board_id);
  return (
    <>
      <button
        id="CREATE_TASK_BTN"
        onClick={async () => {
          dispatch(edit_subtasks(subtasks_data));
          if (task_info.taskName.length > 0) {
            await dispatch(add_newTask_reducer());
            console.log("======================");
            console.log(selected_board);
            console.log("======================");
            await dispatch(edit_selected_board_id(selected_board.id));
            await dispatch(update_board(selected_board));
            // console.log("======================");
            // console.log(arrOfBoards);
            // console.log("======================");
            console.log(somethig);
            dispatch(edit_tasks_index(0));
            console.log(somethig);
            dispatch(toggle_addTask_f(false));
          }
        }}
      >
        Create Task
      </button>
    </>
  );
};
