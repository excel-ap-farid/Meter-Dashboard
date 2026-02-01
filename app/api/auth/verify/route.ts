import { prisma } from "@/lib/prisma";
import { TUser } from "@/services/types";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const token = request.headers.get("authorization");
    if (!token)
      return NextResponse.json({
        status: 401,
        message: "Unauthorized",
      });
    const { id } = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };
    const body: Partial<TUser> = await request.json();

    const otps = await prisma.oTP.findMany({
      where: {
        userId: id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const latestOtp = otps[0];

    if (!latestOtp) {
      return NextResponse.json({
        status: 400,
        message: "No OTP found",
      });
    }

    if (new Date() > latestOtp.expiresAt) {
      return NextResponse.json({
        status: 400,
        message: "OTP expired",
      });
    }

    const isValid = await bcrypt.compare(body.code as string, latestOtp.otp);

    if (!isValid) {
      return NextResponse.json({
        status: 400,
        message: "Invalid code",
      });
    }

    const updated = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        isVerified: true,
      },
    });

    return NextResponse.json({
      status: 200,
      data: updated,
      message: "Successfully verified",
    });
  } catch (error) {
    console.log('error', error)
    return NextResponse.json({
      status: 500,
      message: "Internal server error",
    });
  }
}
