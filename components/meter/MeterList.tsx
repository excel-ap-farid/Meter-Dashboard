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
    <div className="grid grid-cols-1 md:gird-cols-2 lg:grid-cols-4 gap-10 py-10 w-11/12 mx-auto">
      <div
        onClick={() => router.push("/meter/add")}
        className="border-blue-400 border-2 rounded-md h-48 bg-dark-400 flex items-center justify-center cursor-pointer"
      >
        <button className="text-white w-20 h-20 bg-blue-400 rounded-full text-4xl cursor-pointer">
          +
        </button>
      </div>

      {meters?.length > 0 ? (
        <>
          {meters?.map((m: TMeterData) => (
            <MeterCard
              key={m?.id}
              m={m}
              handleDelete={handleDelete}
            ></MeterCard>
          ))}
        </>
      ) : (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-2xl text-blue-500">
          No meters data found.
        </div>
      )}
    </div>
  );
}

export default MeterList;
