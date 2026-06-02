"use client";

import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import { ChevronsUpDownIcon, PlusIcon } from "lucide-react";

export function TeamSwitcher({
  teams,
  activeTeam,
}: {
  teams: {
    id: number;
    name: string;
    logo: string;
    plan: string;
    subdomain: string;
  }[];
  activeTeam: {
    name: string;
    logo: string;
    plan: string;
    subdomain: string;
  };
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { isMobile } = useSidebar();

  if (!activeTeam) {
    return null;
  }

  const ActiveIcon = Icons[activeTeam.logo as keyof typeof Icons] as LucideIcon;

  return (
    <SidebarMenu>
      <SidebarMenuItem className="">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-muted data-[state=open]:text-muted-foreground"
            >
              <div className="flex aspect-square size-7 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                {ActiveIcon ? <ActiveIcon className="size-4" /> : null}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium text-accent-foreground">
                  {activeTeam.name}
                </span>
              </div>
              <ChevronsUpDownIcon className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded"
            align="start"
            side={"top"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Shops
            </DropdownMenuLabel>
            {teams.map((team, index) => {
              const Icon = Icons[team.logo as keyof typeof Icons] as LucideIcon;
              return (
                <DropdownMenuItem
                  key={team.name}
                  onClick={() => {
                    const segments = pathname.split("/");

                    segments[2] = String(team.id);

                    const newPath = segments.join("/");

                    router.push(newPath);
                  }}
                  className="gap-2 p-2"
                >
                  <div className="flex size-6 items-center justify-center rounded-md border">
                    {Icon ? <Icon className="size-4" /> : null}
                  </div>
                  {team.name}

                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              );
            })}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <Link
                href={"/dashboard/onboarding"}
                className="flex items-center gap-2 w-full"
              >
                <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                  <PlusIcon className="size-4" />
                </div>
                <div className="font-medium text-muted-foreground">
                  Create new
                </div>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
