import { NextFunction, Request, Response } from "express";
import userService from "../services/userService";
import sessionService from "../services/sessionService";
import { hash, compare } from "bcrypt";
import { createUserSchema, loginUserSchema } from "../schemas";
import { asyncHandler } from "../utils/asyncHandler";
import shopService, { getShopsByUserId } from "../services/shopService";

export const getUserInfo = asyncHandler(async (req: Request, res: Response) => {
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
});

export const createUser = asyncHandler(async (req: Request, res: Response) => {
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
    return res.status(400).json({ error: "Email or username already taken!" });
  }

  const hashedPassword = await hash(password, 12);
  await userService.createUser({
    email,
    username,
    password: hashedPassword,
  });

  res.status(201).json({ message: "Success! User has been created!" });
});

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
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

  const shopId = (await getShopsByUserId(user.id))[0]?.id || null;

  res.json({
    message: "Logged in successfully",
    user: {
      id: user.id,
      username: user.role,
      email: user.email,
    },
    shop: shopId,
  });
});

export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
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
});
