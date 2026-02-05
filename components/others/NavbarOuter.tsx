import Link from 'next/link'
import React from 'react'

export default function NavbarOuter() {
    return (
        <nav className="w-full h-16 border-b border-neutral-200 dark:border-neutral-800 flex items-center px-6">
            <Link
                href="/"
                className="cursor-pointer text-xl font-semibold text-neutral-900 dark:text-neutral-100"
            >
                MeterWatch
            </Link>
        </nav>

    )
}
