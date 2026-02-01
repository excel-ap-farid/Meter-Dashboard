import { prisma } from "@/lib/prisma";
import { TUser } from "@/services/types";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const body: Partial<TUser> = await request.json();

    const find = await prisma.user.findFirst({
      where: { email: body.email as string },
    });

    if (find) {
      if(find.password){
          const isPasswordValid = await bcrypt.compare(body.password as string, find.password);
          if(!isPasswordValid){
            return NextResponse.json({
              status: 400,
              message: "Invalid email or password",
            });
          }
      }
      const token = jwt.sign(
        { id: find.id },
        process.env.JWT_SECRET as string,
        { expiresIn: "1y" },
      );
      return NextResponse.json({
        status: 200,
        data: find,
        token,
        message: "Successfully logged in",
      });
    } else {
      return NextResponse.json({
        status: 400,
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Internal server error",
    });
  }
}
