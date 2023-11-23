import "./createboard.css";
// assets
import Image from "next/image";
import plusLogo from "../../public/plus-solid.svg";

export default function CreateBoard() {
  return (
    <>
      <div className="bg-[#0000008a] fixed top-0 flex justify-center items-center h-full w-full text-white z-[10] ">
        <div className="bg-d_component min-h-[30rem] w-[32rem] px-[2rem] py-[2rem] rounded-xl flex flex-col justify-between">
          <h3>Add New Board</h3>
          <BoardName />
          <BoardColumns />
          <CREATE_NEW_BOARD_BTN />
        </div>
      </div>
    </>
  );
}

let BoardName = () => {
  return (
    <>
      <div className="text-white flex flex-col">
        <label htmlFor="boardName">Board Name</label>
        <input
          type="text"
          name=""
          id="boardName"
          className="bg-transparent border-2 border-gray-500"
        />
      </div>
    </>
  );
};

let ADD_NEW_COLUMN_BTN = () => {
  return (
    <>
      <button className="rounded-full flex items-center justify-center py-[0.7rem] bg-gray-600 space-x-[1rem] font-bold text-[1.3rem] text-act w-full">
        <Image src={plusLogo} alt="" className="h-[1.5rem] w-[1.5rem] " />
        <span>Add New Column</span>
      </button>
    </>
  );
};

let CREATE_NEW_BOARD_BTN = () => {
  return (
    <>
      <button className=" bg-act  rounded-full flex  justify-center py-[0.7rem]  space-x-[1rem] font-bold text-[1.3rem] text-white w-full">
        Create New Board
      </button>
    </>
  );
};

let BoardColumns = () => {
  return (
    <>
      <h3>Board Columns</h3>
      <div>
        {/* map with divs in atlas columns */}
        <ADD_NEW_COLUMN_BTN />
      </div>
      <div>
        {/* map with divs in state inputs like password generator strength bars */}
      </div>
    </>
  );
};
