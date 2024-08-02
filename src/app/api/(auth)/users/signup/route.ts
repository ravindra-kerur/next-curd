import { connect } from "@/dbConfig/dbConfig";
import Usertwo from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

// connect();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    await connect();
    // Check if user already exists
    const user = await Usertwo.findOne({ email });
    if (user) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Hash Password
    // const salt = await bcryptjs.getSalt(10);
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create new User
    const newUser = new Usertwo({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();

    return NextResponse.json(
      {
        message: "User created successfully",
        user: savedUser,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error, status: 500 });
  }
};
