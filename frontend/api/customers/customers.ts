import { CustomerResponse } from "@/hooks/hooks/use-customers";

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchCustomers = async (
  shopId: number,
  page: number,
  search: string,
): Promise<CustomerResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    search,
  });

  const response = await fetch(
    `${apiUrl}/shop/${shopId}/customers?${params.toString()}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch customers");
  }

  return response.json();
};
