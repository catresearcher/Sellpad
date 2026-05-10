import { createHmac } from "crypto";
import { NextFunction, Request, Response } from "express";

export const signatureMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const signature = req.headers["x-signature"];

  if (!signature || typeof signature !== "string") {
    return res.status(403).json({ error: "Unauthorized access" });
  }

  const sharedSecret = process.env.HMAC_SECRET_KEY!;

  const tenant = req.headers["x-tenant"];

  if (!tenant || typeof tenant !== "string") {
    return res.status(400).json({ error: "Unauthorized access" });
  }

  const hmac = createHmac("sha256", sharedSecret);
  const calculatedSignature = hmac.update(tenant).digest("hex");

  if (signature !== calculatedSignature) {
    console.log(
      "Invalid signature: calculated",
      calculatedSignature,
      "received",
      signature
    );
    return res.status(403).json({ error: "Invalid signature" });
  }

  next();
};
