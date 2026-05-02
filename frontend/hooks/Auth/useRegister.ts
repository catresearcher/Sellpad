import { useMutation } from "@tanstack/react-query";
import { AuthProps } from "@/types/Auth";
import { RegisterApi } from "@/api/auth/register";

export function useRegister() {
  return useMutation({
    mutationFn: ({ password, username, email }: AuthProps) =>
      RegisterApi({ username, password, email }),
  });
}
