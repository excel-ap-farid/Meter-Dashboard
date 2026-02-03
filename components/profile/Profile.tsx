"use client"
import { useEffect, useState } from "react"
import { Pencil, Check, X } from "lucide-react"
import { getUser, updateUser, sendOtpForNewContact } from "@/services/apis/user"
import { APIEndPoints, TUser } from "@/services/types"
import { toast } from "react-toastify"
import { notificationTypes } from "@/services/constant"
import { useRouter } from "next/navigation"

export default function Profile() {
    const router = useRouter()
    const [editingName, setEditingName] = useState(false)
    const [editingNotify, setEditingNotify] = useState(false)
    const [missingContactType, setMissingContactType] = useState("")
    const [missingContactValue, setMissingContactValue] = useState("")
    const [user, setUser] = useState<TUser | null>(null)
    const [name, setName] = useState("")
    const [notifyTo, setNotifyTo] = useState<string[]>([])

    const handleUpdateName = async (payload: Partial<TUser>) => {
        const result = await updateUser(APIEndPoints.user, payload)
        if (result?.status === 200) {
            toast.success(result?.message)
            run()
        } else {
            toast.error(result?.message)
        }
    }

    const handleNotificationPreferences = async () => {
        let missingContactType = ''
        notifyTo.forEach((v) => {
            switch (v) {
                case "email":
                    if (!user?.email) {
                        missingContactType = 'email'
                    }
                    break

                case "phone":
                    if (!user?.phone) {
                        missingContactType = 'phone'
                    }
                    break
            }

        })
        if (missingContactType) {
            setMissingContactType(missingContactType)
            return
        } else {
            const result = await updateUser(APIEndPoints.user, { notifyTo })
            if (result?.status === 200) {
                toast.success(result?.message)
                run()
            } else {
                toast.error(result?.message)
            }
        }

    }



    const run = async () => {
        const response = await getUser();
        const user: TUser = response.data;
        setName(user?.name || "Not Added")
        setNotifyTo(user?.notifyTo || [])
        setUser(user)
    }

    useEffect(() => {

        run()
    }, [router])

    const handleGetOTpForAddNewContact = async () => {
        const result = await sendOtpForNewContact(APIEndPoints.user_notification, { notifyType: missingContactType, value: missingContactValue })
        if (result?.status === 200) {
            toast.success(result?.message)
            localStorage.setItem("contact_temp_token", result?.token)
            router.push("/auth/verify?history=new_contact")
        } else {
            toast.error(result?.message)
        }
    }
    return (
        <div className="mx-auto mt-12 max-w-md space-y-5 px-4 shadow-md py-3 rounded-sm">
            {/* Name */}
            <div className="flex items-start gap-6">
                <div className="flex-1">
                    <div className="mb-2 flex items-center justify-between">
                        <p className="text-sm font-bold text-neutral-500">Name</p>

                        {editingName ? (
                            <div className="flex gap-2">
                                <Check
                                    onClick={() => {
                                        handleUpdateName({ name })
                                        setEditingName(false)
                                    }}
                                    className="h-4 w-4 cursor-pointer text-green-600"
                                />
                                <X
                                    onClick={() => setEditingName(false)}
                                    className="h-4 w-4 cursor-pointer text-red-500"
                                />
                            </div>
                        ) : (
                            <Pencil
                                onClick={() => setEditingName(true)}
                                className="h-4 w-4 cursor-pointer text-neutral-600"
                            />
                        )}
                    </div>

                    {editingName ? (
                        <input
                            defaultValue={user?.name || ""}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm"
                        />
                    ) : (
                        <p className="text-sm text-neutral-800">{user?.name || "Not Added"}</p>
                    )}
                </div>
            </div>

            <div className="flex items-start gap-6">
                <div className="flex-1">
                    <div className="mb-2 flex items-center justify-between">
                        <p className="text-sm font-bold text-neutral-500">Email</p>


                    </div>
                    <p className="text-sm text-neutral-800">{user?.email || "Not Added"}</p>
                </div>
            </div>

            <div className="flex items-start gap-6">
                <div className="flex-1">
                    <div className="mb-2 flex items-center justify-between">
                        <p className="text-sm font-bold text-neutral-500">Phone</p>


                    </div>
                    <p className="text-sm text-neutral-800">{user?.phone || "Not Added"}</p>
                </div>
            </div>


            {/* Notification preference */}
            <div className="flex items-start gap-6">
                <div className="flex-1">
                    <div className="mb-2 flex items-center justify-between">
                        <p className="text-sm font-bold text-neutral-500">
                            Notification preference
                        </p>

                        {editingNotify ? (
                            <div className="flex gap-2">
                                <Check
                                    onClick={() => {
                                        handleNotificationPreferences()
                                        setEditingNotify(false)
                                    }}
                                    className="h-4 w-4 cursor-pointer text-green-600"
                                />
                                <X
                                    onClick={() => setEditingNotify(false)}
                                    className="h-4 w-4 cursor-pointer text-red-500"
                                />
                            </div>
                        ) : (
                            <Pencil
                                onClick={() => setEditingNotify(true)}
                                className="h-4 w-4 cursor-pointer text-neutral-600"
                            />
                        )}
                    </div>

                    {editingNotify ? (
                        <div className="space-y-2">
                            {notificationTypes.map((v) => (
                                <label
                                    key={v}
                                    className="flex items-center gap-2 text-sm text-neutral-700"
                                >
                                    <input
                                        type="checkbox"
                                        defaultChecked={notifyTo.includes(v)}
                                        onChange={() => {
                                            if (notifyTo.includes(v)) {
                                                setNotifyTo(notifyTo.filter((item) => item !== v))
                                            } else {
                                                setNotifyTo([...notifyTo, v])
                                            }
                                        }}
                                    />
                                    {v}
                                </label>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2 text-sm text-neutral-800">
                            {notifyTo.map((v) => (
                                <div
                                    key={v}
                                    className="mt-2 text-sm text-neutral-700 capitalize"
                                >
                                    {v}
                                </div>
                            ))}
                            {
                                notifyTo.length === 0 && (
                                    <p className="text-sm text-neutral-800">None</p>
                                )
                            }
                        </div>
                    )}
                </div>
            </div>

            {missingContactType && (
                <div className="w-screen h-screen bg-black/40 fixed top-0 left-0 z-10">
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="w-96 bg-white rounded-lg shadow-lg relative p-6">
                            <X
                                onClick={() => setMissingContactType("")}
                                className="h-4 w-4 cursor-pointer text-red-500 absolute top-2 right-2"
                            />

                            <div className="flex flex-col gap-4">
                                <p className="text-sm text-neutral-700 capitalize">
                                    Add your {missingContactType}
                                </p>

                                <p className="text-xs text-neutral-500">
                                    You will get an OTP to your {missingContactType}
                                </p>

                                <input

                                    onBlur={(e) => setMissingContactValue(e.target.value)}
                                    type={missingContactType === "email" ? "email" : "tel"}
                                    placeholder={
                                        missingContactType === "email"
                                            ? "Enter email"
                                            : "Enter phone number"
                                    }
                                    className="w-full h-11 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-4 text-sm outline-none focus:border-blue-500"

                                />

                                <button
                                    onClick={handleGetOTpForAddNewContact}
                                    className="w-full cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                                >
                                    Get OTP
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            )}
        </div>
    )
}
