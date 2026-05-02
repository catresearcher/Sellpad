"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ListChecksIcon } from "lucide-react";

type SidebarProps = React.ComponentProps<typeof Sidebar> & {
  teams: any;
};

export function AppSidebar({ teams, ...props }: SidebarProps) {
  const [activeTeam, setActiveTeam] = React.useState(teams[0]);
  const navMain = [
    {
      title: "Shop",
      url: `/dashboard/${activeTeam.id}/products`,
      icon: <ListChecksIcon />,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: `/dashboard/${activeTeam.id}/overview`,
        },
        {
          title: "Products",
          url: `/dashboard/${activeTeam.id}/products`,
        },
        {
          title: "Users",
          url: `/dashboard/${activeTeam.id}/users`,
        },
        {
          title: "Settings",
          url: `/dashboard/${activeTeam.id}/settings`,
        },
      ],
    },
  ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher
          teams={teams}
          activeTeam={activeTeam}
          setActiveTeam={setActiveTeam}
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
    </Sidebar>
  );
}
