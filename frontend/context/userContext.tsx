"use client";
import { fetchUser } from "@/api/user/user";
import { User } from "@/types/user.type";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

type WalletCurrency = User["wallets"][number]["currency"];

type UserContextType = {
  user: User | undefined;
  isLoading: boolean;
  refetch: any;

  login: (data: User) => void;
  logout: () => void;
};

export const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 1,
    retry: false,
  });

  const user = data ?? undefined;

  function login(data: User) {
    queryClient.setQueryData(["user"], data);
  }

  async function logout() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      if (!response.ok) {
        return toast.error("Logout failed");
      }

      window.location.href = "/login";
    } catch (error) {
      console.log(error);
    } finally {
      queryClient.setQueryData(["user"], null);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      window.location.href = "/login";
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        refetch: refetchUser,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = React.useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}
