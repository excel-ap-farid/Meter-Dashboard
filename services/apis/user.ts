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


export const updateUser = async <T>(endPoint: APIEndPoints, body: Partial<T>) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(endPoint, {
      method: Methods.PUT,
      headers: {
        "content-type": "application/json",
        authorization: `${token}`,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to update data", body);
  }
};

export const sendOtpForNewContact = async <T>(endPoint: APIEndPoints, body: Partial<T>) => {
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
    console.error("Failed to send otp for new contact", body);
  }
};
export const addNewContact = async () => {
  try {
    const token = localStorage.getItem("contact_temp_token");
    const res = await fetch(APIEndPoints.user_notification, {
      method: Methods.PUT,
      headers: {
        "content-type": "application/json",
        authorization: `${token}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to add new contact");
  }
};