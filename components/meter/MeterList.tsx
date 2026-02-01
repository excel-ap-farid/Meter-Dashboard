"use client";
import { deleteMeter, getMeters } from "@/services/apis/meter";
import { APIEndPoints, TMeterData } from "@/services/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loading from "../others/Loading";
import MeterCard from "./MeterCard";

function MeterList() {
  const [meters, setMeters] = useState<TMeterData[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const run = async () => {
    const data = await getMeters(APIEndPoints.meter);
    setLoading(false);
    setMeters(data.data);
  };

  useEffect(() => {
    run();
  }, []);

  const handleDelete = async (id: string) => {
    const ok = confirm("Are you sure?");
    if (ok) {
      const result = await deleteMeter(APIEndPoints.meter, id);
      if (result.status === 200) {
        toast.success(result.message);
        run();
        return;
      } else return toast.error(result?.message);
    }
  };

  if (loading) return <Loading></Loading>;

  return (
    <div className="w-11/12 mx-auto py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Add new meter card */}
        <div
          onClick={() => router.push("/meter/add")}
          className="cursor-pointer h-52 rounded-2xl border-2 border-dashed border-blue-400 flex items-center justify-center hover:bg-blue-50 dark:hover:bg-neutral-800 transition"
        >
          <div className="flex flex-col items-center gap-2 text-blue-500">
            <div className="w-14 h-14 rounded-full border-2 border-blue-400 flex items-center justify-center text-3xl">
              +
            </div>
            <span className="text-sm font-medium">Add Meter</span>
          </div>
        </div>

        {/* Meter cards */}
        {meters?.length > 0 ? (
          meters.map((m) => (
            <MeterCard
              key={m.id}
              m={m}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-neutral-500 text-lg">
            No meters data found.
          </div>
        )}
      </div>
    </div>

  );
}

export default MeterList;
