"use client";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { onBoardingFormSchema } from "@/schemas/onboarding.schema";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useCreateShop } from "@/hooks/hooks/use-shop";
import { useRouter } from "next/navigation";
import { useShop } from "@/context/shopContext";

export default function OnBoarding() {
  const router = useRouter();
  const { addShop, setSelectedShop } = useShop();
  const [error, setError] = useState("");

  const shopMutation = useCreateShop();

  const form = useForm({
    defaultValues: {
      name: "",
      subdomain: "",
      description: "",
    },
    validators: {
      onSubmit: onBoardingFormSchema,
    },
    onSubmit: async ({ value }) => {
      setError("");

      try {
        const shop = await shopMutation.mutateAsync({
          name: value.name,
          subdomain: value.subdomain,
          description: value.description,
        });

        addShop(shop);
        setSelectedShop(shop);

        router.push(`/dashboard/${shop.id}/overview`);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Shop creation failed, try again later");
        }
      }
    },
  });

  return (
    <div className="w-full min-h-screen flex p-2">
      <div className="w-[65%] rounded overflow-hidden bg-black inset-0">
        <Image
          src="https://images.unsplash.com/photo-1705077044082-bebb7f597cee?q=100&w=2400&auto=format&fit=crop"
          alt="Purple background"
          width={2400}
          height={1600}
          quality={100}
          priority
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-[35%] flex flex-col justify-center gap-8 p-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-medium">Create Store</h1>
          <p className="text-lg text-muted-foreground">
            Launch your online store.
          </p>
        </div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="flex flex-col gap-8"
        >
          <FieldGroup className="flex flex-row items-start gap-4 w-full">
            <form.Field
              name="name"
              children={(field: any) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field
                    data-invalid={isInvalid}
                    className="flex-1 gap-2 w-[45%]"
                  >
                    <label className="font-medium text-accent-foreground">
                      Store Name
                    </label>

                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="text"
                      id={field.name}
                      name={field.name}
                      onBlur={field.handleBlur}
                      aria-invalid={isInvalid}
                      placeholder="Store name"
                      autoComplete="off"
                      icon="icon-[boxicons--store]"
                    />
                  </Field>
                );
              }}
            />

            <form.Field
              name="subdomain"
              children={(field: any) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field
                    data-invalid={isInvalid}
                    className="flex-1 gap-2 w-[45%]"
                  >
                    <label className="font-medium text-accent-foreground">
                      Store Subdomain
                    </label>

                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="text"
                      id={field.name}
                      name={field.name}
                      onBlur={field.handleBlur}
                      aria-invalid={isInvalid}
                      placeholder="mystore"
                      autoComplete="off"
                      subdomain={true}
                    />
                  </Field>
                );
              }}
            />
          </FieldGroup>
          <form.Field
            name="description"
            children={(field: any) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid} className="flex-1 gap-2 w-full">
                  <label className="font-medium text-accent-foreground">
                    Store Description
                  </label>

                  <Textarea
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    id={field.name}
                    name={field.name}
                    onBlur={field.handleBlur}
                    aria-invalid={isInvalid}
                    placeholder="e.g. Curated game accounts and digital keys — instant delivery, lifetime warranty."
                    autoComplete="off"
                  />
                </Field>
              );
            }}
          />
          <Button
            type="submit"
            disabled={shopMutation.isPending}
            className={`text-lg h-12 w-full  font-medium hover:bg-primary/90 transition-colors duration-200${
              shopMutation.isPending
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer"
            }`}
          >
            {shopMutation.isPending ? <Spinner size="6" /> : `Create Shop`}
          </Button>
        </form>
      </div>
    </div>
  );
}
