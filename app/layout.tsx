import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import { AI } from "./action";

export const metadata: Metadata = {
  title: "Mimir",
  description: "Ask anything",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.className}>
        <ThemeProvider attribute="class">
          <AI>
            <main>
              {children}
              <Analytics />
            </main>
          </AI>
        </ThemeProvider>
      </body>
    </html>
  );
}