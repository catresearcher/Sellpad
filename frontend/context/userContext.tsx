"use client";
import { fetchUser } from "@/api/user/user";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { createContext } from "react";

export type User = {
  username: string;
  email: string;
  avatar?: string;
  role: string;
  tier: number;
};

type UserContextType = {
  user: User | undefined;
  isLoading: boolean;
  login: (data: User) => void;
  logout: () => void;
};

export const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  const user = data ?? undefined;

  function login(data: User) {
    queryClient.setQueryData(["user"], data);
  }

  function logout() {
    queryClient.setQueryData(["user"], null);
  }
  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
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
