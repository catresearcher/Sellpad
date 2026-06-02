"use client";
import { Button } from "@/components/ui/button";
import PageTitle from "@/components/ui/pageTitle";
import { useShop } from "@/context/shopContext";
import { useUser } from "@/context/userContext";
import { TabSwitcher } from "@/components/Product/tabSwitcher";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createProductFormSchema,
  editProductFormSchema,
} from "@/schemas/form.schema";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";

import { Form } from "@/components/ui/form";

import { XIcon } from "@/components/assets/svgs";

import GeneralTab from "@/components/Product/tabs/generalTab";
import { VariantTab } from "@/components/Product/tabs/variantsTab";
import { useQuery } from "@tanstack/react-query";
import { GetProduct } from "@/api/products/products";
import { Spinner } from "../ui/spinner";

const EditPageChild = ({ productId }: { productId: number }) => {
  const [selectedTab, setSelectedTab] = useState("general");
  const { user } = useUser();
  const { selectedShop } = useShop();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", productId, selectedShop?.id],
    queryFn: () => GetProduct(productId, selectedShop!.id),
    enabled: !!productId && !!selectedShop?.id,
    select: (data) => data.product,
  });

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(editProductFormSchema),
    defaultValues: {
      name: "",
      url_path: "",
      category: "",
      description: "",
      visibility: "Public",
      variants: [],
    },
  });

  useEffect(() => {
    if (!product) return;

    form.reset({
      name: product.name ?? "",
      url_path: product.url_path ?? "",
      category: "",
      description: product.description ?? "",
      visibility: product.visibility ?? "Public",

      variants: Object.values(product.variants ?? {}).map((v: any) => ({
        id: v.id,
        name: v.name ?? "",
        price: v.price ?? "",
        slashed_price: v.slashed_price ?? "",
        min_quantity: v.min_quantity ?? 0,
        max_quantity: v.max_quantity ?? 0,
        description: v.description ?? "",
        deliverables: (v.deliverables ?? []).join("\n"),
      })),
    });
  }, [product]);

  if (isLoading)
    return (
      <div className="w-full h-full flex items-center justify-center">
        {" "}
        <Spinner className="text-primary" />
      </div>
    );

  if (!product) {
    redirect(`/dashboard/${selectedShop?.id}/products`);
  }

  const normalizeDeliverables = (d: unknown): string[] => {
    if (typeof d === "string") {
      return d
        .split("\n")
        .map((l: string) => l.trim())
        .filter(Boolean);
    }

    if (Array.isArray(d)) {
      return d;
    }

    return [];
  };

  const onSubmit = (values: z.infer<typeof editProductFormSchema>) => {
    startTransition(async () => {
      try {
        const variants = values.variants.map((variant) => ({
          ...(variant.id ? { id: Number(variant.id) } : {}),

          name: variant.name,
          description: variant.description,
          price: variant.price,

          slashed_price: variant.slashed_price?.trim()
            ? variant.slashed_price
            : undefined,

          min_quantity: variant.min_quantity,
          max_quantity: variant.max_quantity,

          deliverables: normalizeDeliverables(variant.deliverables),
        }));

        const payload = {
          ...values,
          variants,
        };

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/shop/${selectedShop?.id}/products/${product.id}/update`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(payload),
          },
        );

        const data = await response.json();

        if (!response.ok) {
          toast.error(data.error || "An error occurred");
          return;
        }

        toast.success(data.message);
        router.push(`/dashboard/${selectedShop?.id}/products`);
      } catch (err) {
        toast.error("An unexpected error occurred");
        console.error(err);
      }
    });
  };

  if (user && selectedShop)
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (errors) => {
            console.log("FORM ERRORS:", errors);
          })}
          className=""
        >
          <div className="h-full flex flex-col gap-2">
            <PageTitle
              title="Edit product"
              description="Edit product details below."
            >
              <div className="flex items-center gap-2">
                <div className="flex gap-4">
                  <Button
                    size="lg"
                    type="submit"
                    variant="outline"
                    className="flex-1"
                    disabled={isPending}
                  >
                    {isPending ? "Saving..." : "Save & Exit"}
                  </Button>
                </div>
                <Button size="lg" asChild variant="destructive">
                  <Link href={`/dashboard/${selectedShop?.id}/products`}>
                    <XIcon className="size-5" /> Cancel Editing
                  </Link>
                </Button>
              </div>
            </PageTitle>

            <TabSwitcher
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />

            {selectedTab.toLocaleLowerCase() === "general" ? (
              <GeneralTab form={form} isPending={isPending} />
            ) : (
              <VariantTab form={form} isPending={isPending} />
            )}
          </div>{" "}
        </form>
      </Form>
    );
};

export default EditPageChild;
