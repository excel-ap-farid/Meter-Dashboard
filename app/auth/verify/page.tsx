import VerifyForm from "@/components/auth/VerifyForm";
import Loading from "@/components/others/Loading";
import Logout from "@/components/others/Logout";
import React, { Suspense } from "react";

function page() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black relative">
      <div className="h-20"></div>
      <Logout></Logout>
      <Suspense fallback={<Loading></Loading>}>
        <VerifyForm></VerifyForm>
      </Suspense>
    </div>
  );
}

export default page;
