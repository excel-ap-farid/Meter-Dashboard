import axios from "axios";
import { MeterTypes } from "../types";
import { nescoCookieJar, nescoHttpClient } from "@/lib/nescoHttpClient";
import * as cheerio from "cheerio";
import https from 'https'

const agent = new https.Agent({ rejectUnauthorized: false })

const fetchMeterBalanceNesco = async (
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




export const fetchMeterBalanceDesco = async (meterNo: string) => {
    try {
        const res = await axios.get(
            'https://prepaid.desco.org.bd/api/unified/customer/getBalance',
            {
                params: { meterNo },
                httpsAgent: agent,
            },
        )

        return res?.data?.data?.balance ?? null
    } catch {
        return null
    }
}

export async function fetchMeterBalance(type: MeterTypes, meterNo: string) {

    switch (type) {
        case MeterTypes.Nesco:
            return await fetchMeterBalanceNesco(meterNo);

        case MeterTypes.Desco:
            return await fetchMeterBalanceDesco(meterNo);

        default:
            return null;
    }
}
