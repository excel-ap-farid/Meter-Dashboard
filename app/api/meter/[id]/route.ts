import { NextResponse } from "next/server";
import jsonwebtoken from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const token = request.headers.get("authorization");
    if (!token)
      return NextResponse.json({ status: 401, message: "Unauthorized" });

    const { id: userId } = jsonwebtoken.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as { id: string };

    const { id: meterId } = await params;

    const data = await prisma.meter.findFirst({
      where: { userId, id: meterId },
    });

    return NextResponse.json({
      status: 200,
      data,
      message: "Data fetched successfully",
    });
  } catch {
    return NextResponse.json({
      status: 500,
      message: "Internal server error",
    });
  }
}
