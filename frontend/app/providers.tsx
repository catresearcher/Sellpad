"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme-provider";
import { UserProvider } from "@/context/userContext";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();
import { TooltipProvider } from "@/components/ui/tooltip";
import { ShopProvider } from "@/context/shopContext";
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
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
          theme="dark"
          toastClassName="custom-toast"
          className="font-medium"
        />
        <UserProvider>
          <ShopProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </ShopProvider>
        </UserProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
