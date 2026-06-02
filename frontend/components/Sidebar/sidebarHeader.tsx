"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function SidebarHeaderContent() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <h1 className="text-3xl text-foreground font-medium">Sellpad</h1>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
