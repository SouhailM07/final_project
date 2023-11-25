// hooks
import "./mycontainer.css";
// components
import { Navbar, Menubar, Main, CreateBoard, AddTask_panel } from "..";

export default function MyContainer() {
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
