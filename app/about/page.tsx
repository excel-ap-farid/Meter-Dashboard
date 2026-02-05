import Footer from '@/components/others/Footer'
import NavbarOuter from '@/components/others/NavbarOuter'
import React from 'react'

function page() {
    return (
        <div className="min-h-screen flex flex-col">
            <NavbarOuter />

            <div className="flex flex-1 items-center justify-center px-4 mt-10">
                <div className="max-w-3xl text-center space-y-6">
                    <h1 className="text-4xl font-semibold">
                        About This Platform
                    </h1>

                    <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        This platform helps users manage their electricity meters in one simple
                        place. You can register your meters, view real-time balance information,
                        and keep track of usage without unnecessary complexity.
                    </p>

                    <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        Users can set a minimum balance threshold for each meter and choose how
                        they want to be notified when the balance drops below that limit.
                        Notification preferences include email and SMS, ensuring you never miss
                        an important alert.
                    </p>

                    <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        The goal of this system is to provide clarity, control, and timely
                        notifications so you can avoid unexpected outages and stay informed at
                        all times.
                    </p>

                    <p className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                        Powered by Excel Automation Pro
                    </p>
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-12">
                <Footer />
            </footer>
        </div>


    )
}

export default page