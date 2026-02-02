import LoginForm from "@/components/auth/LoginForm";
import Footer from "@/components/others/Footer";

import React from "react";

function page() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main content */}
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text section */}
          <div className="space-y-6">
            <h1 className="text-3xl font-semibold leading-tight">
              Control your electricity usage
            </h1>

            <p className="text-neutral-600 dark:text-neutral-400 text-base leading-relaxed">
              Track meters in real time, monitor balance, and set alerts to avoid outages. Manage multiple meters from one simple dashboard.
            </p>



          </div>

          {/* Form */}
          <div>
            <LoginForm />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>



  );
}

export default page;
