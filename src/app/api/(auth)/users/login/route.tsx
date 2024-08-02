import { connect } from "@/dbConfig/dbConfig";
import Usertwo from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const POST = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;

    await connect();

    // Check if uer exists
    const user = await Usertwo.findOne({ email });
    if (!user) {
      return NextResponse.json(
        {
          error: "User does not exist",
        },
        { status: 400 }
      );
    }

    // Check if password is correct
    // const validPassword = await bcryptjs.compare(password, user.password);
    // if (!validPassword) {
    //   return NextResponse.json(
    //     {
    //       error: "Invalid password",
    //     },
    //     { status: 400 }
    //   );
    // }
    if (password !== user.password) {
      return NextResponse.json(
        {
          error: "Invalid password",
        },
        { status: 400 }
      );
    }

    // Create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1h",
    });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {}
};
