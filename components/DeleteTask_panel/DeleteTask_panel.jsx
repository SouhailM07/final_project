"use client";
import "./deletetask_panel.css";
//
import useToggleStore from "@/app/zustand/toggle";
import addBoardsStore from "@/app/zustand/addBoards";

export default function DeleteTask_panel() {
  // task_settings_tg_r
  const arrOfBoards = addBoardsStore((state) => state.arrOfBoards);
  const selected_task = addBoardsStore((state) => state.selected_task);
  const deleteTask_panel_tg = useToggleStore(
    (state) => state.deleteTask_panel_tg
  );
  const deleteTask_panel_tg_r = useToggleStore(
    (state) => state.deleteTask_panel_tg_r
  );
  const selected_task_column = addBoardsStore(
    (state) => state.selected_task_column
  );
  let selected_task_details =
    arrOfBoards[+selected_task]?.columns[+selected_task_column].tasks[
      selected_task
    ];
  return (
    <>
      {deleteTask_panel_tg && (
        <div id="DeleteTask_panel" className="Panel z-[8]">
          <div className="Panel-transparentBackground"></div>
          <div className="Panel-container px-[2rem] w-[34rem] min-h-[18rem]  rounded-xl flex flex-col items-center justify-between py-[2rem]">
            <h2 className="w-full font-bold text-[2rem] text-red-500">
              Delete this board?
            </h2>
            <div className=" h-[10rem] flex flex-col justify-between">
              <p className="text-[1.2rem]">
                Are you sure you want to delete the
                <span className="text-red-500">
                  " {selected_task_details?.taskName || "test"} "
                </span>
                board? This action will remove all columns and tasks and cannot
                be reversed.
              </p>
              <div className="flex justify-between">
                <button
                  onClick={() => {
                    // delete_panel_alert_tg_r(false);
                    // delete_board_r();
                    // board_settings_tg_r();
                  }}
                  className=" bg-red-500"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    deleteTask_panel_tg_r(false);

                    // board_settings_tg_r();
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
