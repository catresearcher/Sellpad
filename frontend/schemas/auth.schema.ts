import { z } from "zod";
export const RegisterSchema = z.object({
  email: z.email(),
  username: z.string().min(3, "Username is too short"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(128, "Password is too long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export const LoginSchema = z.object({
  username: z.string().min(3, "Username is too short"),
  password: z
    .string()
    .min(1, "Password must be at least 1 characters long")
    .max(128, "Password is too long"),
});
