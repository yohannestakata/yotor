import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const clashDisplay = localFont({
  src: "/../../public/fonts/ClashDisplay-Variable.ttf",
  variable: "--font-display",
});

const archivo = localFont({
  src: "/../../public/fonts/Archivo-Variable.ttf",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
        {children}
      </body>
    </html>
  );
}
