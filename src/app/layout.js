"use client";
import React, { useEffect } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { usePathname, useRouter } from "next/navigation";
import "@/../styles/globals.css";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdminPage = pathname.includes("/admin");
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.shiftKey && event.code === "Enter") {
        router.push("/login");
      } else if (event.shiftKey && event.altKey) {
        router.push("/admin");
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [router]);

  return (
    <>
      <html lang="en">
        <head>
          <link rel="icon" href="/logo-icon.svg" />
        </head>
        <body className="bg-[#2D2E32] overflow-x-hidden min-h-screen flex flex-col">
          {!isAdminPage && <Header />}
          <main className="flex-grow">{children}</main>
          {!isAdminPage && <Footer />}
        </body>
      </html>
    </>
  );
}
