import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Usertwo from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

// connect();

export const GET = async (request: NextRequest) => {
  try {
    await connect();
    const useId = await getDataFromToken(request);
    const user = await Usertwo.findOne({ _id: useId }).select("-password");
    // Use .select to remove fileds which you don't need
    return NextResponse.json({
      message: "User found",
      status: 200,
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 400,
      message: error.message,
      error,
    });
  }
};
