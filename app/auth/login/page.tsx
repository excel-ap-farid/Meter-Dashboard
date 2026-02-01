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
            <h1 className="text-4xl font-semibold leading-tight">
              Stay in control of your electricity usage
            </h1>

            <p className="text-neutral-600 dark:text-neutral-400 text-base leading-relaxed">
              Monitor your meters in real time, keep track of balances, and set smart
              thresholds to avoid unexpected outages. This dashboard is designed to
              give you clarity and control without unnecessary complexity.
            </p>

            <p className="text-neutral-600 dark:text-neutral-400 text-base leading-relaxed">
              Add and manage multiple meters, receive timely alerts, and update your
              information whenever needed — all from one simple, reliable interface.
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
