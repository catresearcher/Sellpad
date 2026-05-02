"use client";
import Form from "@/components/Form/form";
import { useLogin } from "@/hooks/Auth/useLogin";
import { LoginSchema } from "@/schemas/auth.schema";
import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const loginMutation = useLogin();
  const [error, setError] = useState("");

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    validators: {
      onSubmit: LoginSchema,
    },
    onSubmit: async ({ value }) => {
      setError("");

      try {
        const data = await loginMutation.mutateAsync({
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
          Welcome <span className="text-primary">Back</span>
        </h1>
        <p className="text-muted-foreground text-sm font-medium">
          Don't have an account?{" "}
          <Link href={"/register"} className="text-primary">
            Register
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
          text: "Log In",
          disabled: loginMutation.isPending,
          className:
            "text-lg h-12 font-medium hover:bg-primary/90 transition-colors duration-200",
        }}
      />
    </div>
  );
}
