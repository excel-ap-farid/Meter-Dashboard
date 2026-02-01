"use client";

import { postData } from "@/services/apis/auth";
import { getUser } from "@/services/apis/user";
import { APIEndPoints } from "@/services/types";
import { Noto_Serif } from "next/font/google";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loading from "../others/Loading";
const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

function VerifyForm() {
  const [verifyingCode, setVerifyingCode] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const code = e.target.code.value;

    if (!code) return toast.error("Code is required");

    try {
      setVerifyingCode(true);

      if (searchParams.get("email")) {
        const email = searchParams.get('email') as string
        const result = await postData(APIEndPoints.resetPassword, { code, email });
        if (result.status === 200) {
          toast.success(result.message);
          localStorage.setItem("p_r_token", result.token);
          router.push("/auth/reset-password");
        } else {
          toast.error(result.message);
        }
      }
      else {
        const result = await postData(APIEndPoints.verify, { code });
        if (result.status === 200) {
          toast.success(result.message);
          router.push("/");
        } else {
          toast.error(result.message);
        }
      }


      setVerifyingCode(false);
    } catch (error) {
      setVerifyingCode(false);
    }
  };

  useEffect(() => {
    try {
      const run = async () => {
        const data = await getUser();

        if (data?.data) {
          if (data.data.isVerified) {
            router.push("/");
            return;
          } else {
            setLoading(false);
          }
        } else {
          localStorage.removeItem("token");
          router.push("/auth/login");
        }
      };

      if (!searchParams.get("email")) {
        run();
      } else {
        setLoading(false);
      }
    } catch (error) {
      router.push("/auth/login");
    }
  }, []);

  const handleResend = async () => {
    const data = await getUser();
    const result = await postData<{ email: string }>(APIEndPoints.resend, {
      email: data.data.email as string,
    });

    if (result.status === 201) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };
  if (loading) return <Loading></Loading>;
  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm p-8">
        <div className="mb-6 text-center">
          <h2 className={`text-lg font-medium ${notoSerif.className}`}>
            You must verify your email before processing further
          </h2>
          <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
            Enter the 4 digit code you have received in your email!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="code"
            placeholder="Enter your code"
            className="w-full h-11 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-4 text-center tracking-widest text-lg outline-none focus:border-blue-500"
          />

          <button
            disabled={verifyingCode}
            type="submit"
            className="cursor-pointer w-full h-11 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-60"
          >
            {verifyingCode ? "Verifying..." : "Verify"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={handleResend}
            className="cursor-pointer text-sm text-blue-500 hover:underline"
          >
            Resend code
          </button>
        </div>
      </div>
    </div>

  );
}

export default VerifyForm;
