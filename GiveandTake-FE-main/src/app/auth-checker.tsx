/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import useLocalStorage from "@/hooks/useLocalStorage";
import { isTokenExpired } from "@/js/auth";
import { redirect, usePathname } from "next/navigation";
import { useEffect } from "react";

function AuthChecker() {
  const pathname = usePathname();
  const [token] = useLocalStorage<string | null>("token", null);

  useEffect(() => {
    if (!token && !pathname.includes("/auth")) redirect("/auth/signin");
    if (token) isTokenExpired(token);
    if (token && pathname.includes("/auth")) {
      redirect("/");
    }
  }, []);
  return <></>;
}

export default AuthChecker;
