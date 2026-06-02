import { z } from "zod";

export const createShopSchema = z.object({
  name: z.string().min(3, "Store name must be at least 3 characters long"),
  subdomain: z.string().min(3, "Subdomain must be at least 3 characters long"),
  description: z
    .string()
    .min(6, "Store description must be at least 6 characters long"),
});
