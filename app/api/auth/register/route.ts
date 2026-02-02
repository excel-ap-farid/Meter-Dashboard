import { prisma } from "@/lib/prisma";
import { TUser, TUserRegisterRequestBody } from "@/services/types";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sendEmail } from "@/services/utils/mailUtils";
import { sendSms } from "@/services/utils/smsUtil";

export async function POST(request: Request) {
  try {
    const body: TUserRegisterRequestBody = await request.json()

    console.log("body", body)

    const find = await prisma.user.findFirst({
      where: {
        [body.contactType]: body.contact
      }
    })

    if (find) {
      return NextResponse.json({
        status: 401,
        message: "Already registered. Try to login",
      })
    }

    const code = Math.floor(1000 + Math.random() * 9000)
    let ok = false

    if (body.contactType === "email") {
      ok = await sendEmail({
        email: body.contact,
        subject: "Your verification code",
        title: "Your verification code",
        message: `<p>Your code is <b>${code}</b>.</p>`,
      })
    } else {
      ok = await sendSms({
        to: body.contact,
        msg: `Your verification code is ${code}`,
      })
    }

    if (!ok) {
      return NextResponse.json({
        status: 400,
        message: "Invalid contact",
      })
    }

    const hashedOtp = await bcrypt.hash(String(code), 10)
    const hashedPassword = await bcrypt.hash(body.password, 10)
    const expiresAt = new Date(Date.now() + 100 * 60 * 1000)

    const created = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: body.contactType === "email" ? body.contact : null,
          phone: body.contactType === "phone" ? body.contact : null,
          password: hashedPassword,
          isVerified: false,
        },
      })

      await tx.oTP.create({
        data: {
          otp: hashedOtp,
          contactType: body.contactType,
          expiresAt,
          userId: user.id,
        },
      })

      return user
    })

    const token = jwt.sign(
      { id: created.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1y" },
    )

    delete (created as any).password

    return NextResponse.json({
      status: 201,
      data: created,
      token,
      message: "Verification code sent",
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      status: 500,
      message: "Internal server error",
    })
  }
}
