"use client";

import Image from "next/image";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/firebase/client";
import { signIn, signUp } from "@/lib/actions/auth.action";
import { toast } from "sonner";
import { useState } from "react";

type Props = {
    onSuccess?: () => void;
    };

    export default function GoogleLoginButton({ onSuccess }: Props) {
    const [loading, setLoading] = useState(false);

    const handleGoogleLogin = async () => {
        if (loading) return;

        try {
        setLoading(true);

        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({
            prompt: "select_account",
        });

        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        if (!user.email) {
            toast.error("Google account has no email");
            return;
        }

        const idToken = await user.getIdToken();

        // 🔹 Try backend sign-in first
        const signInResult = await signIn({
            email: user.email,
            idToken,
        });

        // 🔹 If user does not exist in Firestore → create
        if (!signInResult.success && signInResult.message.includes("User does not exist")) {
            const signUpResult = await signUp({
            uid: user.uid,
            name: user.displayName || "User",
            email: user.email,
            });

            if (!signUpResult.success) {
            toast.error(signUpResult.message);
            return;
            }

            // 🔁 Try sign-in again
            const finalSignIn = await signIn({
            email: user.email,
            idToken,
            });

            if (!finalSignIn.success) {
            toast.error(finalSignIn.message);
            return;
            }
        } else if (!signInResult.success) {
            toast.error(signInResult.message);
            return;
        }

        toast.success("Signed in with Google 🎉");
        onSuccess?.();

        } catch (error: any) {
        console.error("Google login error:", error);

        if (error.code === "auth/popup-closed-by-user") {
            toast.info("Login cancelled");
        } else {
            toast.error("Google sign-in failed");
        }
        } finally {
        setLoading(false);
        }
    };

    return (
        <button
    type="button"
    onClick={handleGoogleLogin}
    disabled={loading}
    className="
        group
        relative
        w-full
        flex items-center justify-center gap-3
        rounded-xl
        border border-white/10
        bg-white/95
        text-black
        py-2
        font-medium
        shadow-sm
        transition-all
        duration-200
        hover:bg-white
        hover:shadow-md
        active:scale-[0.99]
        disabled:opacity-60
        disabled:cursor-not-allowed
    "
    >
    {/* Google Icon */}
    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-sm">
        <Image
            src="/google.png"
            alt="Google"
            width={24}
            height={24}
            className="w-6 h-6"
        />
    </span>



    {/* Text */}
    <span className="text-sm">
        {loading ? "Signup  with Google..." : "Signup with Google"}
    </span>

    {/* Subtle glow on hover */}
    <span
        className="
        pointer-events-none
        absolute
        inset-0
        rounded-xl
        ring-1
        ring-transparent
        group-hover:ring-black/5
        transition
        "
    />
</button>

    );
}
