const SMS_BASE_URL = 'https://api.sms.net.bd';

export async function sendSms({ to, msg }: { to: string; msg: string }) {
    const phoneNum = "88" + to

    const res = await fetch(`${SMS_BASE_URL}/sendsms`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            api_key: process.env.SMS_API_KEY as string,
            to: phoneNum,
            msg,
        }),
    })

    const data = await res.json()

    return !data?.error
}
