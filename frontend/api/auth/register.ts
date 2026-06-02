import { HandleRequestError } from "@/lib/errorHandler";
import { AuthProps } from "@/types/auth.type";

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function RegisterApi({ password, username, email }: AuthProps) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const response = await fetch(`${apiUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        username,
        password,
      }),
      signal: controller.signal,
    });

    const json = await response.json();

    if (!response.ok)
      throw Error(json.message || "Register failed, try again later");

    return json;
  } catch (error: string | unknown) {
    HandleRequestError("Register failed, try again later", error);
  } finally {
    clearTimeout(timeout);
  }
}
