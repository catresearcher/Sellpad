"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <SwitchPrimitive.Root
      className={cn(
        "cursor-pointer peer inline-flex w-13 items-center rounded-full bg-input dark:bg-secondary shadow-xs border border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      )}
      checked={isDark}
      onCheckedChange={toggleTheme}
      aria-label="Toggle theme"
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "flex h-6.5 w-6.5 items-center justify-center rounded-full bg-background shadow-md transition-transform duration-200",
          "data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0 bg-background dark:bg-card",
        )}
      >
        {isDark ? (
          <Moon className="h-3 w-3 text-yellow-500" />
        ) : (
          <Sun className="h-3 w-3 text-yellow-500" />
        )}
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  );
}
