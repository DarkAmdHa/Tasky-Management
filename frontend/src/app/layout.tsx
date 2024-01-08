import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/ui/globals.css";
import { AuthProvider } from "@/contexts/authContext";
require("@/config/config");

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tasky Management",
  description: "Manage your tasks with ease!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
