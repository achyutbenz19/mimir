import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import { AI } from "./action";

export const metadata: Metadata = {
  title: "Mimir",
  description: "ask anything.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-serif selection:bg-rose-400 mx-10 tracking-wide`}>
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
