import AddForm from "@/components/meter/AddForm";
import Navbar from "@/components/others/Navbar";
import Profile from "@/components/profile/Profile";
import RequireUser from "@/components/others/RequireUser";
import React from "react";

function page() {
    return (
        <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black relative">
            <Navbar></Navbar>
            <RequireUser>
                <Profile></Profile>
            </RequireUser>

        </div>
    );
}

export default page;
