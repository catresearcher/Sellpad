import express from "express";
import { Shop } from "../../generated/prisma";

declare global {
  namespace Express {
    interface Request {
      user?: Record<string, any>;
      shopId?: number;
    }
  }
}
