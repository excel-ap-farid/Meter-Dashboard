"use client";

import { postData } from "@/services/apis/auth";
import { APIEndPoints, SignUpPayload } from "@/services/types";
import { Noto_Serif } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

function RegisterForm() {
  const [signingUp, setSigningUp] = useState(false);
  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.currentTarget.email.value as string;
    const password = e.currentTarget.password.value as string;
    const CPassword = e.currentTarget.confirmPassword.value as string;

    if (password !== CPassword) return toast.warn("Both password must be same");
    if (password.length < 8)
      return toast.warn("Password should be at least 8 characters");

    const payload: SignUpPayload = {
      email,
      password,
    };

    for (const key in payload) {
      const value = payload[key as keyof typeof payload];
      if (!value) return toast.warn(`${key} is required`);
    }

    try {
      setSigningUp(true);
      const result = await postData<SignUpPayload>(APIEndPoints.register, {
        email,
        password,
      });
      if (result.status === 201 && result.token) {
        toast.success(result.message);
        localStorage.setItem("token", result.token);
        router.push(`/auth/verify`);
      } else toast.error(result.message);
      setSigningUp(false);
    } catch (error) {
      setSigningUp(false);

      toast.error(`Failed to Sign Up`);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) return router.push("/");
  }, []);

  return (
    <div className="flex flex-col justify-center h-full w-11/12 md:w-3/5 lg:w-1/2 border-[#3B82F6] px-2 border-2 rounded-md py-8">
      <h2
        className={`text-5xl md:text-6xl text-foreground text-center font-light tracking-wide ${notoSerif.className}`}
      >
        Sign Up
      </h2>
      <p className="pt-4 pb-4 text-center text-lg text-foreground">
        Create your account
      </p>
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-md space-y-5"
      >
        <div>
          <label className="block text-foreground text-sm mb-2">Email</label>
          <input
            type="text"
            name="email"
            placeholder="Enter your email"
            className="w-full h-12 rounded-lg bg-[#F5F7FA] border border-[#6B6B6B] px-4 outline-0 text-black"
          />
        </div>

        <div className="relative">
          <label className="block text-foreground text-sm mb-2">Password</label>
          <input
            type={showPass1 ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            className="w-full h-12 rounded-lg bg-[#F5F7FA] border border-[#6B6B6B] px-4 pr-10 outline-0 text-black"
          />
          <button
            type="button"
            onClick={() => setShowPass1(!showPass1)}
            className="cursor-pointer absolute right-3 top-10 text-[#6B6B6B] hover:text-[#3B82F6]"
          >
            {showPass1 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            )}
          </button>
        </div>

        <div className="relative">
          <label className="block text-foreground text-sm mb-2">
            Confirm Password
          </label>
          <input
            type={showPass2 ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm your password"
            className="w-full h-12 rounded-lg bg-[#F5F7FA] border border-[#6B6B6B] px-4 pr-10 outline-0 text-black"
          />
          <button
            type="button"
            onClick={() => setShowPass2(!showPass2)}
            className="cursor-pointer absolute right-3 top-10 text-[#6B6B6B] hover:text-[#3B82F6]"
          >
            {showPass2 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            )}
          </button>
        </div>

        <button
          disabled={signingUp}
          type="submit"
          className="cursor-pointer w-full h-12 bg-[#3B82F6] text-white rounded-md text-lg font-medium hover:bg-[#2563EB] transition"
        >
          {signingUp ? "Signing Up..." : "Sign Up"}
        </button>
      </form>

      <h2 className="text-center text-foreground text-base mt-6">
        Already have an account?{" "}
        <Link className="text-[#94A3B8] hover:underline" href="/auth/login">
          Click here
        </Link>
      </h2>
    </div>
  );
}

export default RegisterForm;
