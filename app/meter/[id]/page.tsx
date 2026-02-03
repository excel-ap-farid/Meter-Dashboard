import EditMeterForm from "@/components/meter/EditMeterForm";
import Logout from "@/components/others/Logout";
import Navbar from "@/components/others/Navbar";
import RequireUser from "@/components/others/RequireUser";
import React from "react";

function page() {
  return (
    <div>
      <Navbar></Navbar>
      <RequireUser>
        <EditMeterForm></EditMeterForm>
      </RequireUser>
    </div>
  );
}

export default page;
