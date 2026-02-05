import React from 'react'
import Link from 'next/link'

function Footer() {
    return (
        <footer className="w-full border-t border-neutral-200 dark:border-neutral-800 mt-10">
            <div className="w-4/5 mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    © {new Date().getFullYear()} MeterWatch. All rights reserved.{" "}
                    <span className="mx-2">•</span>
                    <span className="font-medium text-neutral-600 dark:text-neutral-300">
                        Powered by Excel Automation Pro
                    </span>
                </p>

                <div className="flex gap-6 text-sm">
                    {/* <Link
                        href="/"
                        className="cursor-pointer text-neutral-600 dark:text-neutral-400 hover:text-blue-500 transition"
                    >
                        Home
                    </Link> */}
                    <Link
                        href="/about"
                        className="cursor-pointer text-neutral-600 dark:text-neutral-400 hover:text-blue-500 transition"
                    >
                        About
                    </Link>
                    <Link
                        href="/contact"
                        className="cursor-pointer text-neutral-600 dark:text-neutral-400 hover:text-blue-500 transition"
                    >
                        Contact
                    </Link>
                    <Link
                        href="/privacy"
                        className="cursor-pointer text-neutral-600 dark:text-neutral-400 hover:text-blue-500 transition"
                    >
                        Privacy
                    </Link>

                </div>
            </div>
        </footer>

    )
}

export default Footer