import { HandleRequestError } from "@/lib/errorHandler";

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function fetchTransactions(shopId: number): Promise<any> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const response = await fetch(`${apiUrl}/shop/${shopId}/transactions`, {
      method: "GET",
      credentials: "include",
      signal: controller.signal,
    });

    const json = await response.json();

    if (!response.ok)
      throw Error(json.message || "Login failed, try again later");

    return json;
  } catch (error: string | unknown) {
    HandleRequestError("Login failed, try again later", error);
  } finally {
    clearTimeout(timeout);
  }
}
