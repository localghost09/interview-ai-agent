"use client";

import { useState } from "react";
import AuthHeader from "./AuthHeader";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import GoogleLoginButton from "./GoogleLoginButton";
import EmailVerification from "@/components/EmailVerification";
import PasswordReset from "@/components/PasswordReset";
import Link from "next/link";

export default function AuthForm({ type }: { type: FormType }) {
    const [email, setEmail] = useState("");
    const [showVerify, setShowVerify] = useState(false);
    const [showReset, setShowReset] = useState(false);

    // 1️⃣ Password reset screen
    if (showReset && type === "sign-in") {
        return (
        <div className="card-border lg:min-w-[566px]">
            <div className="card py-14 px-10">
            <AuthHeader />
            <PasswordReset onBack={() => setShowReset(false)} />
            </div>
        </div>
        );
    }

    // 2️⃣ Email verification screen
    if (showVerify && type === "sign-up") {
        return (
        <div className="card-border lg:min-w-[566px]">
            <div className="card py-14 px-10">
            <AuthHeader />
            <EmailVerification email={email} />
            </div>
        </div>
        );
    }

    // 3️⃣ MAIN AUTH SCREEN (THIS is where you add Google button)
    return (
        <div className="card-border lg:min-w-[566px]">
        <div className="card py-8 px-10 space-y-8">
            {/* 🔹 Header */}
            <AuthHeader />

            {/* 🔹 GOOGLE LOGIN BUTTON — EXACT LOCATION */}
            {type === "sign-in" && (
            <GoogleLoginButton
                onSuccess={() => {
                window.location.href = "/";
                }}
            />
            )}



            {/* 🔹 Divider */}
            {type ==="sign-in" &&(
            <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">OR</span>
            <div className="flex-1 h-px bg-border" />
            </div>
            )}
            {/* 🔹 Email / Password Forms */}
            {type === "sign-in" ? (
            <SignInForm onForgotPassword={() => setShowReset(true)} />
            ) : (
            <SignUpForm
                onVerificationRequired={(email) => {
                setEmail(email);
                setShowVerify(true);
                }}
            />
            )}
                    <p className="pt-2 text-center text-sm text-muted-foreground">
            {type === "sign-in" ? "No account yet?" : "Already have an account?"}{" "}
            <Link
                href={type === "sign-in" ? "/sign-up" : "/sign-in"}
                className="font-semibold text-blue-500 hover:text-blue-600 hover:underline"
            >
                {type === "sign-in" ? "Sign up" : "Sign in"}
            </Link>
    </p>
        </div>
        </div>
    );
}
