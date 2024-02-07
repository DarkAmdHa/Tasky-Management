import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/ui/globals.css";
import { AuthProvider } from "@/contexts/authContext";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        {/* Same as */}
        <ToastContainer />
      </body>
    </html>
  );
}
