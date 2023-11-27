"use client";
// ! redux
import { useDispatch, useSelector } from "react-redux";
import {
  toggle_createBoard_f,
  adding_boardName,
} from "@/app/redux/reducers/createBoard";
import {
  add_board_reducer,
  edit_newBoard_columns,
  edit_newBoard_id,
  edit_newBoard_name,
} from "@/app/redux/reducers/add_boards";
// style
import "./createboard.css";
// hooks
import { useState, useEffect, useId } from "react";
import axios from "axios";
// assets
import Image from "next/image";
import plusLogo from "@/public/plus-solid.svg";
import deleteLogo from "@/public/delete-left-solid.svg";

//!=====================[zustand start]=====================================================
import useToggleStore from "@/app/zustand/toggle";
//!=====================[zustand end]=====================================================

/*=========================================================================================*/
// component section
/*=========================================================================================*/

export default function CreateBoard() {
  // toggle state to toggle sidebar [start]
  const createBoard_tg = useToggleStore((state) => state.createBoard_tg);
  const createBoard_tg_r = useToggleStore((state) => state.createBoard_tg_r);
  // toggle state to toggle sidebar [end]
  return (
    <>
      {createBoard_tg && (
        <div id="CreateBoard">
          <div
            onClick={() => {
              createBoard_tg_r(false);
            }}
            id="CreateBoard-transparentBackground"
          ></div>
          <div id="CreateBoard-container">
            <h3>Add New Board</h3>
            <BoardName />
            <BoardColumns />
          </div>
        </div>
      )}
    </>
  );
}

/*=========================================================================================*/
// small component section
/*=========================================================================================*/

let BoardName = () => {
  let dispatch = useDispatch();
  return (
    <>
      <div id="BoardName">
        <label htmlFor="boardName">Board Name</label>
        <input
          onChange={(e) => {
            // dispatch(adding_boardName(e.target.value))
            dispatch(edit_newBoard_name(e.target.value));
          }}
          type="text"
          id="boardName"
          placeholder="e.g Web Design"
        />
      </div>
    </>
  );
};

let ADD_NEW_COLUMN_BTN = ({ fnc }) => {
  return (
    <>
      <button onClick={fnc} id="ADD_NEW_COLUMN_BTN">
        <Image
          src={plusLogo}
          alt=""
          className="h-[1.5rem] w-[1.5rem] cursor-pointer"
        />
        <span>Add New Column</span>
      </button>
    </>
  );
};

let CREATE_NEW_BOARD_BTN = ({ newBoard_state }) => {
  let edited_newBoard = useSelector((state) => state.add_boards.newBoard);
  let randomId = useId();
  // changing the randomId when create new column btn is clicked
  let toggle_createBoard = useSelector(
    (state) => state.toggle_createBoard.toggle_createBoard
  );
  useEffect(() => {
    console.log("random Id changed");
  }, [toggle_createBoard]);
  const createBoard_tg_r = useToggleStore((state) => state.createBoard_tg_r);
  let dispatch = useDispatch();
  return (
    <>
      <button
        id="CREATE_NEW_BOARD_BTN"
        onClick={async () => {
          // create_new_board_axios();
          // ! activate after completing redux add_boards
          if (edited_newBoard.name.length > 0) {
            await dispatch(edit_newBoard_id(randomId));
            await dispatch(edit_newBoard_columns(newBoard_state));
            await dispatch(add_board_reducer());
            createBoard_tg_r(false);
            console.log(newBoard_state);
            console.log(edited_newBoard);
          }
        }}
      >
        Create New Board
      </button>
    </>
  );
};

let BoardColumns = () => {
  let [inputs, setInputs] = useState([
    { input: "Todo", tasks: [] },
    { input: "Doing", tasks: [] },
  ]);
  //   ====================================================================================
  // ! ===========================[Board columns functions]================================
  //   ====================================================================================
  // todo :  ============================
  // todo :  add new input to the columns
  // todo :  ============================
  let ADD_NEW_INPUT_f = () => {
    const newInput = { [`input`]: "", tasks: [] };
    setInputs([...inputs, newInput]);
    console.log(inputs);
  };
  // todo :  =============================
  // todo :  handle input content changing
  // todo :  =============================
  const handleInputChange = (inputInfo, index) => {
    // Create a new array with the updated input value
    const newInputs = [...inputs];
    newInputs[index][`input`] = inputInfo.target.value;
    // Update the state with the new array
    setInputs(newInputs);
  };

  // todo :  ==================
  // todo :  deleting an input
  // todo :  ==================
  const deleteInput = (index) => {
    let newInputs = [...inputs];
    // Remove the input at the specified index
    newInputs = newInputs.filter((e, i) => {
      return i !== index;
    });
    console.log(newInputs);
    setInputs(newInputs);
    console.log(inputs);
  };
  //   ====================================================================================
  // * ===========================[ component section ]====================================
  //   ====================================================================================
  return (
    <>
      <div id="BoardColumns">
        <h3>Board Columns</h3>
        <div>
          {/* map with divs in atlas columns */}
          <ul>
            {inputs.map((e, i) => {
              return (
                <li key={i}>
                  <input
                    onChange={(inputInfo) => {
                      handleInputChange(inputInfo, i);
                    }}
                    type="text"
                    value={e[`input`]}
                  />
                  <Image
                    src={deleteLogo}
                    onClick={() => deleteInput(i)}
                    alt=""
                    className="h-[2rem] w-[2rem] cursor-pointer "
                  />
                </li>
              );
            })}
          </ul>
          <ADD_NEW_COLUMN_BTN fnc={() => ADD_NEW_INPUT_f()} />
          <CREATE_NEW_BOARD_BTN newBoard_state={inputs} />
        </div>
      </div>
    </>
  );
};
