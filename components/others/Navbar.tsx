"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { User, LogOut, Menu, X } from "lucide-react"
import { useState } from "react"

export default function Navbar() {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const history = useSearchParams().get('history') as string

    return (
        <nav className="w-full border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4">
            <div className="mx-auto flex h-14 items-center justify-between w-11/12">
                <div
                    onClick={() => router.push("/")}
                    className="cursor-pointer text-sm font-semibold text-neutral-800 dark:text-neutral-200"
                >
                    Dashboard
                </div>

                <div className="hidden items-center gap-3 md:flex">
                    {
                        !history ? <button
                            onClick={() => router.push("/profile")}
                            className="cursor-pointer mr-3 flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 dark:border-neutral-700"
                        >
                            <User className="h-4 w-4" />
                        </button> : <></>
                    }

                    {
                        history === 'register' ? <button
                            onClick={() => {
                                localStorage.removeItem("token")
                                router.push("/auth/login")
                            }}
                            className="cursor-pointer flex items-center gap-2 rounded-lg border border-neutral-300 dark:border-neutral-700 px-4 py-2 text-sm"
                        >
                            <LogOut className="h-4 w-4" />
                            Logout
                        </button> : <></>
                    }
                </div>

                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden"
                >
                    {open ? <X /> : <Menu />}
                </button>
            </div>

            {open && (
                <div className="flex flex-col gap-2 border-t border-neutral-200 dark:border-neutral-800 py-3 md:hidden">
                    <button
                        onClick={() => router.push("/profile")}
                        className="flex items-center gap-2 px-4 py-2 text-sm"
                    >
                        <User className="h-4 w-4" />
                        Profile
                    </button>

                    <button
                        onClick={() => {
                            localStorage.removeItem("token")
                            router.push("/auth/login")
                        }}
                        className="flex items-center gap-2 px-4 py-2 text-sm"
                    >
                        <LogOut className="h-4 w-4" />
                        Logout
                    </button>
                </div>
            )}
        </nav>
    )
}
