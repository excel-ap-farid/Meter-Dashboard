import { TMeterData } from "@/services/types";
import { useRouter } from "next/navigation";
import React from "react";

function MeterCard({
  m,
  handleDelete
}: {
  m: TMeterData;
  handleDelete: (id: string) => any;
}) {
  const router = useRouter();
  return (
    <div
      className={`
    relative rounded-2xl border p-5 h-52 flex flex-col justify-between
    bg-white dark:bg-neutral-900 shadow-sm
    ${m.balance < m.threshold
          ? "border-red-400"
          : "border-blue-400"
        }
  `}
    >
      <div>
        <h3 className="text-lg font-semibold text-foreground">
          {m.name}
        </h3>

        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          Meter No: {m.meterNo}
        </p>

        <p className="mt-4 text-base font-medium text-foreground">
          Balance:{" "}
          <span
            className={
              m.balance < m.threshold
                ? "text-red-500"
                : "text-blue-500"
            }
          >
            {m.balance}
          </span>
        </p>

        <p className="mt-1 text-sm text-neutral-500">
          Threshold: {m.threshold}
        </p>
      </div>

      <div className="flex justify-end gap-4">
        <button
          onClick={() => router.push(`/meter/${m.id}`)}
          className="cursor-pointer text-neutral-500 hover:text-blue-500 transition"
        >
          {/* edit icon */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>

        </button>

        <button
          onClick={() => handleDelete(m.id)}
          className="cursor-pointer text-neutral-500 hover:text-red-500 transition"
        >
          {/* delete icon */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>

        </button>
      </div>
    </div>

  );
}

export default MeterCard;
