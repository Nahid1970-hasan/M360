import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";


const inter = Inter({ 
  variable: "--font-geist-sans",subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Employee Onboarding Form",
  description: "A multi-step form to onboard new employees.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${inter.variable} ${inter.variable} antialiased`}>
        {children}
        <Toaster /> 
      </body>
    </html>
  );
}