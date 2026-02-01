import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const body: { email: string, code: string } = await request.json();

    console.log('body', body)

    if (!body.email || !body.code) {
      return NextResponse.json({
        status: 400,
        message: "Email and OTP are required",
      });
    }

    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (!user) {
      return NextResponse.json({
        status: 400,
        message: "User not found",
      });
    }

    const otps = await prisma.oTP.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 1,
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

    const isValid = await bcrypt.compare(String(body.code), latestOtp.otp);

    if (!isValid) {
      return NextResponse.json({
        status: 400,
        message: "Invalid OTP",
      });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "10m" }
    );

    return NextResponse.json({
      status: 200,
      token,
      message: "OTP verified",
    });

  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: "Internal server error",
    });
  }
}

export async function PUT(request: Request) {
  try {
    const token = request.headers.get("authorization");
    if (!token) {
      return NextResponse.json({
        status: 401,
        message: "Unauthorized",
      });
    }

    let userId: string;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
      userId = decoded.id;
    } catch (err) {
      return NextResponse.json({
        status: 401,
        message: "Invalid token",
      });
    }

    const body = await request.json();

    if (!body.password) {
      return NextResponse.json({
        status: 400,
        message: "New password is required",
      });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return NextResponse.json({
      status: 200,
      data: updatedUser,
      message: "Password updated successfully",
    });

  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: "Internal server error",
    });
  }
}
