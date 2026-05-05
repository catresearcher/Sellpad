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
  SidebarMenuButton,
  SidebarRail,
  SidebarStoreLink,
} from "@/components/ui/sidebar";
import {
  BadgePercent,
  Bitcoin,
  Boxes,
  CreditCard,
  Download,
  Globe,
  House,
  Layers,
  LayoutList,
  ListChecksIcon,
  Package,
  ReceiptText,
  Settings,
  Shield,
  ShieldCheck,
  ShieldOff,
  Star,
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
      title: "Dashboard",
      url: `/dashboard/${activeTeam.id}/overview`,
      icon: <House />,
    },
    {
      title: "Catalog",
      url: `/dashboard/${activeTeam.id}/products`,
      icon: <Layers />,
      isActive: true,
      items: [
        {
          title: "Products",
          url: `/dashboard/${activeTeam.id}/products`,
          icon: <Package />,
        },
        {
          title: "Groups",
          url: `/dashboard/${activeTeam.id}/groups`,
          icon: <Boxes />,
        },
        {
          title: "Categories",
          url: `/dashboard/${activeTeam.id}/categories`,
          icon: <LayoutList />,
        },
        {
          title: "Coupouns",
          url: `/dashboard/${activeTeam.id}/coupouns`,
          icon: <BadgePercent />,
        },
      ],
    },
    {
      title: "Orders",
      url: `/dashboard/${activeTeam.id}/products`,
      icon: <ReceiptText />,
      isActive: false,
      items: [
        {
          title: "Invoices",
          url: `/dashboard/${activeTeam.id}/invoices`,
          icon: <ReceiptText />,
        },
        {
          title: "Customers",
          url: `/dashboard/${activeTeam.id}/customers`,
          icon: <UserRoundSearch />,
        },
        {
          title: "Feedbacks",
          url: `/dashboard/${activeTeam.id}/feedbacks`,
          icon: <Star />,
        },
        {
          title: "Tickets",
          url: `/dashboard/${activeTeam.id}/tickets`,
          icon: <Ticket />,
        },
      ],
    },
    {
      title: "Wallets",
      url: `/dashboard/${activeTeam.id}/products`,
      icon: <Wallet />,
      isActive: false,
      items: [
        {
          title: "Crypto",
          url: `/dashboard/${activeTeam.id}/crypto`,
          icon: <Bitcoin />,
        },
      ],
    },
    {
      title: "Settings",
      url: `/dashboard/${activeTeam.id}/products`,
      icon: <Settings />,
      isActive: false,
      items: [
        {
          title: "Payment Methods",
          url: `/dashboard/${activeTeam.id}/payment-methods`,
          icon: <CreditCard />,
        },
        {
          title: "Team",
          url: `/dashboard/${activeTeam.id}/team`,
          icon: <Users />,
        },
        {
          title: "Domains",
          url: `/dashboard/${activeTeam.id}/domains`,
          icon: <Globe />,
        },
        {
          title: "Import",
          url: `/dashboard/${activeTeam.id}/import`,
          icon: <Download />,
        },
        {
          title: "Blacklist",
          url: `/dashboard/${activeTeam.id}/blacklist`,
          icon: <ShieldOff />,
        },
        {
          title: "Whitelist",
          url: `/dashboard/${activeTeam.id}/whitelist`,
          icon: <ShieldCheck />,
        },
        {
          title: "Fraud Logs",
          url: `/dashboard/${activeTeam.id}/fraud-logs`,
          icon: <Shield />,
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
        <SidebarStoreLink
          href={`https://${activeTeam.subdomain}.sellpad.io`}
          className=""
        >
          Visit Store
        </SidebarStoreLink>
        <TeamSwitcher
          teams={teams}
          activeTeam={activeTeam}
          setActiveTeam={setActiveTeam}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
