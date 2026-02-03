"use client";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Noto_Serif } from "next/font/google";
import { toast } from "react-toastify";
import { postData } from "@/services/apis/auth";
import { APIEndPoints, TAddMeter, TMeterData } from "@/services/types";
import { getMeter, postMeter, updateMeter } from "@/services/apis/meter";
import Loading from "../others/Loading";
const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

function EditMeterForm() {
  const [updating, setUpdating] = useState(false);
  const [meter, setMeter] = useState<TMeterData | null>(null);
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const run = async () => {

      if (params?.id) {
        setLoading(true)
        const result = await getMeter(APIEndPoints.meter, params?.id as string);

        setMeter(result.data);
        setLoading(false)
      }
    };
    run();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const name = e.currentTarget.name.value as string;
    const threshold = e.currentTarget.threshold.value;
    const meterNo = e.currentTarget.meterNo.value;

    if (name.length > 15)
      return toast.error("Name length must be less than 20");

    if (Number(threshold) < 10)
      return toast.error("Threshold can't be less than 10");

    const payload = {
      name,
      threshold,
      meterNo,
      id: params?.id,
    };

    for (const key in payload) {
      const value = payload[key as keyof typeof payload];
      if (!value) return toast.warn(`${key} is required`);
    }

    try {
      setUpdating(true);
      const result = await updateMeter<Omit<TAddMeter, "meterNo" | "type">>(
        APIEndPoints.meter,
        payload,
      );

      if (result?.status === 200) {
        toast.success(result?.message);

        router.push("/");
      } else toast.error(result?.message);

      setUpdating(false);
    } catch (error: any) {
      setUpdating(false);

      console.log("error", error);
      toast.error(error.message || "Internal Server error");
    }
  };
  if (loading) return <Loading></Loading>
  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white mt-10 dark:bg-neutral-900 shadow-sm p-8">
        <div className="mb-8 text-center">
          <h2 className={`text-3xl font-medium ${notoSerif.className}`}>
            Update meter info
          </h2>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            Update your meter information
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
              defaultValue={meter?.name}
              placeholder="Enter a name for your meter"
              className="w-full h-11 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-4 text-sm outline-none focus:border-blue-500"
            />
          </div>



          <div>
            <label className="block text-sm mb-1 text-neutral-600 dark:text-neutral-400">
              Meter Type
            </label>
            <input
              type="text"
              defaultValue={meter?.type}
              disabled
              className="w-full h-11 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-200 dark:bg-neutral-700 px-4 text-sm text-neutral-500 dark:text-neutral-400 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-neutral-600 dark:text-neutral-400">
              Meter No.
            </label>
            <input
              type="text"
              name="meterNo"
              defaultValue={meter?.meterNo}
              disabled
              className="w-full h-11 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-200 dark:bg-neutral-700 px-4 text-sm text-neutral-500 dark:text-neutral-400 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-neutral-600 dark:text-neutral-400">
              Threshold
            </label>
            <input
              type="number"
              name="threshold"
              defaultValue={meter?.threshold}
              placeholder="Enter minimum balance to get notified"
              className="w-full h-11 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-4 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <button
            disabled={updating}
            type="submit"
            className="cursor-pointer w-full h-11 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-60"
          >
            {updating ? "Updating..." : "Submit"}
          </button>
        </form>
      </div>
    </div>

  );
}

export default EditMeterForm;
