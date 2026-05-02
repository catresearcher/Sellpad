import { useMutation } from "@tanstack/react-query";
import { LoginProps } from "@/types/Auth";
import { LoginApi } from "@/api/auth/login";

export function useLogin() {
  return useMutation({
    mutationFn: ({ password, username }: LoginProps) =>
      LoginApi({ username, password }),
  });
}
