import { prisma } from "@/lib/prisma";
import { MeterTypes } from "@/services/types";
import { fetchMeterBalanceNesco, sendMailWithNotification } from "@/services/utils";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const meters = await prisma.meter.findMany({
      select: {
        id: true,
        meterNo: true,
        name: true,
        threshold: true,
        type: true,
        user: {

          select: {
            id: true,
            email: true,
          },
        },
      },
    });



    for (const m of meters) {
      let balance;
      if (m.type === MeterTypes.Nesco) {

        balance = await fetchMeterBalanceNesco(m.meterNo);
      }
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
