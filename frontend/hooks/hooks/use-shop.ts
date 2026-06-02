import { createShop } from "@/api/shops/shops";
import { useMutation } from "@tanstack/react-query";

export const useCreateShop = () => {
  return useMutation({
    mutationFn: ({ name, subdomain, description }: any) =>
      createShop({ name, subdomain, description }),
  });
};
