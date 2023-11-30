"use client";
// hooks
import { useState, useEffect } from "react";
//  style
import "./updateboard_panel.css";
//
import addBoardsStore from "@/app/zustand/addBoards";
import useToggleStore from "@/app/zustand/toggle";
// assets
import Image from "next/image";
import deleteLogo from "@/public/delete-left-solid.svg";

export default function UpdateBoard_panel() {
  const arrOfBoards = addBoardsStore((state) => state.arrOfBoards);
  const selected_board = addBoardsStore((state) => state.selected_board);

  const updateBoard_panel_tg_r = useToggleStore(
    (state) => state.updateBoard_panel_tg_r
  );
  let [boardName, setBoardName] = useState("");
  useEffect(() => {
    setBoardName(arrOfBoards[selected_board].name);
  }, []);
  return (
    <>
      <div className="Panel">
        <div
          onClick={() => {
            updateBoard_panel_tg_r(false);
          }}
          className="Panel-transparentBackground"
        ></div>
        <div className="Panel-container flex flex-col min-h-[24rem] w-[30rem] rounded-xl justify-between px-[1rem] py-[2rem]">
          <h2 className="Panel-title">Edit Board</h2>
          {/*  */}
          <div className="flex flex-col my-[1rem]">
            <label htmlFor="">Board Name</label>
            <input
              onChange={(e) => setBoardName(e.target.value)}
              type="text"
              className="full_input"
              value={boardName}
            />
          </div>
          {/*  */}
          <div>
            <BoardColumns boardName_state={boardName} />
          </div>
          {/*  */}
        </div>
      </div>
    </>
  );
}

let BoardColumns = ({ boardName_state }) => {
  const arrOfBoards = addBoardsStore((state) => state.arrOfBoards);
  const selected_board = addBoardsStore((state) => state.selected_board);
  // let selected_board_info = arrOfBoards[selected_board];
  let [boardCols, setBoardCols] = useState(
    arrOfBoards[selected_board]?.columns
  );
  //   ====================================================================================
  // ! ===========================[Board columns functions]================================
  //   ====================================================================================
  // todo :  ============================
  // todo :  add new input to the columns
  // todo :  ============================
  let ADD_NEW_INPUT_f = () => {
    const newInput = { [`input`]: "", tasks: [] };
    setBoardCols([...boardCols, newInput]);
    console.log(boardCols);
  };
  // todo :  =============================
  // todo :  handle input content changing
  // todo :  =============================
  const handleInputChange = (inputInfo, index) => {
    // Create a new array with the updated input value
    const newInputs = [...boardCols];
    newInputs[index][`input`] = inputInfo.target.value;
    // Update the state with the new array
    setBoardCols(newInputs);
    console.log(boardCols);
  };

  // todo :  ==================
  // todo :  deleting an input
  // todo :  ==================
  const deleteInput = (index) => {
    let newInputs = [...boardCols];
    // Remove the input at the specified index
    newInputs = newInputs.filter((e, i) => {
      return i !== index;
    });
    setBoardCols(newInputs);
  };
  // ! important immutable function
  const updateBoard_name_r = addBoardsStore(
    (state) => state.updateBoard_name_r
  );
  const updateBoard_columns_r = addBoardsStore(
    (state) => state.updateBoard_columns_r
  );
  const updateBoard_panel_tg_r = useToggleStore(
    (state) => state.updateBoard_panel_tg_r
  );
  const update_newTask_columnsAvailable_r = addBoardsStore(
    (state) => state.update_newTask_columnsAvailable_r
  );
  useEffect(() => {}, [boardCols]);
  return (
    <>
      <ul className="my-[1rem]">
        <h3>Board Columns</h3>
        {boardCols.map((e, i) => {
          return (
            <li key={i} className="flex items-center justify-between">
              <input
                type="text"
                value={e["input"]}
                className="input_with_img"
                onChange={(inputInfo) => {
                  handleInputChange(inputInfo, i);
                }}
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
      <button onClick={() => ADD_NEW_INPUT_f()} className="ADD_NEW_COLUMN_BTN">
        + Add New Column
      </button>
      <button
        onClick={async () => {
          await updateBoard_name_r(boardName_state);
          await updateBoard_columns_r(boardCols);
          await updateBoard_panel_tg_r(false);
          // await update_newTask_columnsAvailable_r();
          console.log(arrOfBoards);
        }}
        className="CREATE_NEW_BOARD_BTN"
      >
        Save Changes
      </button>
    </>
  );
};
