const SMS_BASE_URL = 'https://api.sms.net.bd';

export async function sendSms(to: string, msg: string) {
    const res = await fetch(`${SMS_BASE_URL}/sendsms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            api_key: process.env.SMS_API_KEY as string,
            to,
            msg,
        }),
    });

    // console.log(res.json());

    return res.json();
}