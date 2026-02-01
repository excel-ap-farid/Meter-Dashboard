import React from 'react'

function Footer() {
    return (
        <footer className="w-full border-t border-neutral-200 dark:border-neutral-800 mt-16">
            <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    © {new Date().getFullYear()} Meter Dashboard. All rights reserved.
                </p>

                <div className="flex gap-6 text-sm">
                    <a
                        href="/about"
                        className="cursor-pointer text-neutral-600 dark:text-neutral-400 hover:text-blue-500 transition"
                    >
                        About
                    </a>
                    <a
                        href="/contact"
                        className="cursor-pointer text-neutral-600 dark:text-neutral-400 hover:text-blue-500 transition"
                    >
                        Contact
                    </a>
                    <a
                        href="/privacy"
                        className="cursor-pointer text-neutral-600 dark:text-neutral-400 hover:text-blue-500 transition"
                    >
                        Privacy
                    </a>
                    <a
                        href="/terms"
                        className="cursor-pointer text-neutral-600 dark:text-neutral-400 hover:text-blue-500 transition"
                    >
                        Terms
                    </a>
                </div>
            </div>
        </footer>

    )
}

export default Footer