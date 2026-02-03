import { NextResponse } from "next/server"
import jsonwebtoken from "jsonwebtoken"
import { prisma } from "@/lib/prisma"
import { sendEmail } from "@/services/utils/mailUtils"
import { sendSms } from "@/services/utils/smsUtil"
import bcrypt from 'bcrypt'
import { ContactType } from "@prisma/client"

export async function POST(request: Request) {
    try {
        const body: { notifyType: ContactType, value: string } = await request.json()
        const token = request.headers.get("authorization")

        if (!token) {
            return NextResponse.json({ status: 401, message: "Unauthorized" })
        }

        const payload = jsonwebtoken.verify(
            token,
            process.env.JWT_SECRET as string,
        ) as { id: string }

        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: body.value },
                    { phone: body.value },
                ],
            },
        })

        if (user) {
            return NextResponse.json({ status: 409, message: "This contact is already registered" })
        }

        const code = Math.floor(1000 + Math.random() * 9000)

        let ok = false
        if (body.notifyType === 'email') {
            ok = await sendEmail({
                email: body.value,
                subject: "Notification Preferences",
                title: "Notification Preferences",
                message: `Your Otp is ${code}`,
            })
        } else if (body.notifyType === 'phone') {
            ok = await sendSms({
                to: body.value,
                msg: `Your Otp is ${code}`,
            })
        }

        const hashedOtp = await bcrypt.hash(String(code), 10)
        const expiresAt = new Date(Date.now() + 100 * 60 * 1000)

        await prisma.oTP.create({
            data: {
                otp: hashedOtp,
                contactType: body.notifyType as ContactType,
                expiresAt,
                userId: payload.id,
            },
        })

        const tempToken = jsonwebtoken.sign(
            { id: payload.id, notifyType: body.notifyType, value: body.value },
            process.env.JWT_SECRET as string,
            { expiresIn: "1y" },
        )

        return NextResponse.json({
            status: 200,
            data: ok,
            token: tempToken,
            message: "Otp sent successfully",
        })
    } catch {
        return NextResponse.json({
            status: 500,
            message: "Internal server error",
        })
    }
}


export async function PUT(request: Request) {
    // function to update email/phone preference
    try {

        const token = request.headers.get("authorization")

        if (!token) {
            return NextResponse.json({ status: 401, message: "Unauthorized" })
        }

        const payload = jsonwebtoken.verify(
            token,
            process.env.JWT_SECRET as string,
        ) as { id: string, notifyType: ContactType, value: string }

        const updated = await prisma.user.update({
            where: { id: payload.id },
            data: {
                notifyTo: { push: payload.notifyType },
                [payload.notifyType]: payload.value,
            },
        })


        return NextResponse.json({
            status: 200,
            data: updated,
            message: "Contact updated successfully",
        })
    } catch {
        return NextResponse.json({
            status: 500,
            message: "Internal server error",
        })
    }
}
