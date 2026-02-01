import { APIEndPoints, Methods } from "../types";

export const postMeter = async <T>(endPoint: APIEndPoints, body: T) => {
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

export const getMeters = async (endPoint: APIEndPoints) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(endPoint, {
      method: Methods.GET,
      headers: {
        "content-type": "application/json",
        authorization: `${token}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to get meters", error);
  }
};

export const deleteMeter = async (endPoint: APIEndPoints, id: string) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${endPoint}?id=${id}`, {
      method: Methods.DELETE,
      headers: {
        "content-type": "application/json",
        authorization: `${token}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to get meters", error);
  }
};

export const updateMeter = async <T>(endPoint: APIEndPoints, body: T) => {
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

export const getMeter = async (endPoint: APIEndPoints, id: string) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${endPoint}/${id}`, {
      method: Methods.GET,
      headers: {
        "content-type": "application/json",
        authorization: `${token}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to get meter", error);
  }
};
