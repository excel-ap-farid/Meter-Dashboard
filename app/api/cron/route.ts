import { prisma } from "@/lib/prisma";
import { fetchMeterBalance, sendMailWithNotification } from "@/services/utils";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const meters = await prisma.meter.findMany({
      select: {
        id: true,
        meterNo: true,
        name: true,
        threshold: true,
        user: {

          select: {
            id: true,
            email: true,
          },
        },
      },
    });



    for (const m of meters) {
      const balance = await fetchMeterBalance(m.meterNo);
      if (!balance) return;
      await prisma.meter.update({
        where: { id: m.id },
        data: { balance: Number(balance) },
      });
      console.log("meter balance update");
      if (Number(balance) < m?.threshold) {
        await sendMailWithNotification(m?.user?.email, m?.name, balance);
        console.log("mail sent to", m?.user?.email);
      }
    }
  } catch (error) {
    console.log("error", error);
  }

  // console.log("CRON HIT", new Date().toISOString());

  return NextResponse.json({ ok: true });
}
