"use client";
// ! redux
import { useDispatch, useSelector } from "react-redux";
// hooks
import { useEffect } from "react";
import "./mycontainer.css";
// components
import { Navbar, Menubar, Main, CreateBoard, AddTask_panel } from "..";

export default function MyContainer() {
  let arrOfBoards = useSelector((state) => state.add_boards.arrOfBoards);
  useEffect(() => {
    console.log("MyContainer was updated");
  }, [arrOfBoards]);

  return (
    <>
      <div className="h-screen  bg-d_body ">
        <Navbar />
        <CreateBoard />
        <AddTask_panel />
        <main className="flex">
          <Menubar />
          <Main />
        </main>
      </div>
    </>
  );
}
