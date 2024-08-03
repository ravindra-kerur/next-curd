import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = async (request: NextRequest) => {
  try {
    const encodedToken = request.cookies.get("token")?.value || "";
    const decodedToken: any = jwt.verify(encodedToken, process.env.TOKEN_SECRET!);
    // "decodedToken" data contains =======> const tokenData = {
    //     id: user._id,
    //     username: user.username,
    //     email: user.email,
    //   };
    return decodedToken.id;
  } catch (error: any) {
    throw new Error(error);
  }
};
