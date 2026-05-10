import { Request, Response, NextFunction } from "express";
import sessionService from "../services/sessionService";
import { asyncHandler } from "../utils/asyncHandler";

export async function validateSession(token: string | undefined) {
  if (!token) return { valid: false, reason: "Unauthorized: No token" };

  try {
    const session = await sessionService.findSessionWithUserByToken(token);

    if (!session) {
      return { valid: false, reason: "Unauthorized: Invalid session" };
    }

    if (session.expiresAt && new Date(session.expiresAt) < new Date()) {
      await sessionService.deleteSessionById(session.id);
      return { valid: false, reason: "Session expired" };
    }

    return { valid: true, session };
  } catch (err) {
    return {
      valid: false,
      reason: "An error occurred while validating the session",
    };
  }
}

export const sessionAuth = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.fgr;

    const result = await validateSession(token);

    if (!result.valid || !result.session) {
      res.clearCookie("fgr", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });

      return res.status(401).json({ error: result.reason });
    }

    req.user = result.session.user;
    next();
  },
);

export const blockIfAuthenticated = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.fgr;

    if (!token) {
      return next();
    }

    try {
      const session = await sessionService.findSessionWithUserByToken(token);

      if (!session) {
        res.clearCookie("fgr", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
        });
        return next();
      }

      return res.status(400).json({ error: "You are already authenticated" });
    } catch (err) {
      return res
        .status(500)
        .json({ error: "An error occurred while checking authentication" });
    }
  },
);
