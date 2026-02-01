import MeterList from "@/components/meter/MeterList";
import Logout from "@/components/others/Logout";
import RequireUser from "@/components/others/RequireUser";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black relative">
      <div className="h-20"></div>
      <Logout></Logout>
      <RequireUser>
        <MeterList></MeterList>
      </RequireUser>
    </div>
  );
}
