import "./mycontainer.css";
// components
import { Navbar, Menubar, Main, CreateBoard } from "..";
export default function MyContainer() {
  return (
    <>
      <div className="h-screen  bg-d_body ">
        <Navbar />
        <CreateBoard />
        <main className="flex">
          <Menubar />
          <Main />
        </main>
      </div>
    </>
  );
}
