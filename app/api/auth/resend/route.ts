import { prisma } from "@/lib/prisma";
import { TUser } from "@/services/types";

import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { sendEmail } from "@/services/utils/mailUtils";
import { sendSms } from "@/services/utils/smsUtil";

export async function POST(request: Request) {
  try {
    const body: { contact: string } = await request.json()


    const found = await prisma.user.findFirst({
      where: {
        OR: [{ email: body.contact }, { phone: body.contact }],
      },
    })


    if (!found) {
      return NextResponse.json({
        status: 400,
        message: "Invalid contact",
      })
    }

    const code = Math.floor(1000 + Math.random() * 9000)
    let ok = false

    if (found.contactType === "email") {

      ok = await sendEmail({
        email: body.contact,
        subject: "Your verification code",
        title: "Your verification code",
        message: `<p>Your code is <b>${code}</b>.</p>`,
      })
    } else {
      console.log('code', code)

      ok = await sendSms({
        to: body.contact,
        msg: `Your verification code is ${code}`,
      })
    }

    if (!ok) {
      return NextResponse.json({
        status: 400,
        message: "Failed to send verification code",
      })
    }

    const hashedOtp = await bcrypt.hash(String(code), 10)
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000)

    await prisma.oTP.create({
      data: {
        otp: hashedOtp,
        contactType: found.contactType,
        expiresAt,
        userId: found.id,
      },
    })

    return NextResponse.json({
      status: 201,
      message: "Verification code sent",
    })
  } catch {
    return NextResponse.json({
      status: 500,
      message: "Internal server error",
    })
  }
}
