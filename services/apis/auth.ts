import { APIEndPoints, Methods } from "../types";

export const postData = async <T>(endPoint: APIEndPoints, body: T) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(endPoint, {
      method: Methods.POST,
      headers: {
        "content-type": "application/json",
        authorization: `${token}`,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to post data", body);
  }
};
