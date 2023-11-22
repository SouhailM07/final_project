import "./navbar.css";
// assets
import Image from "next/image";
import plusLogo from "@/public/plus-solid.svg";
import editLogo from "@/public/ellipsis-vertical-solid.svg";
import kanbanLogo from "@/public/bars-solid.svg";
export default function Navbar() {
  return (
    <>
      <nav className=" h-[5rem] text-white bg-gray-800 flex items-center justify-between px-[2rem]">
        <div className="grid grid-cols-2 min-w-[43rem] items-center">
          <div className="flex items-center">
            <Image
              src={kanbanLogo}
              alt=""
              className="h-[3rem] w-[3rem] rotate-90 mr-[1rem]"
            />
            <span className="text-[2.8rem] font-bold">Kanban</span>
          </div>
          <div className="text-act text-[1.8rem] font-bold">Board name</div>
        </div>
        <div className="flex justify-between space-x-2">
          <button className="shadow-2xl flex items-center justify-center space-x-3 w-[12rem] h-[3rem] rounded-full bg-act">
            <Image src={plusLogo} className="h-[1rem] w-[1rem]" />
            <span>Add New Task</span>
          </button>
          <button>
            <Image src={editLogo} className="h-[2.5rem] w-[3rem]" />
          </button>
        </div>
      </nav>
    </>
  );
}
