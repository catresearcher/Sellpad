import { useMutation } from "@tanstack/react-query";
import { AuthProps } from "@/types/auth.type";
import { RegisterApi } from "@/api/auth/register";

export function useRegister() {
  return useMutation({
    mutationFn: ({ password, username, email }: AuthProps) =>
      RegisterApi({ email, username, password }),
  });
}
