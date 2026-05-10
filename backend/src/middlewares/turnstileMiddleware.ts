import { Request, Response, NextFunction } from "express";

interface TurnstileResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
}

export async function verifyTurnstileToken(
  token: string,
): Promise<TurnstileResponse> {
  if (!process.env.TURNSTILE_SECRET) {
    throw new Error("TURNSTILE_SECRET environment variable is not set");
  }

  const verifyUrl = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
  const params = new URLSearchParams();
  params.append("secret", process.env.TURNSTILE_SECRET);
  params.append("response", token);

  const response = await fetch(verifyUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  return response.json();
}

export async function turnstileMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.body.turnstileToken;

    if (!token) {
      return res.status(400).json({ error: "Turnstile token missing" });
    }

    const data = await verifyTurnstileToken(token);

    if (!data.success) {
      return res.status(403).json({
        error: "Turnstile verification failed",
        details: data["error-codes"],
      });
    }

    next();
  } catch (err) {
    console.error("Turnstile middleware error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
