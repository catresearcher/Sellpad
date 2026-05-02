"use client";
import Form from "@/components/Form/form";
import { useLogin } from "@/hooks/Auth/useLogin";
import { useRegister } from "@/hooks/Auth/useRegister";
import { RegisterSchema } from "@/schemas/auth.schema";
import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { useState } from "react";

export default function Register() {
  const registerMutation = useRegister();
  const [error, setError] = useState("");

  const form = useForm({
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
    validators: {
      onSubmit: RegisterSchema,
    },
    onSubmit: async ({ value }) => {
      setError("");

      try {
        const data = await registerMutation.mutateAsync({
          email: value.email,
          username: value.username,
          password: value.password,
        });
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Login failed, try again later");
        }
      }
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col">
        <h1 className="text-4xl font-medium">
          Create an <span className="text-primary">Account</span>
        </h1>
        <p className="text-muted-foreground text-sm font-medium">
          Already have an account?{" "}
          <Link href={"/login"} className="text-primary">
            Login
          </Link>
        </p>
      </div>

      <Form
        form={form}
        action={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        fields={[
          {
            type: "email",
            label: "Email",
            input: {
              name: "email",
              icon: "icon-[solar--letter-bold]",
              placeHolder: "Email",
            },
          },
          {
            type: "text",
            label: "Username",
            input: {
              name: "username",
              icon: "icon-[solar--user-bold]",
              placeHolder: "Username",
            },
          },
          {
            type: "password",
            label: "Password",
            input: {
              name: "password",
              icon: "icon-[solar--key-bold]",
              placeHolder: "Password",
            },
          },
        ]}
        error={error}
        button={{
          text: "Sign Up",
          disabled: registerMutation.isPending,
          className:
            "text-lg h-12 font-medium hover:bg-primary/90 transition-colors duration-200",
        }}
      />
    </div>
  );
}
