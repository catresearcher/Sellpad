"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

type InputProps = React.ComponentProps<"input"> & {
  icon?: String;
  subdomain?: boolean;
  "aria-invalid"?: boolean;
};

function Input({
  className,
  icon,
  type,
  subdomain,
  "aria-invalid": isInvalid,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  if (subdomain) {
    return (
      <div
        className={cn(
          "flex items-center bg-card gap-2 h-12 w-full rounded-md text-md border px-3 transition-colors",
          "focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
          isInvalid
            ? "border-destructive ring-3 ring-destructive/20 text-destructive"
            : "border-transparent",
          className,
        )}
      >
        {/* User input */}
        <input
          type={showPassword ? "text" : type}
          data-slot="input"
          placeholder="example"
          className="flex-1 w-[35%] h-full bg-transparent outline-none"
          {...props}
        />

        {/* Divider */}
        <div className="h-full w-px bg-border" />

        <span className="text-muted-foreground font-medium px-4 whitespace-nowrap">
          .sellpad.io
        </span>
      </div>
    );
  }
  if (icon) {
    return (
      <div
        className={cn(
          `flex items-center ${type === "password" ? "justify-between" : ""} bg-card gap-2 h-12 w-full rounded-md text-md border px-2.5 transition-colors`,
          "focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
          isInvalid
            ? "border-destructive ring-3 ring-destructive/20 text-destructive"
            : "border-transparent",
          className,
        )}
      >
        <div className="flex items-center gap-2 w-full h-full">
          <span className={`${icon} size-5`}></span>
          <hr className="bg-border h-[50%] w-px"></hr>
          <input
            type={showPassword ? "text" : type}
            data-slot="input"
            className={cn(
              "w-full h-full bg-transparent outline-none",
              className,
            )}
            {...props}
          />
        </div>
        {type === "password" && (
          <>
            {showPassword ? (
              <span
                onClick={() => setShowPassword(false)}
                className="icon-[solar--eye-closed-bold] size-5 cursor-pointer"
              ></span>
            ) : (
              <span
                onClick={() => setShowPassword(true)}
                className="icon-[solar--eye-bold] size-5 cursor-pointer"
              ></span>
            )}
          </>
        )}
      </div>
    );
  }
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
