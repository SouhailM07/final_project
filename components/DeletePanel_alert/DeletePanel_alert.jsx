"use client";
// style
import "./deletepanel_alert.css";
//
import useToggleStore from "@/app/zustand/toggle";
import addBoardsStore from "@/app/zustand/addBoards";

export default function DeletePanel_alert() {
  const arrOfBoards = addBoardsStore((state) => state.arrOfBoards);
  const selected_board = addBoardsStore((state) => state.selected_board);
  const delete_panel_alert_tg_r = useToggleStore(
    (state) => state.delete_panel_alert_tg_r
  );
  const delete_panel_alert_tg = useToggleStore(
    (state) => state.delete_panel_alert_tg
  );
  const delete_board_r = addBoardsStore((state) => state.delete_board_r);
  const board_settings_tg_r = useToggleStore(
    (state) => state.board_settings_tg_r
  );
  return (
    <>
      {delete_panel_alert_tg && (
        <div id="DeletePanel_alert" className="Panel ">
          <div className="Panel-transparentBackground"></div>
          <div
            id="DeletePanel_alert-container"
            className="Panel-container px-[2rem] w-[34rem] h-[18rem] rounded-xl flex flex-col items-center justify-between py-[2rem]"
          >
            <h2 className="w-full font-bold text-[2rem] text-red-500">
              Delete this board?
            </h2>
            <div className=" h-[10rem] flex flex-col justify-between">
              <p className="text-[1.2rem]">
                Are you sure you want to delete the
                <span className="text-red-500">
                  " {arrOfBoards[+selected_board]?.name || "test"} "
                </span>
                board? This action will remove all columns and tasks and cannot
                be reversed.
              </p>
              <div className="flex justify-between">
                <button
                  onClick={() => {
                    delete_panel_alert_tg_r(false);
                    delete_board_r();
                    board_settings_tg_r();
                  }}
                  className=" bg-red-500"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    delete_panel_alert_tg_r(false);
                    board_settings_tg_r();
                  }}
                  className=" bg-white text-act"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
