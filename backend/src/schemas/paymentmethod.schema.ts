import { z } from "zod";

export const GetPaymentMethodByIdSchema = z.object({
  shopId: z.number("Shop id must be number").int().positive("Shop id can't be negative."),
  id: z.number("Payment method id must be number").int().positive("Payment method id can't be negative.")
});

export const GetAllPaymentMethodSchema = z.object({
  shopId: z.number("Shop id must be number").int().positive("Shop id can't be negative."),
});

export const CreatePaymentMethodSchema = z.object({
  shopId: z.number("Shop id must be number").int().positive("Shop id can't be negative."),
  type: z.string("Type must be string"),
  name: z.string("Name must be string")
});

export const UpdatePaymentMethodSchema = z.object({
  shopId: z.number("Shop id must be number").int().positive("Shop id can't be negative."),
  id: z.number("id must be number").int().positive("id can't be negative."),
  name: z.string("Name must be string")
});
