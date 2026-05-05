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
import { useParams } from "next/navigation";
import { SidebarHeaderContent } from "./sidebarHeader";

type SidebarProps = React.ComponentProps<typeof Sidebar> & {
  teams: any;
};

export function AppSidebar({ teams, ...props }: SidebarProps) {
  const params = useParams();
  const shopId = params?.shopId as string;

  const [activeTeam, setActiveTeam] = React.useState(
    teams.find((t: any) => t.id === shopId) || teams[0],
  );

  React.useEffect(() => {
    const teamFromUrl = teams.find((t: any) => t.id === shopId);
    if (teamFromUrl) {
      setActiveTeam(teamFromUrl);
    }
  }, [shopId, teams]);

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
        <SidebarHeaderContent />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <TeamSwitcher
          teams={teams}
          activeTeam={activeTeam}
          setActiveTeam={setActiveTeam}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
