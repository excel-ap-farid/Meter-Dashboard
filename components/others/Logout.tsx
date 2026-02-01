"use client";
import { useRouter } from "next/navigation";
import React from "react";

function Logout() {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        localStorage.removeItem("token");
        router.push("/auth/login");
      }}
      className="cursor-pointer absolute top-5 right-5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 shadow-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
    >
      Log out
    </button>

  );
}

export default Logout;
