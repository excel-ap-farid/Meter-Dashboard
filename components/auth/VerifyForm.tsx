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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const code = e.target.code.value;

    if (!code) return toast.error("Code is required");

    try {
      setVerifyingCode(true);
      const result = await postData(APIEndPoints.verify, { code });
      if (result.status === 200) {
        toast.success(result.message);
        router.push("/");
      } else {
        toast.error(result.message);
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

      run();
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
    <div className="flex flex-col justify-center h-full w-11/12 md:w-3/5 lg:w-1/2 border-[#3B82F6] border-2 rounded-md py-8 mx-auto">
      <h2
        className={`text-xl text-foreground text-center font-light tracking-wide ${notoSerif.className}`}
      >
        You must verify your email before processing further
      </h2>
      <p className="pt-4 pb-8 text-center text-lg text-foreground">
        Enter the 4 digit code you have received in your email!
      </p>
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-md space-y-5"
      >
        <div>
          <input
            type="text"
            name="code"
            placeholder="Enter your code"
            className="w-full h-12 rounded-lg bg-[#F5F7FA] border border-[#6B6B6B] px-4 outline-0 text-black"
          />
        </div>

        <button
          disabled={verifyingCode}
          type="submit"
          className="cursor-pointer w-full h-12 bg-[#3B82F6] text-white rounded-md text-lg font-medium hover:bg-[#2563EB] transition"
        >
          {verifyingCode ? "Verifying..." : "Verify"}
        </button>
      </form>
      <h2 className="text-center text-foreground text-base mt-6">
        <button
          type="button"
          onClick={handleResend}
          className="text-[#94A3B8] hover:underline cursor-pointer"
        >
          Resend code
        </button>
      </h2>
    </div>
  );
}

export default VerifyForm;
