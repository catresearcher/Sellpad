"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  GalleryVerticalEndIcon,
  AudioLinesIcon,
  TerminalIcon,
  TerminalSquareIcon,
  MessageSquareTextIcon,
  NotebookTextIcon,
  ListChecksIcon,
} from "lucide-react";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Apple Inc",
      logo: <GalleryVerticalEndIcon />,
      plan: "Enterprise",
    },
    {
      name: "Teemu Oy.",
      logo: <AudioLinesIcon />,
      plan: "Startup",
    },
    {
      name: "TeemuGang",
      logo: <TerminalIcon />,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Todos",
      url: "/dashboard/todo",
      icon: <ListChecksIcon />,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/dashboard/todo",
        },
        {
          title: "All",
          url: "/dashboard/todo/all",
        },
        {
          title: "Create new",
          url: "/dashboard/todo/create",
        },
      ],
    },
    {
      title: "Notes",
      url: "/dashboard/notes",
      icon: <NotebookTextIcon />,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/dashboard/notes",
        },
        {
          title: "All",
          url: "/dashboard/notes/all",
        },
        {
          title: "Create new",
          url: "/dashboard/notes/create",
        },
      ],
    },
    {
      title: "Chats",
      url: "/dashboard/chats",
      icon: <MessageSquareTextIcon />,
      isActive: true,
      items: [
        {
          title: "# Teemun priva chat",
          url: "/dashboard/notes",
        },
        {
          title: "# Teemun chatti",
          url: "/dashboard/notes/all",
        },
        {
          title: "+ Create new",
          url: "/dashboard/chats/create",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
