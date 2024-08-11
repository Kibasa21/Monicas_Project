import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "../styles/globals.css";
import Header from "../../components/header/Header";

import { cn } from "@/lib/utils"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Ella the Housekeeper",
  description: "A virtual assistant for your home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-possible-background-image bg-cover bg-no-repeat">
        <Header />
        {children}
      </body>
    </html>
  );
}
