import { Metadata } from "next";
import ConditionalNavigation from '@/components/ConditionalNavigation';
import ConditionalFooter from '@/components/ConditionalFooter';

export const metadata: Metadata = {
  title: "Support | AI MockPrep",
  description: "Support and help resources for AI MockPrep",
};

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-black">
      <ConditionalNavigation />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-10">
          {children}
        </div>
      </main>
      <ConditionalFooter />
    </div>
  );
}
