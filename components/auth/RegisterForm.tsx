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
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm p-8">
        <div className="mb-8 text-center">
          <h2 className={`text-3xl font-medium ${notoSerif.className}`}>
            Sign Up
          </h2>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            Create your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm mb-1 text-neutral-600 dark:text-neutral-400">
              Email
            </label>
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              className="w-full h-11 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-4 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div className="relative">
            <label className="block text-sm mb-1 text-neutral-600 dark:text-neutral-400">
              Password
            </label>
            <input
              type={showPass1 ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              className="w-full h-11 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-4 pr-11 text-sm outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPass1(!showPass1)}
              className="cursor-pointer absolute right-3 top-9 text-neutral-400 hover:text-blue-500"
            >
              {showPass1 ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              )}
            </button>
          </div>

          <div className="relative">
            <label className="block text-sm mb-1 text-neutral-600 dark:text-neutral-400">
              Confirm Password
            </label>
            <input
              type={showPass2 ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm your password"
              className="w-full h-11 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-4 pr-11 text-sm outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPass2(!showPass2)}
              className="cursor-pointer absolute right-3 top-9 text-neutral-400 hover:text-blue-500"
            >
              {showPass2 ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              )}
            </button>
          </div>

          <button
            disabled={signingUp}
            type="submit"
            className="cursor-pointer w-full h-11 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-60"
          >
            {signingUp ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-neutral-500 dark:text-neutral-400">
          Already have an account?{" "}
          <Link href="/auth/login" className="cursor-pointer text-blue-500 hover:underline">
            Click here
          </Link>
        </p>
      </div>
    </div>



  );
}

export default RegisterForm;
