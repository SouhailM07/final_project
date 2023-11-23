import { NextRequest, NextResponse } from "next/server";
import connectMongoose from "@/lib/connectMongoose";
import { Board } from "./boards_model";

export async function GET() {
  await connectMongoose();
  let boards = await Board.find({});
  return NextResponse.json({ data: boards }, { status: 200 });
}

export async function POST(request) {
  try {
    await connectMongoose();

    const { name } = await request.json();
    let newBoard = new Board({ name });
    await newBoard.save();
    return NextResponse.json(
      { message: `new board was created ${name}` },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
