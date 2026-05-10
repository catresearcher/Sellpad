import * as z from "zod";

export const createProductFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  visibility: z.enum(["Public", "Private", "Unlisted"]),
  variants: z
    .array(
      z.object({
        name: z.string().min(1, "Variant name is required"),
        price: z
          .string()
          .regex(/^\d+(\.\d{1,2})?$/, "Enter a valid price")
          .refine((val) => parseFloat(val) > 0, {
            message: "Price must be greater than zero",
          }),
        deliverables: z.array(z.string()).optional(),
      })
    )
    .min(1, "At least one variant is required"),
});

export const updateProductFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  visibility: z.enum(["Public", "Private", "Unlisted"]),
  variants: z
    .array(
      z.object({
        id: z.number().optional(),
        name: z.string().min(1, "Variant name is required"),
        price: z
          .string()
          .regex(/^\d+(\.\d{1,2})?$/, "Enter a valid price")
          .refine((val) => parseFloat(val) > 0, {
            message: "Price must be greater than zero",
          }),
        deliverables: z.array(z.string()).optional(),
      })
    )
    .min(1, "At least one variant is required"),
});
