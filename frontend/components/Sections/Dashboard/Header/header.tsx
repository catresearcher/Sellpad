"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import Profile from "./profile";
import BreadCrumbHeader from "./breadCrumb";
import Notification from "./notification";
import { ModeToggle } from "@/components/ui/lightSwitch";

export default function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-border gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-4 px-4 h-full">
        <SidebarTrigger className="" />
        <hr className="w-px h-full bg-border"></hr>
        <BreadCrumbHeader />
      </div>
      <div className="px-4 flex items-center gap-4">
        <ModeToggle />
        <Notification />
        <Profile />
      </div>
    </header>
  );
}
