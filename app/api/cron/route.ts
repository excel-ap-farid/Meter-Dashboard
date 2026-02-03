import { prisma } from "@/lib/prisma";
import { ContactType, MeterTypes } from "@/services/types";
import { sendEmail } from "@/services/utils/mailUtils";
import { fetchMeterBalance } from "@/services/utils/meterUtils";
import { sendSms } from "@/services/utils/smsUtil";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const cronToken = request.headers.get("authorization");
  if (cronToken !== process.env.CRON_SECRET)
    return NextResponse.json({
      status: 401,
      message: "Unauthorized",
    });

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
            phone: true,
            notifyTo: true,
          },
        },
      },
    });



    for (const m of meters) {
      const balance = await fetchMeterBalance(m.type as MeterTypes, m.meterNo);
      if (!balance) return;
      await prisma.meter.update({
        where: { id: m.id },
        data: { balance: Number(balance) },

      });
      if (Number(balance) < m?.threshold) {
        if (m?.user?.notifyTo.includes(ContactType.email)) {
          await sendEmail({
            email: m?.user?.email as string,
            subject: "Your meter balance is low",
            title: "Your meter balance is low",
            message: `You are running out of balance! Your meter ${m?.name} balance is only ${balance} </b>.</p>
                       <p>Please recharge soon</p>`,
          });
        } else if (m?.user?.notifyTo.includes(ContactType.phone)) {
          // await sendSms({
          //   to: m?.user?.phone as string,
          //   msg: `You are running out of balance! Your meter ${m?.name} balance is only ${balance} </b>.</p>
          //              <p>Please recharge soon</p>`,
          // });
        }
      }
    }
  } catch (error) {
    console.log("error", error);
  }

  // console.log("CRON HIT", new Date().toISOString());

  return NextResponse.json({ ok: true });
}
