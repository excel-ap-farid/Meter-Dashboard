"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Noto_Serif } from "next/font/google";
import { toast } from "react-toastify";
import { postData } from "@/services/apis/auth";
import { APIEndPoints, TAddMeter } from "@/services/types";
import { postMeter } from "@/services/apis/meter";
const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

function AddForm() {
  const router = useRouter();

  const [adding, setAdding] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const name = e.currentTarget.name.value as string;
    const meterNo = e.currentTarget.meterNo.value as string;
    const threshold = e.currentTarget.threshold.value;

    if (name.length > 15)
      return toast.error("Name length must be less than 20");

    if (Number(threshold) < 10)
      return toast.error("Threshold can't be less than 10");

    const payload = {
      name,
      meterNo,
      threshold,
    };

    for (const key in payload) {
      const value = payload[key as keyof typeof payload];
      if (!value) return toast.warn(`${key} is required`);
    }

    try {
      setAdding(true);

      const result = await postMeter<TAddMeter>(APIEndPoints.meter, payload);
      console.log("result", result);
      if (result?.status === 201) {
        toast.success(result?.message);

        router.push("/");
      } else toast.error(result?.message);
      setAdding(false);
    } catch (error: any) {
      setAdding(false);

      console.log("error", error);
      toast.error(error.message || "Internal Server error");
    }
  };

  return (
    <div className="flex flex-col justify-center h-full w-11/12 md:w-3/5 lg:w-1/2 border-[#3B82F6] px-2 border-2 rounded-md py-8 mx-auto">
      <h2
        className={`text-5xl md:text-6xl text-foreground text-center font-light tracking-wide ${notoSerif.className}`}
      >
        Add a new meter
      </h2>
      <p className="pt-4 pb-8 text-center text-lg text-foreground">
        Enter your meter information
      </p>
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-md space-y-5"
      >
        <div>
          <label className="block text-foreground text-sm mb-2">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter a name for your meter"
            className="w-full h-12 rounded-lg bg-[#F5F7FA] border border-[#6B6B6B] px-4 outline-0 text-black"
          />
        </div>
        <div>
          <label className="block text-foreground text-sm mb-2">Meter No.</label>
          <input
            type="number"
            name="meterNo"
            placeholder="Enter your meter no."
            className="w-full h-12 rounded-lg bg-[#F5F7FA] border border-[#6B6B6B] px-4 outline-0 text-black"
          />
        </div>
        <div>
          <label className="block text-foreground text-sm mb-2">Threshold</label>
          <input
            type="text"
            name="threshold"
            placeholder="Enter minimum balance to get notified"
            className="w-full h-12 rounded-lg bg-[#F5F7FA] border border-[#6B6B6B] px-4 outline-0 text-black"
          />
        </div>

        <button
          disabled={adding}
          type="submit"
          className="cursor-pointer w-full h-12 bg-[#3B82F6] text-white rounded-md text-lg font-medium hover:bg-[#2563EB] transition"
        >
          {adding ? "Adding..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default AddForm;
