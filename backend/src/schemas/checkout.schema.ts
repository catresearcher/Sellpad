import { z } from "zod";

export const createCheckoutSchema = z.object({
  shopId: z
    .number("ShopId is invalid")
    .int("ShopId is invalid")
    .positive("ShopId is invalid"),
  items: z
    .array(
      z.object({
        productId: z.number("Items are invalid"),
        variantId: z
          .number("Items are invalid")
          .int("Items are invalid")
          .positive("Items are invalid"),
        quantity: z
          .number("Items are invalid")
          .int("Items are invalid")
          .positive("Items are invalid"),
      })
    )
    .nonempty("items cannot be empty"),
});

export const updateCheckoutSchema = z.object({
  checkoutId: z.string().min(1, "CheckoutId is invalid"),
  email: z.email("Email is invalid"),
  paymentMethod: z.string("Payment method is invalid"),
});

export const checkoutInfoSchema = z.object({
  checkoutId: z.string().min(1, "CheckoutId is invalid"),
});
