"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Noto_Serif } from "next/font/google";
import { toast } from "react-toastify";
import { postData } from "@/services/apis/auth";
import { APIEndPoints, MeterTypes, TAddMeter } from "@/services/types";
import { postMeter } from "@/services/apis/meter";
import { fetchMeterBalance } from "@/services/utils/meterUtils";
import { type } from "os";
const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

function AddForm() {
  const router = useRouter();

  const [adding, setAdding] = useState(false);
  const [descoError, setDescoError] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const name = e.currentTarget.name.value as string;
    const meterNo = e.currentTarget.meterNo.value as string;
    const threshold = e.currentTarget.threshold.value;
    const type = e.currentTarget.type.value as MeterTypes;

    if (name.length > 15)
      return toast.error("Name length must be less than 20");

    if (Number(threshold) < 10)
      return toast.error("Threshold can't be less than 10");

    if (type === MeterTypes.Desco) {
      const balance = await fetchMeterBalance(type, meterNo)
      if (!balance) return setDescoError(true)
    }

    const payload = {
      name,
      meterNo,
      threshold,
      type
    };

    for (const key in payload) {
      const value = payload[key as keyof typeof payload];
      if (!value) return toast.warn(`${key} is required`);
    }

    try {
      setAdding(true);

      const result = await postMeter<TAddMeter>(APIEndPoints.meter, payload);
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
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-neutral-200  dark:border-neutral-800 bg-white mt-10 dark:bg-neutral-900 shadow-sm p-8">
        <div className="mb-8 text-center">
          <h2 className={`text-3xl font-medium ${notoSerif.className}`}>
            Add a new meter
          </h2>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            Enter your meter information
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm mb-1 text-neutral-600 dark:text-neutral-400">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter a name for your meter"
              className="w-full h-11 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-4 text-sm outline-none focus:border-blue-500"
            />
          </div>



          <div>
            <label className="block text-sm text-neutral-600 dark:text-neutral-400">
              Meter Type
            </label>

            <div className="relative">
              <select
                name="type"
                defaultValue={MeterTypes.Nesco}
                className="w-full h-11 appearance-none rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-4 pr-10 text-sm outline-none focus:border-blue-500"
              >
                {Object.values(MeterTypes).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              <svg
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M5.5 7.5L10 12l4.5-4.5" />
              </svg>
            </div>
          </div>
          {descoError && (
            <p className="text-red-500 text-sm mt-1">
              Desco is not providing balance information for this meter number.
            </p>
          )}

          <div>
            <label className="block text-sm mb-1 text-neutral-600 dark:text-neutral-400">
              Meter No.
            </label>
            <input
              type="number"
              name="meterNo"
              placeholder="Enter your meter no."
              className="w-full h-11 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-4 text-sm outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-neutral-600 dark:text-neutral-400">
              Threshold
            </label>
            <input
              type="text"
              name="threshold"
              placeholder="Enter minimum balance to get notified"
              className="w-full h-11 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-4 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <button
            disabled={adding}
            type="submit"
            className="cursor-pointer w-full h-11 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-60"
          >
            {adding ? "Adding..." : "Submit"}
          </button>
        </form>
      </div>
    </div>

  );
}

export default AddForm;
