import "./mycontainer.css";
// components
import { Navbar, Menubar } from "..";
export default function MyContainer() {
  return (
    <>
      <div className="h-screen  bg-d_body ">
        <Navbar />
        <main className="flex">
          <Menubar />
        </main>
      </div>
    </>
  );
}
