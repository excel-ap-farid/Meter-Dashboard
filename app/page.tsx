import MeterList from "@/components/meter/MeterList";
import Logout from "@/components/others/Logout";
import Navbar from "@/components/others/Navbar";
import RequireUser from "@/components/others/RequireUser";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <Navbar></Navbar>
      <RequireUser>
        <MeterList></MeterList>
      </RequireUser>
    </div>
  );
}
