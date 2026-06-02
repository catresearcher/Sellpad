import * as z from "zod";

export const createProductFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  url_path: z.string().optional(),
  category: z.string().optional(),
  description: z.string().optional(),
  visibility: z.enum(["Public", "Private", "Unlisted"]),
  variants: z
    .array(
      z.object({
        name: z.string().min(1, "Variant name is required"),
        description: z.string().optional(),
        price: z
          .string()
          .regex(/^\d+(\.\d{1,2})?$/, "Enter a valid price")
          .refine((val) => parseFloat(val) > 0, {
            message: "Price must be greater than zero",
          }),
        slashed_price: z
          .union([z.string(), z.undefined()])
          .optional()
          .refine((val) => !val || /^\d+(\.\d{1,2})?$/.test(val), {
            message: "Enter a valid slashed price",
          })
          .refine((val) => !val || parseFloat(val) > 0, {
            message: "Price must be greater than zero",
          }),
        min_quantity: z.number(),
        max_quantity: z.number().optional(),
        deliverables: z.array(z.string()).optional(),
      }),
    )
    .min(1, "At least one variant is required"),
});

export const updateProductFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  url_path: z.string().optional(),
  category: z.string().optional(),
  description: z.string().optional(),
  visibility: z.enum(["Public", "Private", "Unlisted"]),
  variants: z
    .array(
      z.object({
        id: z.number().optional(),
        name: z.string().min(1, "Variant name is required"),
        description: z.string().optional(),
        price: z
          .string()
          .regex(/^\d+(\.\d{1,2})?$/, "Enter a valid price")
          .refine((val) => parseFloat(val) > 0, {
            message: "Price must be greater than zero",
          }),
        slashed_price: z
          .union([z.string(), z.undefined()])
          .optional()
          .refine((val) => !val || /^\d+(\.\d{1,2})?$/.test(val), {
            message: "Enter a valid slashed price",
          })
          .refine((val) => !val || parseFloat(val) > 0, {
            message: "Price must be greater than zero",
          }),
        min_quantity: z.number(),
        max_quantity: z.number().optional(),
        deliverables: z.array(z.string()).optional(),
      }),
    )
    .min(1, "At least one variant is required"),
});
