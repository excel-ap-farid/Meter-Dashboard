import { NextResponse } from "next/server";
import jsonwebtoken from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const token = request.headers.get("authorization");
    if (!token)
      return NextResponse.json({
        status: 401,
        message: "Unauthorized",
      });
    const { id } = jsonwebtoken.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as { id: string };
    const user = await prisma.user.findUnique({ where: { id } });
    if (user) {
      return NextResponse.json({
        status: 200,
        message: "user info retrieved successfully",
        data: user,
      });
    }
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Failed to get the user",
    });
  }
}


export async function PUT(request: Request) {
  // function is updating user 
  try {
    const body: { notifyTo: string[], name: string } = await request.json()
    const token = request.headers.get("authorization")

    if (!token) {
      return NextResponse.json({ status: 401, message: "Unauthorized" })
    }

    const payload = jsonwebtoken.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as { id: string }

    const updated = await prisma.user.update({
      where: { id: payload.id },
      data: { ...body },
    })

    return NextResponse.json({
      status: 200,
      data: updated,
      message: 'Profile updated successfully'
    })
  } catch {
    return NextResponse.json({
      status: 500,
      message: "Internal server error",
    })
  }
}
