import { NextRequest, NextResponse } from "next/server";
import connectMongoose from "@/lib/connectMongoose";
import { Board } from "../boards/boards_model";
import mongoose from "mongoose";

export async function PUT(request) {
  try {
    await connectMongoose();
    let id = await request.nextUrl.searchParams.get("id");
    const { columnName } = await request.json();
    let editedBoard = await Board.findById(id);
    //
    const newColumn = {
      id: new mongoose.Types.ObjectId(),
      name: columnName,
      tasks: [],
      len: "",
    };
    newColumn.len = await newColumn.tasks.length;
    //
    await editedBoard.columns.push(newColumn);
    await editedBoard.save();
    return NextResponse.json(
      { message: `new column was added / ${columnName}` },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
