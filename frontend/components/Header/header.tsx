"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import Profile from "./profile";
import BreadCrumbHeader from "./breadCrumb";
import Notification from "./notification";
import { ModeToggle } from "@/components/ui/lightSwitch";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-sidebar flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-4 px-4 h-full">
        <SidebarTrigger className="flex items-center justify-center sm:hidden" />
        <hr className="w-px h-full bg-border block sm:hidden"></hr>
        <BreadCrumbHeader />
      </div>
      <div className="px-4 flex items-center gap-3">
        <ModeToggle />
        <Notification />
        <Profile />
      </div>
    </header>
  );
}
