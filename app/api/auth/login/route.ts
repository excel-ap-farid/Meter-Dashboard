import { prisma } from "@/lib/prisma";
import { TUser, TUserLoginRequestBody } from "@/services/types";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const body: TUserLoginRequestBody = await request.json();

    const find = await prisma.user.findFirst({
      where: {
        OR: [
          { email: body.contact },
          { phone: body.contact },
        ],
      },
    })


    if (find) {
      if (find.password) {
        const isPasswordValid = await bcrypt.compare(body.password as string, find.password);
        if (!isPasswordValid) {
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
      delete (find as any).password;
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
