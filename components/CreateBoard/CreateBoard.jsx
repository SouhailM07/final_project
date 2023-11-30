"use client";
// style
import "./createboard.css";
// hooks
import { useState, useEffect, useId } from "react";
import axios from "axios";
// assets
import Image from "next/image";
import plusLogo from "@/public/plus-solid.svg";
import deleteLogo from "@/public/delete-left-solid.svg";

// !=====================[zustand start]=====================================================
import useToggleStore from "@/app/zustand/toggle";
import addBoardsStore from "@/app/zustand/addBoards";
// !=====================[zustand end]=====================================================

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
        <div id="CreateBoard" className="Panel">
          <div
            onClick={() => {
              createBoard_tg_r(false);
            }}
            id="CreateBoard-transparentBackground"
            className="Panel-transparentBackground"
          ></div>
          <div id="CreateBoard-container" className="Panel-container">
            <h2 className="Panel-title">Add New Board</h2>
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
  const newBoard = addBoardsStore((state) => state.newBoard);
  const edit_newBoard_name_r = addBoardsStore(
    (state) => state.edit_newBoard_name_r
  );
  return (
    <>
      <div id="BoardName">
        <label htmlFor="boardName">Board Name</label>
        <input
          onChange={(e) => {
            // console.log(newBoard);
            edit_newBoard_name_r(e.target.value);
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
      <button onClick={fnc} className="ADD_NEW_COLUMN_BTN">
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
  let randomId = useId();
  //
  const newBoard = addBoardsStore((state) => state.newBoard);
  const add_newBoard = addBoardsStore((state) => state.add_newBoard);
  const edit_newBoard_columns_r = addBoardsStore(
    (state) => state.edit_newBoard_columns_r
  );
  const edit_newBoard_id_r = addBoardsStore(
    (state) => state.edit_newBoard_id_r
  );
  // changing the randomId when create new column btn is clicked
  const createBoard_tg_r = useToggleStore((state) => state.createBoard_tg_r);
  useEffect(() => {
    console.log("random Id changed");
  }, [createBoard_tg_r]);
  return (
    <>
      <button
        className="CREATE_NEW_BOARD_BTN"
        onClick={async () => {
          // create_new_board_axios();
          // ! activate after completing redux add_boards
          if (newBoard.name.length > 0) {
            edit_newBoard_id_r(randomId);
            edit_newBoard_columns_r(newBoard_state);
            add_newBoard();
            createBoard_tg_r(false);
            console.log(newBoard);
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
