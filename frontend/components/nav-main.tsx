"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ChevronRightIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: React.ReactNode;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
      icon?: React.ReactNode;
    }[];
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const hasSubItems = item.items && item.items.length > 0;

          if (!hasSubItems) {
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  className="cursor-pointer hover:text-white"
                  tooltip={item.title}
                >
                  <a
                    href={item.url}
                    className={`${pathname === item.url ? "text-primary!" : "hover:text-white! hover:bg-accent-foreground/5!"} transition-all duration-100 font-semibold! `}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          }
          const isSubItemActive = item.items?.some(
            (subItem) => subItem.url === pathname,
          );
          const [open, setOpen] = useState(item.isActive ?? false);
          return (
            <Collapsible
              key={item.title}
              asChild
              open={open}
              onOpenChange={setOpen}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    className={`
                      cursor-pointer transition-all duration-100 font-semibold!
                      hover:text-white!
                      ${isSubItemActive && !open ? "text-primary!" : ""}
                    `}
                    tooltip={item.title}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                    <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <SidebarMenuSub className="flex flex-col gap-2">
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          asChild
                          className={`${
                            pathname === subItem.url
                              ? "text-primary!"
                              : "hover:text-white! hover:bg-accent-foreground/5!"
                          } transition-all duration-100 font-semibold! [&_svg]:text-inherit!`}
                        >
                          <a
                            href={subItem.url}
                            className="font-semibold flex items-center gap-2"
                          >
                            {subItem.icon}
                            <span>{subItem.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
