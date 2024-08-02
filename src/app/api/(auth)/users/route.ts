import connect from "@/lib/db";
import User from "@/lib/modals/user";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

const ObjectId = require("mongoose").Types.ObjectId;
// Pre defined objectID - When ever new document is created in mongoose db, it has an 'id' wheathe it is 'User' or 'Notes' table.
// Mongoose db gives use a function that can be used to check if the 'id'is valid or not

export const GET = async () => {
  try {
    await connect();
    const users = await User.find();
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new NextResponse("Error in featching users", { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    await connect();
    const newUser = new User(body);
    await newUser.save();
    return new NextResponse(
      JSON.stringify({ message: "User is created", user: newUser }),
      { status: 201 }
    );
  } catch (error) {}
};

export const PATCH = async (req: Request) => {
  try {
    const body = await req.json();
    const { userId, newUserName } = body;
    // userId - user who needs to be updated
    // newUserName - data for this particular user that needs to be updated inside that user

    await connect();

    if (!userId || !newUserName) {
      return new NextResponse(
        JSON.stringify({ message: "ID  or new username are required" }),
        { status: 400 }
      );
    }

    if (!Types.ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid userID" }), {
        status: 400,
      });
    }

    const updateUser = await User.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { username: newUserName },
      { new: true } // This will return new Object
    );

    if (!updateUser) {
      return new NextResponse(
        JSON.stringify({
          message: "User not found or disn't update user successfully",
        }),
        {
          status: 400,
        }
      );
    }

    return new NextResponse(
      JSON.stringify({
        message: "Username updated successfully",
        user: updateUser,
      }),
      {
        status: 200,
      }
    );
    // =========== //
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: "Error updating username",
        error,
      }),
      {
        status: 500,
      }
    );
  }
};

export const DELETE = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    // Validate the userId
    if (!userId) {
      return new NextResponse(
        JSON.stringify({ message: "UserId is required" }),
        { status: 400 }
      );
    }

    // Validate if useId is a valid ObjectId
    if (!Types.ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid userID" }), {
        status: 400,
      });
    }

    const deletedUser = await User.findByIdAndDelete(
      new Types.ObjectId(userId)
    );

    // Check if the user was found and deleted
    if (!deletedUser) {
      return new NextResponse(
        JSON.stringify({
          message: "User not found",
        }),
        {
          status: 400,
        }
      );
    }

    // Return Success Response
    return new NextResponse(
      JSON.stringify({
        message: "User deleted successfully",
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: "Error deleting user",
        error,
      }),
      {
        status: 500,
      }
    );
  }
};
