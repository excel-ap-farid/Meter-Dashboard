export const sendEmail = async (data: {
    email: string
    subject: string
    title: string
    message: string
}) => {
    const publicKey = process.env.MAILJET_PUBLIC_KEY
    const privateKey = process.env.MAILJET_PRIVATE_KEY
    const senderEmail = process.env.MAILJET_SENDER_EMAIL
    const auth = Buffer.from(`${publicKey}:${privateKey}`).toString("base64")

    const response = await fetch("https://api.mailjet.com/v3.1/send", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${auth}`,
        },
        body: JSON.stringify({
            Messages: [
                {
                    From: {
                        Email: senderEmail,
                        Name: "Excel Automation Pro E-Meter Support",
                    },
                    To: [{ Email: data.email, Name: "User" }],
                    Subject: data.subject,
                    TextPart: data.message,
                    HTMLPart: `<h3>Hello User,</h3>
                     <p>${data.title}</p>
                     <p><b>${data.message}</b></p>`,
                },
            ],
        }),
    })

    return response.ok
}
