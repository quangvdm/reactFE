"use client";
import AuthChecker from "@/app/auth-checker";
import Providers from "@/app/providers";
import LoaderScreen from "@/components/common/Loader/LoaderScreen";
import "@/css/inter.css";
import "@/css/style.css";
import useColorMode from "@/hooks/useColorMode";
import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";
import Head from "next/head";
import React, { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState<boolean>(true);
  const [colorMode] = useColorMode();

  useEffect(() => {
    if (process.env.NODE_ENV === "production")
      setTimeout(() => setLoading(false), 1000);
    else setLoading(false);
  }, []);

  return (
    <html lang="en">
      <Head>
        {colorMode === "dark" ? (
          <link rel="icon" href="/favicon.ico" sizes="any" />
        ) : (
          <link rel="icon" href="/favicon-light.ico" sizes="any" />
        )}
      </Head>
      <body
        suppressHydrationWarning={true}
        className={`min-h-[100dvh] ${colorMode}`}
      >
        {/* <AuthChecker /> */}
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          <Providers colorMode={colorMode as string}>
            {loading ? <LoaderScreen /> : children}
          </Providers>
        </div>
      </body>
    </html>
  );
}
