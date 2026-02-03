export type TUser = {
  email: string;
  password: string;
  code: string;
  id: string;
  contactType: ContactType;
  phone: string;
  name: string;
  notifyTo: string[];
};

export type TUserRegisterRequestBody = {
  contactType: ContactType;
  contact: string;
  password: string;
}
export type TUserLoginRequestBody = {
  contact: string;
  password: string;
}

export type TMeterData = {
  name: string;
  meterNo: string;
  threshold: number;
  id: string;
  balance: number;
  type: MeterTypes
};

export enum MeterTypes {
  Nesco = "Nesco",
  Desco = "Desco",
}

export enum ContactType {
  email = "email",
  phone = "phone",
}


export type TAddMeter = Pick<TMeterData, "name" | "threshold" | "meterNo" | "type">;
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
  resetPassword = "/api/auth/reset-password",
  resend = "/api/auth/resend",
  login = "/api/auth/login",

  meter = "/api/meter",
  user = "/api/user",
  user_notification = "/api/user/notification",
}

export type TUserResponse = {
  data: TUser;
  status: number;
  message: string;
}
