import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Inter } from "next/font/google";
import React from "react";
import { Bounce, ToastContainer } from "react-toastify";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
function Providers({
  children,
  colorMode,
}: React.PropsWithChildren<{ colorMode?: string }>) {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={colorMode as "light" | "dark"}
            transition={Bounce}
          />
          {children}
        </NextUIProvider>
      </QueryClientProvider>
    </>
  );
}

export default Providers;
