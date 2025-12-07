import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

// Import Inter font from Google Fonts for better typography
const inter = Inter({ subsets: ["latin"] });

// Metadata for SEO and browser display
export const metadata: Metadata = {
  title: "Task Manager - Organize Your Life",
  description: "A simple and secure task management application",
};

// Root layout component - wraps all pages
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Navbar />
        <main className="flex-1">
        {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}

