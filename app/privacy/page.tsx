import Footer from '@/components/others/Footer'
import { Link2 } from 'lucide-react'
import Link from 'next/link'
import NavbarOuter from '@/components/others/NavbarOuter'
import React from 'react'

function page() {
    return (
        <div className="min-h-screen flex flex-col">
            <NavbarOuter />

            {/* Main content */}
            <div className="flex flex-1 items-center justify-center px-4 mt-10">
                <div className="w-full lg:max-w-6xl space-y-8">


                    <div className="space-y-8">
                        {/* Header */}
                        <div className="text-center space-y-4">
                            <h1 className="text-4xl font-semibold">
                                Privacy Policy
                            </h1>

                            <p className="text-neutral-600 dark:text-neutral-400 text-base leading-relaxed">
                                This Privacy Policy describes how MeterWatch collects, uses, and protects
                                your personal information when you use our website and services.
                            </p>

                            <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                                We are committed to protecting your privacy and ensuring the security of
                                your data.
                            </p>
                        </div>

                        {/* Content grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div>
                                <h2 className="text-2xl font-semibold mb-2">
                                    Information We Collect
                                </h2>
                                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                                    We collect information that you provide directly to us, such as when
                                    you create an account, fill out a form, or contact us. This may include
                                    your name, email address, phone number, and meter number.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-semibold mb-2">
                                    How We Use Your Information
                                </h2>
                                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                                    We use the information we collect to provide account access, retrieve
                                    meter balance information, send notifications, communicate with you,
                                    and improve the reliability of our services.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-semibold mb-2">
                                    Data Security
                                </h2>
                                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                                    We apply reasonable technical and organizational measures to protect
                                    your data from unauthorized access, loss, or misuse.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-semibold mb-2">
                                    Changes to This Policy
                                </h2>
                                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                                    This Privacy Policy may be updated occasionally. Any changes will be
                                    reflected on this page.
                                </p>
                            </div>

                            <div className="lg:col-span-2">
                                <h2 className="text-2xl font-semibold mb-2">
                                    Contact Us
                                </h2>
                                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                                    If you have any questions about this Privacy Policy, please contact us{" "}
                                    <Link href="/contact" className="cursor-pointer text-blue-500 hover:underline">
                                        here
                                    </Link>.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>


            {/* Footer */}
            <Footer />
        </div>
    )
}

export default page