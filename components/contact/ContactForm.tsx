"use client"
import { Noto_Serif } from 'next/font/google'
import React from 'react'

const notoSerif = Noto_Serif({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
});

function ContactForm() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const message = formData.get("message") as string;
        console.log(name, email, message);
    }
    return (
        <div className="flex h-full w-full items-center justify-center px-4">
            <div className="w-full max-w-md rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm p-8">
                <div className="mb-8 text-center">
                    <h2 className={`text-3xl font-medium ${notoSerif.className}`}>
                        Contact Us
                    </h2>
                    <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                        Send us a message and we’ll get back to you
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm mb-1 text-neutral-600 dark:text-neutral-400">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            className="w-full h-11 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-4 text-sm outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1 text-neutral-600 dark:text-neutral-400">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full h-11 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-4 text-sm outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1 text-neutral-600 dark:text-neutral-400">
                            Message
                        </label>
                        <textarea
                            name="message"
                            rows={4}
                            placeholder="Write your message here..."
                            className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-4 py-3 text-sm outline-none resize-none focus:border-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="cursor-pointer w-full h-11 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>

    )
}

export default ContactForm