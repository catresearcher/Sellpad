import { HandleRequestError } from "@/lib/errorHandler";
import { LoginProps } from "@/types/auth.type";

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function LoginApi({ password, username }: LoginProps) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        username,
        password,
      }),
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
