import AddForm from "@/components/meter/AddForm";
import Navbar from "@/components/others/Navbar";
import RequireUser from "@/components/others/RequireUser";

function page() {
  return (
    <div className="">
      <Navbar></Navbar>
      <RequireUser>
        <AddForm></AddForm>
      </RequireUser>
    </div>
  );
}

export default page;
