import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export const errorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);

  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Validation error",
      errors: err.issues,
    });
  }

  res.status(500).json({ error: "Server Error", message: err.message });
};