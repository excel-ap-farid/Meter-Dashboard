import { prisma } from "@/lib/prisma";
import { TUser } from "@/services/types";

import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { sendEmail } from "@/services/utils/mailUtils";

export async function POST(request: Request) {
  try {
    const body: Partial<TUser> = await request.json();

    const found = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });


    if (found) {
      const code = Math.floor(1000 + Math.random() * 9000);

      const ok = await sendEmail({
        email: body?.email as string,
        subject: "Your verification code",
        title: "Your verification code",
        message: `<h3>Hello User,</h3>
        <p>Your code is <b>${code}</b>.</p>
        <p>This code will expire soon.</p>`,
      });
      if (ok) {
        const hashedOtp = await bcrypt.hash(String(code), 10);
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

        await prisma.oTP.create({
          data: {
            otp: hashedOtp,
            sendingMethod: "EMAIL",
            expiresAt: expiresAt,
            userId: found.id,
          },
        });
        return NextResponse.json({
          status: 201,
          data: found,
          message: "An email has been sent with verification code",
        });
      }
    } else {
      return NextResponse.json({
        status: 400,
        message: "Invalid email",
      });
    }
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Internal server error",
    });
  }
}
