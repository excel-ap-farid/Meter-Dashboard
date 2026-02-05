import VerifyForm from "@/components/auth/VerifyForm";
import Loading from "@/components/others/Loading";
import Logout from "@/components/others/Logout";
import Navbar from "@/components/others/Navbar";
import React, { Suspense } from "react";

function page() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black relative">

      <Suspense fallback={<Loading></Loading>}>
        <Navbar></Navbar>
        <VerifyForm></VerifyForm>
      </Suspense>
    </div>
  );
}

export default page;
