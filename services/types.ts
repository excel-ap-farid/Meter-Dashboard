export type TUser = {
  email: string;
  password: string;
  code: string;
  id: string;
};

export type TMeterData = {
  name: string;
  meterNo: string;
  threshold: number;
  id: string;
  balance: number;
};

export type TAddMeter = Pick<TMeterData, "name" | "threshold" | "meterNo">;
export type SignUpPayload = {
  email: string;
  password: string;
};

export enum Methods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export enum APIEndPoints {
  register = "/api/auth/register",
  verify = "/api/auth/verify",
  resend = "/api/auth/resend",
  login = "/api/auth/login",

  meter = "/api/meter",
}
