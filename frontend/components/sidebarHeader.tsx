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
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-muted data-[state=open]:text-muted-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <span className="icon-[material-symbols--storefront-outline-rounded] text-foreground size-5"></span>
          </div>

          <h1 className="text-3xl text-foreground font-medium">Sellora</h1>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
