import { NextFunction, Request, Response } from "express";
import shopService from "../services/shop.service";

export async function TenantMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const origin = req.get("origin");

  if (!origin) {
    return res.status(400).json({ error: "Missing origin" });
  }

  let hostname: string;

  try {
    hostname = new URL(origin).hostname;
  } catch {
    return res.status(400).json({ error: "Invalid origin" });
  }

  const parts = hostname.split(".");

  const tenant = parts.length > 1 ? parts[0] : null;

  console.log("tenant", tenant);
  if (!tenant) return res.status(400).json({ error: "Missing tenant" });

  const shop = await shopService.findShopByTenant(tenant);

  if (!shop) return res.status(404).json({ error: "Shop not found" });

  req.shopId = shop.id;
  next();
}
