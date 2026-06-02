import { Request, Response } from "express";
import userService from "../services/user.service";
import sessionService from "../services/session.service";
import { hash, compare } from "bcrypt";
import { createUserSchema, loginUserSchema } from "../schemas";
import { asyncHandler } from "../utils/asyncHandler";
import shopService from "../services/shop.service";

export const userInfoController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const existingUser = await userService.findUserById(req.user.id);

    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const shops = await shopService.getShopsByUserId(existingUser.id);

    res.status(200).json({
      id: existingUser.id,
      username: existingUser.username,
      role: existingUser.role,
      createdAt: existingUser.createdAt,
      shops,
    });
  },
);

export const createUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const result = createUserSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Validation error",
        errors: result.error.issues,
      });
    }

    const validatedData = result.data;

    const { email, username, password } = validatedData;

    const existingUser = await userService.findUserByUsername(username);
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Email or username already taken!" });
    }

    const hashedPassword = await hash(password, 12);
    const user = await userService.createUser({
      email,
      username,
      password: hashedPassword,
    });

    const sessionToken = await sessionService.createSession(user.id);

    const isProduction = process.env.NODE_ENV === "production";

    const cookieOptions: {
      httpOnly: boolean;
      secure: boolean;
      sameSite: "strict" | "lax" | "none";
      maxAge: number;
      domain?: string;
    } = {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "strict" : "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    };

    if (isProduction && process.env.WebDomain) {
      cookieOptions.domain = process.env.WebDomain.split("//")[1].split(":")[0];
    }

    res.cookie("fgr", sessionToken, cookieOptions);

    res.status(201).json({ message: "Success! User has been created!" });
  },
);

export const userShopsController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const shops = await userService.findUserShopsById(req.user.id);

    res.status(200).json(shops);
  },
);

export const loginUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const result = loginUserSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Validation error",
        errors: result.error.issues,
      });
    }

    const validatedData = result.data;

    const { username, password } = validatedData;

    const user = await userService.findUserByUsername(username);

    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isValid = await compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const sessionToken = await sessionService.createSession(user.id);

    const isProduction = process.env.NODE_ENV === "production";

    const cookieOptions: {
      httpOnly: boolean;
      secure: boolean;
      sameSite: "strict" | "lax" | "none";
      maxAge: number;
      domain?: string;
    } = {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "strict" : "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    };

    if (isProduction && process.env.WebDomain) {
      cookieOptions.domain = process.env.WebDomain.split("//")[1].split(":")[0];
    }

    res.cookie("fgr", sessionToken, cookieOptions);

    const shops = await shopService.getShopsByUserId(user.id);

    res.json({
      message: "Logged in successfully",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      shops: shops,
    });
  },
);

export const logoutUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const token = req.cookies?.fgr;
    if (!token) return res.status(401).send("No token provided");

    await sessionService.logout(token);

    const clearCookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      path: "/",
    };

    res.clearCookie("fgr", clearCookieOptions);

    res.status(200).send("Logged out successfully.");
  },
);

export default {
  userInfoController,
  createUserController,
  userShopsController,
  loginUserController,
  logoutUserController,
};
