"use client";
import { useState, useTransition } from "react";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { editProductFormSchema } from "@/schemas/form.schema";
import * as z from "zod";
import { FullProduct, User } from "@/types/user";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp, XIcon } from "@/components/assets/svgs";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { TipTapEditor } from "./TipTapEditor";

interface EditProductFormProps {
  product: FullProduct;
  user: User;
}

export function EditProductForm({ product, user }: EditProductFormProps) {
  const [isPending, startTransition] = useTransition();
  const [openVariants, setOpenVariants] = useState<Record<string, boolean>>({});

  const form = useForm<z.infer<typeof editProductFormSchema>>({
    resolver: zodResolver(editProductFormSchema),
    defaultValues: {
      name: product.name,
      description: product.description ?? "",
      visibility: product.visibility,
      variants: product.variants?.map((v) => ({
        id: v.id,
        name: v.name,
        price: v.price.toString(),
        deliverables: v.deliverables?.join(", ") ?? "",
      })) || [{ name: "", price: "", deliverables: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variants",
  });

  const onSubmit = async (values: z.infer<typeof editProductFormSchema>) => {
    startTransition(async () => {
      const variants = values.variants.map((variant) => ({
        ...variant,
        deliverables: variant.deliverables
          ?.split("\n")
          .map((line) => line.trim())
          .filter(Boolean),
        price: variant.price,
      }));

      const payload = {
        ...values,
        variants,
      };

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/shop/${user.shops[0].id}/products/${product.id}/update`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(payload),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          toast.error(data.error || "An error occurred");
          return;
        }

        toast.success(data.message);
      } catch (err) {
        toast.error("An unexpected error occurred");
        console.error(err);
      }
    });
  };

  const watchedVariants = useWatch({
    control: form.control,
    name: "variants",
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-8 md:grid-cols-2"
      >
        <div className="rounded-md border dark:border-0 bg-card p-6 shadow-sm flex flex-col gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter product name"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="visibility"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Visibility</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={isPending}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="Public">Public</SelectItem>
                      <SelectItem value="Private">Private</SelectItem>
                      <SelectItem value="Unlisted">Unlisted</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <TipTapEditor
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-md border dark:border-0 bg-card p-6 shadow-sm flex flex-col gap-6">
            {fields.map((fieldItem, index) => (
              <Collapsible
                key={fieldItem.id}
                className="border rounded-md overflow-hidden"
                open={openVariants[fieldItem.id] ?? false}
                onOpenChange={(open) =>
                  setOpenVariants((prev) => ({ ...prev, [fieldItem.id]: open }))
                }
              >
                <CollapsibleTrigger asChild>
                  <div className="flex justify-between items-center p-4 cursor-pointer bg-accent dark:bg-input/30">
                    <div className="flex items-center gap-2">
                      {openVariants[fieldItem.id] ?? false ? (
                        <ChevronUp />
                      ) : (
                        <ChevronDown />
                      )}
                      <h4 className="font-semibold">
                        {watchedVariants[index]?.name || `Variant ${index + 1}`}
                      </h4>
                    </div>
                    <div className="flex gap-2 items-center">
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          remove(index);
                        }}
                        disabled={isPending}
                      >
                        <XIcon />
                      </Button>
                    </div>
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent className="p-4 flex flex-col gap-4">
                  <FormField
                    control={form.control}
                    name={`variants.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Variant Name"
                            {...field}
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`variants.${index}.price`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter price"
                            value={field.value}
                            disabled={isPending}
                            onChange={(e) => {
                              let val = e.target.value.replace(/,/g, ".");
                              if (/^\d*\.?\d{0,2}$/.test(val))
                                field.onChange(val);
                            }}
                            onBlur={(e) => {
                              let val = e.target.value.replace(/,/g, ".");
                              if (val && !isNaN(parseFloat(val)))
                                field.onChange(parseFloat(val).toFixed(2));
                            }}
                            inputMode="decimal"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`variants.${index}.deliverables`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Deliverables</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter one deliverable per line"
                            {...field}
                            disabled={isPending}
                            className="h-32 resize-y"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CollapsibleContent>
              </Collapsible>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => append({ name: "", price: "", deliverables: "" })}
              disabled={isPending}
            >
              Add Variant
            </Button>
            {fields.length === 0 && (
              <FormMessage>
                {form.formState.errors.variants?.root?.message}
              </FormMessage>
            )}
          </div>

          <div className="flex gap-4">
            <Button type="submit" className="flex-1" disabled={isPending}>
              {isPending ? "Updating..." : "Update"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
