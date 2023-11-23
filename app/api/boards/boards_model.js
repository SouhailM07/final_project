import mongoose, { Schema } from "mongoose";

const boardModel = new Schema({
  name: String,
  columns: [],
});

export const Board = mongoose.model("boards", boardModel);

// let board = {
//     name: "Platform",
//     columns: [
//       {
//         name: "todo",
//         len: "4",
//         tasks: [
//           {
//             taskName: "",
//             description: "",
//             subtasks: [{ subTaskNameL: "", state: "" }],
//           },
//         ],
//       },
//     ],
//   };
