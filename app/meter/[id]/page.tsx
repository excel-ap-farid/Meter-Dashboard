import EditMeterForm from "@/components/meter/EditMeterForm";
import Logout from "@/components/others/Logout";
import React from "react";

function page() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black relative">
      <div className="h-20"></div>
      <Logout></Logout>

      <EditMeterForm></EditMeterForm>
    </div>
  );
}

export default page;
