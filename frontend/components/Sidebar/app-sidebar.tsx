"use client";

import * as React from "react";

import { NavMain } from "@/components/Sidebar/nav-main";
import { TeamSwitcher } from "@/components/Sidebar/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarStoreLink,
} from "@/components/ui/sidebar";

import {
  Bitcoin,
  CreditCard,
  Database,
  DatabaseSearch,
  Download,
  Globe,
  House,
  Layers,
  Package,
  ReceiptText,
  Settings,
  ShieldCheck,
  ShieldOff,
  Terminal,
  Ticket,
  UserRoundSearch,
  Users,
  Wallet,
} from "lucide-react";

import { useParams } from "next/navigation";
import { SidebarHeaderContent } from "./sidebarHeader";

type SidebarProps = React.ComponentProps<typeof Sidebar> & {
  teams: any;
};

export function getNavMain(activeTeamId: number) {
  return [
    {
      title: "Dashboard",
      url: `/dashboard/${activeTeamId}/overview`,
      icon: <House />,
    },
    {
      title: "Catalog",
      url: `/dashboard/${activeTeamId}/products`,
      icon: <Layers />,
      items: [
        {
          title: "Products",
          url: `/dashboard/${activeTeamId}/products`,
          icon: <Package />,
        },
      ],
    },
    {
      title: "Orders",
      url: `/dashboard/${activeTeamId}/products`,
      icon: <ReceiptText />,
      items: [
        {
          title: "Customers",
          url: `/dashboard/${activeTeamId}/customers`,
          icon: <UserRoundSearch />,
        },
        {
          title: "Tickets",
          url: `/dashboard/${activeTeamId}/tickets`,
          icon: <Ticket />,
        },
      ],
    },
    {
      title: "Wallets",
      url: `/dashboard/${activeTeamId}/products`,
      icon: <Wallet />,
      items: [
        {
          title: "Crypto",
          url: `/dashboard/${activeTeamId}/crypto`,
          icon: <Bitcoin />,
        },
      ],
    },
    {
      title: "Settings",
      url: `/dashboard/${activeTeamId}/products`,
      icon: <Settings />,
      items: [
        {
          title: "Team",
          url: `/dashboard/${activeTeamId}/team`,
          icon: <Users />,
        },
        {
          title: "Domains",
          url: `/dashboard/${activeTeamId}/domains`,
          icon: <Globe />,
        },
        {
          title: "Import",
          url: `/dashboard/${activeTeamId}/import`,
          icon: <Download />,
        },
        {
          title: "Blacklist",
          url: `/dashboard/${activeTeamId}/blacklist`,
          icon: <ShieldOff />,
        },
        {
          title: "Whitelist",
          url: `/dashboard/${activeTeamId}/whitelist`,
          icon: <ShieldCheck />,
        },
      ],
    },
  ];
}

export function AppSidebar({ teams, ...props }: SidebarProps) {
  const params = useParams();
  const shopId = params?.shopId as string;

  const [activeTeam, setActiveTeam] = React.useState(
    teams.find((t: any) => t.id === shopId) || teams[0],
  );

  React.useEffect(() => {
    const teamFromUrl = teams.find((t: any) => t.id === shopId);
    if (teamFromUrl) setActiveTeam(teamFromUrl);
  }, [shopId, teams]);

  const navMain = getNavMain(activeTeam.id);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="p-4">
        <SidebarHeaderContent />
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>

      <SidebarFooter>
        <SidebarStoreLink href={`/products`}>Visit Store</SidebarStoreLink>

        <TeamSwitcher
          teams={teams}
          activeTeam={activeTeam}
          setActiveTeam={setActiveTeam}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
