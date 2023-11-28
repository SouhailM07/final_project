// hooks
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
} from "..";

export default function MyContainer() {
  return (
    <>
      <div className="h-screen  bg-d_body ">
        <Navbar />
        {/* PANELS */}
        <CreateBoard />
        <AddTask_panel />
        <DeletePanel_alert />
        <DeleteTask_panel />
        <SelectedTask_panel />
        <main className="flex">
          <Menubar />
          <Main />
        </main>
      </div>
    </>
  );
}
