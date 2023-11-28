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
} from "..";

export default function MyContainer() {
  return (
    <>
      <div className="h-screen  bg-d_body ">
        <Navbar />
        <CreateBoard />
        <AddTask_panel />
        <DeletePanel_alert />
        <main className="flex">
          <Menubar />
          <Main />
        </main>
      </div>
    </>
  );
}
