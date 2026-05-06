import { useQueryClient } from "@tanstack/react-query";

export const useQueryInvalidate = (queryKey: string | readonly unknown[]) => {
  const queryClient = useQueryClient();

  const invalidate = () => {
    const keyArray = Array.isArray(queryKey) ? queryKey : [queryKey];
    queryClient.invalidateQueries({ queryKey: keyArray });
  };

  return { invalidate };
};
