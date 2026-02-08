"use client";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { auth } from "@/firebase/client";
import FormField from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { emailVerificationConfig, fallbackEmailVerificationConfig } from "@/lib/emailConfig";

const schema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    });

    export default function SignUpForm({
    onVerificationRequired,
    }: {
    onVerificationRequired: (email: string) => void;
    }) {
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: { name: "", email: "", password: "" },
    });

    async function onSubmit(values: z.infer<typeof schema>) {
        try {
        const { name, email, password } = values;

        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(cred.user, { displayName: name });

        try {
            await sendEmailVerification(cred.user);
        } catch {
            try {
            await sendEmailVerification(cred.user, emailVerificationConfig);
            } catch {
            await sendEmailVerification(cred.user, fallbackEmailVerificationConfig);
            }
        }

        localStorage.setItem(`pendingUser_${cred.user.uid}`, name);
        toast.success("Account created! Verify your email.");
        onVerificationRequired(email);
        } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Signup failed";
        toast.error(errorMessage);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
                <FormField control={form.control} name="name" label="Name" placeholder="Enter your name"/>
                <FormField control={form.control} name="email" label="Email" placeholder="Your email" />
                <FormField control={form.control} name="password" label="Password" type="password" placeholder="Your password" />
                <Button className="btn">Create Account</Button>
            </form>
        </Form>
    );
}
