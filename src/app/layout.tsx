import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { Toaster } from "react-hot-toast";
import { Providers } from "./providers";

const clashDisplay = localFont({
  src: "/../../public/fonts/ClashDisplay-Variable.ttf",
  variable: "--font-display",
});

const archivo = localFont({
  src: "/../../public/fonts/Archivo-Variable.ttf",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Yotor Style",
  description: "Casual wear and trendy styles for the young and young at heart",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${clashDisplay.variable} ${archivo.variable} antialiased`}
      >
        <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
