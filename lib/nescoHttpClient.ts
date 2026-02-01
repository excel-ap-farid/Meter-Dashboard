import axios from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";

const nescoCookieJar = new CookieJar();

const nescoHttpClient = wrapper(
  axios.create({
    withCredentials: true,
    jar: nescoCookieJar,
  }),
);

export { nescoHttpClient, nescoCookieJar };
