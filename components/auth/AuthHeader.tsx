import Image from "next/image";

export default function AuthHeader() {
    return (
        <>
        <div className="flex flex-row gap-2 justify-center">
            <Image src="/logo.svg" alt="logo" height={32} width={38} />
            <h2 className="text-primary-100">AI MockPrep</h2>
        </div>
        <h3>Practice job interview with AI</h3>
        </>
    );
}
