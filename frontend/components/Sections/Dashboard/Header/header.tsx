"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import Profile from "./profile";
import BreadCrumbHeader from "./breadCrumb";
import Notification from "./notification";
import { useTheme } from "next-themes";
import React from "react";

export default function Header() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-border gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-4 px-4 h-full">
        <SidebarTrigger className="" />
        <hr className="w-px h-full bg-border"></hr>
        <BreadCrumbHeader />
      </div>
      <div className="px-4 flex items-center gap-4">
        <span
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          className={
            resolvedTheme === "dark"
              ? "icon-[solar--sun-bold] size-6"
              : "icon-[solar--moon-stars-bold] size-6"
          }
        />
        <Notification />
        <Profile />
      </div>
    </header>
  );
}
