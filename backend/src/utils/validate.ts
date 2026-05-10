import { ZodSchema } from "zod";
import { Response } from "express";

export function validateSchema<T>(
  schema: ZodSchema<T>,
  values: unknown,
  res: Response
): T | null {
  const result = schema.safeParse(values);
  if (!result.success) {
    res.status(400).json({
      message: "Validation error",
      errors: result.error.issues,
    });
    return null;
  }
  return result.data;
}