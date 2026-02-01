import { APIEndPoints, Methods } from "../types";

export const getUser = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch("/api/user", {
      headers: {
        "content-type": "application/json",
        authorization: `${token}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to get user");
  }
};
