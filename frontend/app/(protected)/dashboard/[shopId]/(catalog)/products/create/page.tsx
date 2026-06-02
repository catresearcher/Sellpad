"use client";
import { Button } from "@/components/ui/button";
import PageTitle from "@/components/ui/pageTitle";
import { useShop } from "@/context/shopContext";
import { useUser } from "@/context/userContext";
import { TabSwitcher } from "@/components/Product/tabSwitcher";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProductFormSchema } from "@/schemas/form.schema";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Form } from "@/components/ui/form";

import { XIcon } from "@/components/assets/svgs";

import GeneralTab from "@/components/Product/tabs/generalTab";
import { VariantTab } from "@/components/Product/tabs/variantsTab";

const CreateProductPage = () => {
  const { user } = useUser();
  const { selectedShop } = useShop();

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof createProductFormSchema>>({
    resolver: zodResolver(createProductFormSchema),
    defaultValues: {
      name: "",
      url_path: "",
      category: "",
      description: "",
      visibility: "Public",
      variants: [
        {
          name: "",
          description: "",
          price: "",
          slashed_price: "",
          min_quantity: 1,
          max_quantity: undefined,
          deliverables: "",
        },
      ],
    },
  });

  const onSubmit = async (values: z.infer<typeof createProductFormSchema>) => {
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
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/shop/${selectedShop?.id}/products`,
          {
            method: "POST",
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

  const [selectedTab, setSelectedTab] = useState("general");

  if (user && selectedShop)
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <div className="h-full flex flex-col gap-2">
            <PageTitle
              title="Create product"
              description="Create your product below."
            >
              <div className="flex items-center gap-2">
                <div className="flex gap-4">
                  <Button
                    size="lg"
                    type="submit"
                    variant="outline"
                    className="flex-1 rounded font-medium px-3.5 cursor-pointer"
                    disabled={isPending}
                  >
                    {isPending ? "Creating..." : "Create"}
                  </Button>
                </div>
                <Button
                  size="lg"
                  asChild
                  variant="destructive"
                  className="rounded"
                >
                  <Link href={`/dashboard/${selectedShop?.id}/products`}>
                    <XIcon className="size-5" /> Cancel Creating
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
          </div>
        </form>
      </Form>
    );
};

export default CreateProductPage;
