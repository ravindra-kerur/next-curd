// [note] - This folder can take any number of alphanumeric values in it. So that the api will be "/notes/anything(sdewe3434dsS)"

import { NextResponse } from "next/server";
import connect from "@/lib/db";
import User from "@/lib/modals/user";
import { Types } from "mongoose";
import Note from "@/lib/modals/notes";

// We need to get the value from dynamic param [note] which is coing from the URL.
// This can be done using the 'context' parameter

export const GET = async (req: Request, context: { params: any }) => {
  const noteId = context.params.note; // This 'note' should be same as the '[note]' Ex: /notes/abc
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or missing userId" }),
        { status: 400 }
      );
    }

    if (!noteId) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or missing noteId" }),
        { status: 400 }
      );
    }

    await connect();

    // Check if the user exists
    const user = User.findById(userId);
    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    // Find the note and ensure it belongs to the user
    const note = await Note.findOne({ _id: noteId, user: userId });

    if (!note) {
      return new NextResponse(
        JSON.stringify({
          message: "Note not found or does not belong to the user",
        }),
        {
          status: 404,
        }
      );
    }

    return new NextResponse(JSON.stringify({ message: "Note found", note }), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Error in fetching note", error }),
      {
        status: 500,
      }
    );
  }
};


// http://localhost:3000/api/notes/{noteId}?userId={userId}
// Single Note is fetched using dynamic URL 