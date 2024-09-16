import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const inter = Poppins({ subsets: ["latin"], weight: ["300", "600"] });

export const metadata: Metadata = {
  title: "Oh My Trip",
  description: "Red Social por y para Viajeros",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="max-w-[1000px] mx-auto text-TextPrimary">
          {children}
        </main>
      </body>
    </html>
  );
}
