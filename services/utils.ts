import { nescoCookieJar, nescoHttpClient } from "@/lib/nescoHttpClient";
import { TUser } from "./types";
import * as cheerio from "cheerio";

export const sendMail = async (email: string, code: string) => {
  console.log("email", email);
  const publicKey = process.env.MAILJET_PUBLIC_KEY;
  const privateKey = process.env.MAILJET_PRIVATE_KEY;
  const senderEmail = process.env.MAILJET_SENDER_EMAIL;
  const auth = Buffer.from(`${publicKey}:${privateKey}`).toString("base64");

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
          To: [{ Email: email, Name: "User" }],
          Subject: "Your verification code",
          TextPart: `Your verification code is ${code}`,
          HTMLPart: `<h3>Hello ${"User"},</h3>
                       <p>Your code is <b>${code}</b>.</p>
                       <p>This code will expire soon.</p>`,
        },
      ],
    }),
  });

  if (response.ok) return true;
  else return false;
};

export const sendMailWithNotification = async (
  email: string,
  meterName: string,
  balance: string,
) => {
  const publicKey = process.env.MAILJET_PUBLIC_KEY;
  const privateKey = process.env.MAILJET_PRIVATE_KEY;
  const senderEmail = process.env.MAILJET_SENDER_EMAIL;
  const auth = Buffer.from(`${publicKey}:${privateKey}`).toString("base64");

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
          To: [{ Email: email, Name: "User" }],
          Subject: "Your meter balance is low",
          TextPart: `You are running out of balance!`,
          HTMLPart: `<h3>Hello ${"User"},</h3>
                       <p>Your meter ${meterName} balance is only ${balance} </b>.</p>
                       <p>Please recharge soon</p>`,
        },
      ],
    }),
  });
  if (response.ok) return true;
  else return false;
};

export const fetchMeterBalance = async (
  customer_no: string,
): Promise<string | null> => {
  const getRes = await nescoHttpClient.get(
    "https://customer.nesco.gov.bd/pre/panel",
  );

  const $get = cheerio.load(getRes.data);
  const token = $get('input[name="_token"]').val() as string;

  const cookies = await nescoCookieJar.getCookies(
    "https://customer.nesco.gov.bd",
  );
  const xsrf = cookies.find((c) => c.key === "XSRF-TOKEN")?.value as string;

  const body = new URLSearchParams({
    _token: token,
    cust_no: customer_no,
    submit: "মাসিক ব্যবহার",
  }).toString();

  const postRes = await nescoHttpClient.post(
    "https://customer.nesco.gov.bd/pre/panel",
    body,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Mozilla/5.0",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "X-XSRF-TOKEN": decodeURIComponent(xsrf),
        Referer: "https://customer.nesco.gov.bd/pre/panel",
        Origin: "https://customer.nesco.gov.bd",
      },
    },
  );

  const $post = cheerio.load(postRes.data || "");

  return (
    (
      $post('label:contains("অবশিষ্ট ব্যালেন্স")')
        .next("div")
        .find("input")
        .val() as string | undefined
    )?.trim() ?? null
  );
};

export const tellMeUpdateTime = async (

) => {
  const publicKey = process.env.MAILJET_PUBLIC_KEY;
  const privateKey = process.env.MAILJET_PRIVATE_KEY;
  const senderEmail = process.env.MAILJET_SENDER_EMAIL;
  const auth = Buffer.from(`${publicKey}:${privateKey}`).toString("base64");

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
          To: [{ Email: "faridmurshed11@gmail.com", Name: "User" }],
          Subject: "Meter balance updated",
          TextPart: ``,
          HTMLPart: `<h3>Hello ${"User"},</h3>
                       <p>Your meter balance updated </b>.</p>
                       <p>${Date.now()}</p>`,
        },
      ],
    }),
  });
  if (response.ok) return true;
  else return false;
};
