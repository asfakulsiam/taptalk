import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Inter } from "next/font/google";
import ClientLayoutProvider from "@/providers/client-layout-provider";
import { UserProvider } from "@/contexts/user-context";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "taptalk",
  description: "A simple chat app",
  generator: "Next.js",
  applicationName: "taptalk",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <UserProvider>
              <ClientLayoutProvider>{children}</ClientLayoutProvider>
            </UserProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
