import { create } from "zustand";
import { persist } from "zustand/middleware";
import * as flatted from "flatted";

let addBoardsStore = create(
  persist(
    (set) => ({
      // ==
      // states
      // ==
      arrOfBoards: [],
      newBoard: {
        id: "",
        name: "",
        columns: [],
      },
      selected_board: "",
      newTask: {
        taskName: "",
        description: "",
        subtasks: [],
        ColumnIndex: "",
        ColumnsAvailable: [],
      },
      selected_task_column: "",
      selected_task: "",
      selected_subtask: "",
      // ! the key to solve the final problem
      selected_status_to_move: "",
      // ==
      //  ! reducers
      // ==
      // todo ==
      // todo : adding new board reducers
      // todo ==
      edit_newBoard_name_r: (st) =>
        set((state) => ({
          newBoard: {
            ...state.newBoard,
            name: st,
          },
        })),
      edit_newBoard_id_r: (st) =>
        set((state) => ({
          newBoard: {
            ...state.newBoard,
            id: st,
          },
        })),
      edit_newBoard_columns_r: (st) =>
        set((state) => ({
          newBoard: {
            ...state.newBoard,
            columns: st,
          },
        })),
      add_newBoard: () =>
        set((state) => {
          const updated_arrOfBoards = [...state.arrOfBoards, state.newBoard];
          return {
            arrOfBoards: updated_arrOfBoards,
            newBoard: {
              id: "",
              name: "",
              columns: "",
            },
          };
        }),
      select_the_board: (Index) => set((state) => ({ selected_board: Index })),
      // ==
      // todo : adding new task reducers
      // ==
      edit_newTask_name_r: (st) =>
        set((state) => ({
          newTask: {
            ...state.newTask,
            taskName: st,
          },
        })),
      edit_newTask_description_r: (st) =>
        set((state) => ({
          newTask: {
            ...state.newTask,
            description: st,
          },
        })),
      edit_newTask_subtasks_r: (st) =>
        set((state) => ({
          newTask: {
            ...state.newTask,
            subtasks: st,
          },
        })),
      edit_newTask_columnsAvailable_r: (st) =>
        set((state) => ({
          newTask: {
            ...state.newTask,
            ColumnsAvailable: state.arrOfBoards[
              state.selected_board
            ]?.columns.map((column, index) => index),
          },
        })),

      edit_newTask_index_r: (st) =>
        set((state) => ({
          newTask: {
            ...state.newTask,
            ColumnIndex: st,
          },
        })),
      add_newTask_r: () =>
        set((state) => {
          let boardIndex = +state.selected_board;
          let taskIndex = +state.newTask.ColumnIndex;
          let board = state.arrOfBoards[boardIndex];
          let column = board?.columns[taskIndex];

          if (board && column) {
            let newTasks = [...column.tasks, state.newTask];

            let newColumns = board.columns.map((col, index) =>
              index == taskIndex ? { ...col, tasks: newTasks } : col
            );

            let newBoard = { ...board, columns: newColumns };
            let newBoards = state.arrOfBoards.map((b, index) =>
              index == boardIndex ? newBoard : b
            );

            return {
              ...state,
              arrOfBoards: newBoards,
              newTask: {
                taskName: "",
                description: "",
                subtasks: [],
                ColumnIndex: "",
              },
            };
          } else {
            return state;
          }
        }),
      // todo ==
      // todo : deleting reducers
      // todo ==
      delete_board_r: () =>
        set((state) => {
          const updated_arrOfBoards = state.arrOfBoards.filter((e, i) => {
            return i != +state.selected_board;
          });
          return {
            arrOfBoards: updated_arrOfBoards,
          };
        }),
      delete_task_r: () =>
        set((state) => {
          const selectedBoardIndex = +state.selected_board;
          const selectedTaskColumnIndex = +state.selected_task_column;
          const selectedTaskIndex = +state.selected_task;

          // Copy the existing state
          const updatedArrOfBoards = [...state.arrOfBoards];

          // Get the selected board
          const selectedBoard = updatedArrOfBoards[selectedBoardIndex];

          // Get the selected column
          const selectedColumn = selectedBoard.columns[selectedTaskColumnIndex];

          // Filter out the selected task from the column's tasks
          const updatedTasks = selectedColumn.tasks.filter(
            (task, i) => i !== selectedTaskIndex
          );

          // Create a new column with the updated tasks
          const updatedColumn = { ...selectedColumn, tasks: updatedTasks };

          // Create a new board with the updated column
          const updatedBoard = {
            ...selectedBoard,
            columns: selectedBoard.columns.map((col, index) =>
              index == selectedTaskColumnIndex ? updatedColumn : col
            ),
          };

          // Update the selected board in the array of boards
          updatedArrOfBoards[selectedBoardIndex] = updatedBoard;

          return {
            arrOfBoards: updatedArrOfBoards,
            selected_task_column: 0,
            selected_task: 0,
          };
        }),

      // todo ==
      // todo : selected task reducers
      // todo ==
      selected_task_r: (st) => set((state) => ({ selected_task: st })),
      selected_task_column_r: (st) =>
        set((state) => ({ selected_task_column: st })),
      // todo ==
      // todo : updating  board reducers
      // todo ==
      updateBoard_name_r: (st) =>
        set((state) => {
          const updated_arrOfBoards = state.arrOfBoards.map((board, index) => {
            if (index == state.selected_board) {
              return {
                ...board,
                name: st,
              };
            } else {
              return board;
            }
          });

          return {
            arrOfBoards: updated_arrOfBoards,
          };
        }),
      updateBoard_columns_r: (st) =>
        set((state) => {
          const updated_arrOfBoards = state.arrOfBoards.map((board, index) => {
            if (index == state.selected_board) {
              return {
                ...board,
                columns: st,
              };
            } else {
              return board;
            }
          });

          return {
            arrOfBoards: updated_arrOfBoards,
          };
        }),
      // todo ==
      // todo : updating  task reducers
      // todo ==
      updateTask_name_r: (st) =>
        set((state) => {
          const updated_arrOfBoards = state.arrOfBoards.map(
            (board, boardIndex) => {
              if (boardIndex == state.selected_board) {
                const updatedColumns = board.columns.map(
                  (column, columnIndex) => {
                    if (columnIndex == state.selected_task_column) {
                      const updatedTasks = column.tasks.map(
                        (task, taskIndex) => {
                          if (taskIndex == state.selected_task) {
                            return {
                              ...task,
                              taskName: st,
                            };
                          } else {
                            return task;
                          }
                        }
                      );

                      return {
                        ...column,
                        tasks: updatedTasks,
                      };
                    } else {
                      return column;
                    }
                  }
                );

                return {
                  ...board,
                  columns: updatedColumns,
                };
              } else {
                return board;
              }
            }
          );

          return {
            ...state,
            arrOfBoards: updated_arrOfBoards,
          };
        }),
      update_newTask_columnsAvailable_r: (st) =>
        set((state) => {
          const updated_arrOfBoards = state.arrOfBoards.map(
            (board, boardIndex) => {
              if (boardIndex == state.selected_board) {
                const updatedColumns = board.columns.map(
                  (column, columnIndex) => {
                    if (columnIndex == state.selected_task_column) {
                      const updatedTasks = column.tasks.map(
                        (task, taskIndex) => {
                          if (taskIndex == state.selected_task) {
                            return {
                              ...task,
                              ColumnsAvailable: st,
                            };
                          } else {
                            return task;
                          }
                        }
                      );

                      return {
                        ...column,
                        tasks: updatedTasks,
                      };
                    } else {
                      return column;
                    }
                  }
                );

                return {
                  ...board,
                  columns: updatedColumns,
                };
              } else {
                return board;
              }
            }
          );

          return {
            ...state,
            newTask: {
              ...state.newTask,
              ColumnsAvailable: [
                ...state.arrOfBoards[state.selected_board]?.columns,
              ],
            },
            arrOfBoards: updated_arrOfBoards,
          };
        }),

      updateTask_description_r: (st) =>
        set((state) => {
          const updated_arrOfBoards = state.arrOfBoards.map(
            (board, boardIndex) => {
              if (boardIndex == state.selected_board) {
                const updatedColumns = board.columns.map(
                  (column, columnIndex) => {
                    if (columnIndex == state.selected_task_column) {
                      const updatedTasks = column.tasks.map(
                        (task, taskIndex) => {
                          if (taskIndex == state.selected_task) {
                            return {
                              ...task,
                              description: st,
                            };
                          } else {
                            return task;
                          }
                        }
                      );

                      return {
                        ...column,
                        tasks: updatedTasks,
                      };
                    } else {
                      return column;
                    }
                  }
                );

                return {
                  ...board,
                  columns: updatedColumns,
                };
              } else {
                return board;
              }
            }
          );

          return {
            ...state,
            arrOfBoards: updated_arrOfBoards,
          };
        }),
      updateTask_status: () =>
        set((state) => {
          const selectedBoardIndex = +state.selected_board;
          const selectedTaskColumnIndex = +state.selected_task_column;
          const selectedTaskIndex = +state.selected_task;
          const selectedStatusToMove = +state.selected_status_to_move;

          // Copy the existing state
          const updatedArrOfBoards = state.arrOfBoards.map(
            (board, boardIndex) => {
              if (boardIndex === selectedBoardIndex) {
                const updatedColumns = board.columns.map(
                  (column, columnIndex) => {
                    if (columnIndex === selectedTaskColumnIndex) {
                      const selectedTask = column.tasks[selectedTaskIndex];

                      // Check if the ColumnIndex property is not the same as selected_status_to_move
                      if (selectedTask.ColumnIndex !== selectedStatusToMove) {
                        // Remove the selected task from its original column
                        const updatedTasksOriginal = column.tasks.filter(
                          (task, i) => i !== selectedTaskIndex
                        );

                        // Create a new task with the updated ColumnIndex
                        const updatedTask = {
                          ...selectedTask,
                          ColumnIndex: selectedStatusToMove,
                        };

                        // Add the selected task to the new column
                        const updatedTasksNew = [
                          ...board.columns[selectedStatusToMove].tasks,
                          updatedTask,
                        ];

                        return { ...column, tasks: updatedTasksOriginal };
                      }
                    }
                    return column;
                  }
                );

                return { ...board, columns: updatedColumns };
              }
              return board;
            }
          );

          return {
            arrOfBoards: updatedArrOfBoards,
          };
        }),

      updateTask_subtasks_r: (st) =>
        set((state) => {
          const updated_arrOfBoards = state.arrOfBoards.map(
            (board, boardIndex) => {
              if (boardIndex == state.selected_board) {
                const updatedColumns = board.columns.map(
                  (column, columnIndex) => {
                    if (columnIndex == state.selected_task_column) {
                      const updatedTasks = column.tasks.map(
                        (task, taskIndex) => {
                          if (taskIndex == state.selected_task) {
                            return {
                              ...task,
                              subtasks: st,
                            };
                          } else {
                            return task;
                          }
                        }
                      );

                      return {
                        ...column,
                        tasks: updatedTasks,
                      };
                    } else {
                      return column;
                    }
                  }
                );

                return {
                  ...board,
                  columns: updatedColumns,
                };
              } else {
                return board;
              }
            }
          );

          return {
            ...state,
            arrOfBoards: updated_arrOfBoards,
          };
        }),
      updateTask_subtask_r: (st) =>
        set((state) => {
          const updated_arrOfBoards = state.arrOfBoards.map(
            (board, boardIndex) => {
              if (boardIndex == state.selected_board) {
                const updatedColumns = board.columns.map(
                  (column, columnIndex) => {
                    if (columnIndex == state.selected_task_column) {
                      const updatedTasks = column.tasks.map(
                        (task, taskIndex) => {
                          if (taskIndex == state.selected_task) {
                            const updatedSubtasks = task.subtasks.map(
                              (subtask, subtaskIndex) => {
                                if (subtaskIndex == st) {
                                  return {
                                    ...subtask,
                                    // Replace 'state' with the actual property you want to update.
                                    state: !subtask.state,
                                  };
                                } else {
                                  return subtask;
                                }
                              }
                            );

                            return {
                              ...task,
                              subtasks: updatedSubtasks,
                            };
                          } else {
                            return task;
                          }
                        }
                      );

                      return {
                        ...column,
                        tasks: updatedTasks,
                      };
                    } else {
                      return column;
                    }
                  }
                );

                return {
                  ...board,
                  columns: updatedColumns,
                };
              } else {
                return board;
              }
            }
          );

          return {
            ...state,
            arrOfBoards: updated_arrOfBoards,
          };
        }),
      selected_status_to_move_r: (st) =>
        set((state) => ({ selected_status_to_move: st })),
      updateTask_status: () =>
        set((state) => {
          const selectedBoardIndex = +state.selected_board;
          const selectedTaskColumnIndex = +state.selected_task_column;
          const selectedTaskIndex = +state.selected_task;
          const selectedStatusToMove = +state.selected_status_to_move;

          // Copy the existing state
          const updatedArrOfBoards = [...state.arrOfBoards];

          // Get the selected board
          const selectedBoard = updatedArrOfBoards[selectedBoardIndex];

          // Get the selected column
          const selectedColumn = selectedBoard.columns[selectedTaskColumnIndex];

          // Get the selected task
          const selectedTask = selectedColumn.tasks[selectedTaskIndex];

          // Check if the ColumnIndex property is not the same as selected_status_to_move
          if (selectedTask.ColumnIndex != selectedStatusToMove) {
            // Update the ColumnIndex property of the selected task
            selectedTask.ColumnIndex = selectedStatusToMove;

            // Remove the selected task from its original column
            selectedColumn.tasks = selectedColumn.tasks.filter(
              (task, i) => i != selectedTaskIndex
            );

            // Add the selected task to the new column
            selectedBoard.columns[selectedStatusToMove].tasks.push(
              selectedTask
            );

            // Update the selected column in the selected board
            selectedBoard.columns[selectedTaskColumnIndex] = selectedColumn;
          }

          // Update the selected board in the array of boards
          updatedArrOfBoards[selectedBoardIndex] = selectedBoard;

          return {
            arrOfBoards: updatedArrOfBoards,
          };
        }),
    }),
    {
      name: "addBoardsStore_3",
      serialize: (state) => flatted.stringify(state),
      deserialize: (state) => flatted.parse(state),
    }
  )
);

// making this store like localStorage
// addBoardsStore = persist(addBoardsStore);

export default addBoardsStore;
