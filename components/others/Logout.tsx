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
        className="text-white bg-blue-400 absolute top-5 right-5 px-4 py-2 rounded-md shadow-md cursor-pointer"
      >
        Log out
      </button>
  );
}

export default Logout;
