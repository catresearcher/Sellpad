"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  SparklesIcon,
  BadgeCheckIcon,
  CreditCardIcon,
  BellIcon,
  LogOutIcon,
} from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

import { usePathname } from "next/navigation";
import { Shop } from "@/context/shopContext";
import React from "react";

interface HeaderProps {
  selectedShop: Shop;
}

export default function Header({ selectedShop }: HeaderProps) {
  const user = {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  };

  const path = usePathname();
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-border gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-4 px-4 h-full">
        <SidebarTrigger className="" />
        <hr className="w-px h-full bg-border"></hr>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="font-medium text-muted-foreground">
              Dashboard
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem className="font-medium text-muted-foreground">
              {selectedShop?.name}
            </BreadcrumbItem>

            {path
              .split("/")
              .filter(Boolean)
              .slice(2)
              .map((segment, idx, arr) => {
                const label =
                  segment.charAt(0).toUpperCase() + segment.slice(1);
                const href =
                  "/" +
                  [
                    "dashboard",
                    selectedShop?.id,
                    ...arr.slice(0, idx + 1),
                  ].join("/");

                return (
                  <React.Fragment key={idx}>
                    <BreadcrumbSeparator />

                    <BreadcrumbItem>
                      <BreadcrumbLink
                        href={href}
                        className={`font-medium capitalize ${
                          idx === arr.length - 1
                            ? "text-white"
                            : "text-muted-foreground"
                        }`}
                      >
                        {label}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </React.Fragment>
                );
              })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="px-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src="https://cdn.discordapp.com/attachments/1123416011056631909/1372312669771661353/togif.gif?ex=69f7b2c4&is=69f66144&hm=bb9d610a93f3abff96228cc9528341c791af3e458cab55f59bd883068de0b625&" />
              <AvatarFallback>CN</AvatarFallback>
              <AvatarBadge className="bg-green-600 dark:bg-green-800" />
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={"bottom"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="rounded-lg">
                  <AvatarImage
                    className="rounded-lg"
                    src="https://cdn.discordapp.com/attachments/1123416011056631909/1372312669771661353/togif.gif?ex=69f7b2c4&is=69f66144&hm=bb9d610a93f3abff96228cc9528341c791af3e458cab55f59bd883068de0b625&"
                  />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <SparklesIcon />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheckIcon />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCardIcon />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BellIcon />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOutIcon />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
