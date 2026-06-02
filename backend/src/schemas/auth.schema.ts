import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
    "Password must contain at least one lowercase letter, one uppercase letter, and one number",
  );

export const loginUserSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  // turnstileToken: z.string(),
});

export const forgotPasswordSchema = z.object({
  turnstileToken: z.string(),
});

export const createUserSchema = z.object({
  email: z.email("Email is required"),
  username: z.string().min(1, "Username is required"),
  password: passwordSchema,
  // turnstileToken: z.string(),
});
