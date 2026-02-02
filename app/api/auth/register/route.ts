import { prisma } from "@/lib/prisma";
import { TUser } from "@/services/types";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sendEmail } from "@/services/utils/mailUtils";

export async function POST(request: Request) {
  try {
    const body: Partial<TUser> = await request.json();

    const find = await prisma.user.findUnique({
      where: { email: body.email as string },
    });

    if (find) {
      return NextResponse.json({
        status: 401,
        message: "Already registered. Try to login",
      });
    }
    const code = Math.floor(1000 + Math.random() * 9000);

    const ok = await sendEmail({
      email: body?.email as string,
      subject: "Your verification code",
      title: "Your verification code",
      message: ` <h3>Hello User,</h3>
      <p>Your code is <b>${code}</b>.</p>
      <p>This code will expire soon.</p>`,
    });

    if (!ok) {
      return NextResponse.json({
        status: 400,
        message: "Invalid email",
      });
    } else {
      const hashedOtp = await bcrypt.hash(String(code), 10);
      const hashedPassword = await bcrypt.hash(body.password as string, 10);
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

      const created = await prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
          data: {
            email: body.email as string,
            password: hashedPassword,
            isVerified: false,
          },
        });

        await tx.oTP.create({
          data: {
            otp: hashedOtp,
            sendingMethod: "EMAIL",
            expiresAt: expiresAt,
            userId: user.id,
          },
        });

        return user;
      });

      if (created.id) {
        const token = jwt.sign(
          { id: created.id },
          process.env.JWT_SECRET as string,
          { expiresIn: "1y" },
        );
        return NextResponse.json({
          status: 201,
          data: created,
          token,
          message: "An email has been sent with verification code",
        });
      }
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      status: 500,
      message: "Internal server error",
    });
  }
}
