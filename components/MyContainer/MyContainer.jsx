"use client";
// hooks
import { useEffect, useState } from "react";
// style
import "./mycontainer.css";
// components
import {
  Navbar,
  Menubar,
  Main,
  CreateBoard,
  AddTask_panel,
  DeletePanel_alert,
  SelectedTask_panel,
  DeleteTask_panel,
  UpdateBoard_panel,
  UpdateTask_panel,
  Toggle_menubar,
} from "..";
//
import useToggleStore from "@/app/zustand/toggle";

export default function MyContainer() {
  const updateBoard_panel_tg = useToggleStore(
    (state) => state.updateBoard_panel_tg
  );
  const deleteTask_panel_tg = useToggleStore(
    (state) => state.deleteTask_panel_tg
  );
  const taskPanel_tg = useToggleStore((state) => state.taskPanel_tg);
  const updateTask_panel_tg = useToggleStore(
    (state) => state.updateTask_panel_tg
  );
  // ? const darkMode_tg = useToggleStore((state) => state.darkMode_tg);
  const menubar_hide = useToggleStore((state) => state.menubar_hide);
  useEffect(() => {
    document.documentElement.className = "light";
  }, []);
  return (
    <>
      <div className="h-screen  dark:bg-d_body bg-l_body">
        <Navbar />
        {/* PANELS */}
        <CreateBoard />
        <AddTask_panel />
        <DeletePanel_alert />
        {updateTask_panel_tg && <UpdateTask_panel />}
        {deleteTask_panel_tg && <DeleteTask_panel />}
        {taskPanel_tg && <SelectedTask_panel />}
        {updateBoard_panel_tg && <UpdateBoard_panel />}
        <main className="flex">
          <Toggle_menubar />
          {!menubar_hide && <Menubar />}
          <Main />
        </main>
      </div>
    </>
  );
}
