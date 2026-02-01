"use client";

import { updatePassword } from "@/services/apis/auth";
import { APIEndPoints } from "@/services/types";
import { Noto_Serif } from "next/font/google";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const notoSerif = Noto_Serif({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
});

function UpdatePasswordForm() {
    const [loading, setLoading] = useState(false);
    const [showPass1, setShowPass1] = useState(false);
    const [showPass2, setShowPass2] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Ideally check for reset token validity here, or rely on API to reject if invalid
        const token = localStorage.getItem("p_r_token");
        if (!token) {
            toast.error("Invalid session. Please try resetting password again.");
            router.push("/auth/login");
        }
    }, [router]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const password = e.currentTarget.password.value as string;
        const confirmPassword = e.currentTarget.confirmPassword.value as string;

        if (password !== confirmPassword) {
            return toast.warn("Passwords do not match");
        }
        if (password.length < 8) {
            return toast.warn("Password should be at least 8 characters");
        }

        try {
            setLoading(true);
            const result = await updatePassword(APIEndPoints.resetPassword, {
                password,
            });

            if (result.status === 200) {
                toast.success("Password updated successfully");
                localStorage.removeItem("p_r_token"); // Clear the reset token
                router.push("/auth/login");
            } else {
                toast.error(result.message || "Failed to update password");
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error("Failed to update password");
        }
    };

    return (
        <div className="flex flex-col justify-center h-full w-11/12 md:w-3/5 lg:w-1/2 border-[#3B82F6] border-2 rounded-md py-8 px-2 mx-auto">
            <h2
                className={`text-4xl md:text-5xl dark:text-[#F8FAFC] text-center font-light tracking-wide ${notoSerif.className}`}
            >
                Reset Password
            </h2>
            <p className="pt-4 pb-8 text-center text-lg dark:text-[#F8FAFC]">
                Enter your new password below
            </p>
            <form onSubmit={handleSubmit} className="mx-auto w-full max-w-md space-y-5">
                <div className="relative">
                    <label className="block text-foreground text-sm mb-2">New Password</label>
                    <input
                        type={showPass1 ? "text" : "password"}
                        name="password"
                        placeholder="Enter new password"
                        className="w-full h-12 rounded-lg bg-[#F5F7FA] border border-[#6B6B6B] px-4 pr-10 outline-0 text-black"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPass1(!showPass1)}
                        className="cursor-pointer absolute right-3 top-10 text-[#6B6B6B] hover:text-[#3B82F6]"
                    >
                        {showPass1 ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                        )}
                    </button>
                </div>

                <div className="relative">
                    <label className="block text-foreground text-sm mb-2">Confirm Password</label>
                    <input
                        type={showPass2 ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirm new password"
                        className="w-full h-12 rounded-lg bg-[#F5F7FA] border border-[#6B6B6B] px-4 pr-10 outline-0 text-black"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPass2(!showPass2)}
                        className="cursor-pointer absolute right-3 top-10 text-[#6B6B6B] hover:text-[#3B82F6]"
                    >
                        {showPass2 ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                        )}
                    </button>
                </div>

                <button
                    disabled={loading}
                    type="submit"
                    className="cursor-pointer w-full h-12 bg-[#3B82F6] text-white rounded-md text-lg font-medium hover:bg-[#2563EB] transition"
                >
                    {loading ? "Updating..." : "Update Password"}
                </button>
            </form>
        </div>
    );
}

export default UpdatePasswordForm;
