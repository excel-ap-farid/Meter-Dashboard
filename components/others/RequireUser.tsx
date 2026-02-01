"use client";
import { getUser } from "@/services/apis/user";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";

function RequireUser({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const run = async () => {
        const data = await getUser();

        console.log("data", data);

        if (data?.data) {
          if (data.data.isVerified) {
            setLoading(false);
            return;
          }
          router.push("/auth/verify");
          return;
        }
        localStorage.removeItem("token");
        router.push("/auth/login");
      };

      run();
    } catch (error) {
      localStorage.removeItem("token");

      router.push("/auth/login");
    }
  }, []);

  if (loading) return <Loading></Loading>;
  return <div>{children}</div>;
}

export default RequireUser;
