import "@/app/_styles/globals.css";
import { Quicksand } from "next/font/google";
import Header from "./_components/Header";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

const quicksand = Quicksand({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s | Kaya",
    default: "Kaya",
  },
  description:
    "Dual-authentication e-commerce solution for businesses (CNPJ) and consumers (CPF). Built with Next.js 15, MongoDB and NextAuth. Experience secure shopping and streamlined selling.",
  keywords: [
    "nextjs ecommerce",
    "firebase store",
    "CPF CNPJ authentication",
    "modern online shopping",
    "Next.js 15 e-commerce",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${quicksand.className} antialiased`}>
        <SessionProvider>
          <Toaster />
          <Header />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
