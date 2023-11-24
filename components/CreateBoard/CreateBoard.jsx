"use client";
// ! redux
import { useDispatch, useSelector } from "react-redux";
import {
  toggle_createBoard_f,
  adding_boardName,
} from "@/app/redux/reducers/createBoard";
// style
import "./createboard.css";
// hooks
import { useState, useEffect, useRef } from "react";
import axios from "axios";
// assets
import Image from "next/image";
import plusLogo from "@/public/plus-solid.svg";
import deleteLogo from "@/public/delete-left-solid.svg";

/*=========================================================================================*/
// component section
/*=========================================================================================*/

export default function CreateBoard() {
  let toggle_createBoard = useSelector(
    (state) => state.toggle_createBoard.toggle_createBoard
  );
  let dispatch = useDispatch();
  return (
    <>
      {toggle_createBoard && (
        <div id="CreateBoard">
          <div
            onClick={() => dispatch(toggle_createBoard_f(false))}
            id="CreateBoard-transparentBackground"
          ></div>
          <div id="CreateBoard-container">
            <h3>Add New Board</h3>
            <BoardName />
            <BoardColumns />
            <CREATE_NEW_BOARD_BTN />
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
          onChange={(e) => dispatch(adding_boardName(e.target.value))}
          type="text"
          id="boardName"
          placeholder="e.g Web Design"
        />
      </div>
    </>
  );
};

let ADD_NEW_COLUMN_BTN = () => {
  return (
    <>
      <button id="ADD_NEW_COLUMN_BTN">
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

let CREATE_NEW_BOARD_BTN = () => {
  let input_boardName = useSelector(
    (state) => state.toggle_createBoard.input_boardName
  );

  let create_new_board_axios = async () => {
    await axios.post("http://localhost:3000/api/boards", {
      board_name: input_boardName,
    });
  };

  let dispatch = useDispatch();
  return (
    <>
      <button
        id="CREATE_NEW_BOARD_BTN"
        onClick={() => {
          // create_new_board_axios();
          dispatch(toggle_createBoard_f(false));
        }}
      >
        Create New Board
      </button>
    </>
  );
};

let BoardColumns = () => {
  // let arrOfTest = ["todo", "doing", "4", "5", "6"];
  let [inputValues, setInputValues] = useState({
    input1: "",
    input2: "",
  });

  // let arrOfTest = [];
  return (
    <>
      <div id="BoardColumns">
        <h3>Board Columns</h3>
        <div>
          {/* map with divs in atlas columns */}
          <ul>
            {Object.keys(inputValues).map((e, i) => {
              return (
                <li key={i}>
                  <input type="text" value={e[e]} />
                  <Image
                    src={deleteLogo}
                    alt=""
                    className="h-[2rem] w-[2rem] cursor-pointer "
                  />
                </li>
              );
            })}
          </ul>
          <ADD_NEW_COLUMN_BTN />
        </div>
        <div>
          {/* map with divs in state inputs like password generator strength bars */}
        </div>
      </div>
    </>
  );
};
