import { prisma } from "@/lib/prisma";
import { TMeterData } from "@/services/types";
import { fetchMeterBalance } from "@/services/utils";
import { NextResponse } from "next/server";
import jsonwebtoken from "jsonwebtoken";

export async function POST(request: Request) {
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

    const body: TMeterData = await request.json();

    const found = await prisma.meter.findFirst({
      where: {
        userId: id,
        meterNo: body.meterNo,
      },
    });

    if (found)
      return NextResponse.json({
        status: 403,
        message: "Meter already exists for the user",
      });

    const balance = await fetchMeterBalance(body.meterNo);

    if (balance === null)
      return NextResponse.json({
        status: 404,
        message: "Invalid Meter Number",
      });

    const created = await prisma.meter.create({
      data: {
        name: body.name,
        meterNo: body.meterNo,
        threshold: Number(body.threshold),
        balance: Number(balance) ?? 0,
        user: {
          connect: { id },
        },
      },
    });
    if (created)
      return NextResponse.json({
        status: 201,
        data: created,
        message: "Meter created successfully",
      });
    else {
      return NextResponse.json({
        status: 400,
        message: "Failed to create a new meter info",
      });
    }
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Internal server error",
    });
  }
}

export async function PUT(request: Request) {
  try {
    const token = request.headers.get("authorization");
    if (!token)
      return NextResponse.json({
        status: 401,
        message: "Unauthorized",
      });

    const body: TMeterData = await request.json();

    const updated = await prisma.meter.update({
      where: {
        id: body.id,
      },
      data: {
        name: body.name,
        threshold: Number(body.threshold),
      },
    });
    if (updated)
      return NextResponse.json({
        status: 200,
        data: updated,
        message: "Meter updated successfully",
      });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({
      status: 500,
      message: "Internal server error",
    });
  }
}

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

    const data = await prisma.meter.findMany({
      where: { userId: id },
      orderBy: { name: "asc" },
    });
    return NextResponse.json({
      status: 200,
      data: data,
      message: "Data fetched successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Internal server error",
    });
  }
}

export async function DELETE(request: Request) {
  try {
    const token = request.headers.get("authorization");
    if (!token)
      return NextResponse.json({ status: 401, message: "Unauthorized" });

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id)
      return NextResponse.json({ status: 400, message: "id is required" });

    const data = await prisma.meter.delete({ where: { id } });

    return NextResponse.json({
      status: 200,
      data,
      message: "Data deleted successfully",
    });
  } catch {
    return NextResponse.json({
      status: 500,
      message: "Internal server error",
    });
  }
}
