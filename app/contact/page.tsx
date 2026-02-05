import ContactForm from '@/components/contact/ContactForm'
import Footer from '@/components/others/Footer'
import NavbarOuter from '@/components/others/NavbarOuter'
import React from 'react'

function page() {
    return (
        <div className="min-h-screen flex flex-col">
            <NavbarOuter />

            <div className="flex flex-1 items-center justify-center px-4 mt-10">
                <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-4">
                        <h1 className="text-4xl font-semibold leading-tight">
                            Contact Us
                        </h1>

                        <p className="text-neutral-600 dark:text-neutral-400 text-base leading-relaxed">
                            Have a question, feedback, or need help with MeterWatch?
                            Send us a message and our team will get back to you as soon as possible.
                        </p>

                        <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                            We’re always happy to hear from users and improve the platform based on
                            real needs.
                        </p>
                    </div>

                    {/* Contact form */}
                    <div>
                        <ContactForm />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>

    )
}

export default page