import { connect } from "@/dbConfig/dbConfig";
import Usertwo from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;

    // Find user based on token
    await connect();
    const user = await Usertwo.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "Invalid or expired token",
        },
        {
          status: 400,
        }
      );
    }

    console.log(user);

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    return NextResponse.json(
      {
        message: "Email verified successfully",
        user,
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
};
