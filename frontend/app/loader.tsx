import { DotsMove } from "@/components/assets/svgs";
import React from "react";
import { useShop } from "@/context/shopContext";
import { useUser } from "@/context/userContext";

interface LoadingScreenProviderProps {
  children: React.ReactNode;
}

export default function LoadingScreenProvider({
  children,
}: LoadingScreenProviderProps) {
  const { isLoading: isLoadingShop } = useShop();
  const { isLoading: isLoadingUser } = useUser();

  if (isLoadingShop || isLoadingUser) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background gap-3">
        <h1 className="text-4xl font-semibold">Sellpad</h1>
        <DotsMove className="text-primary size-12" />
      </div>
    );
  }

  return <>{children}</>;
}
