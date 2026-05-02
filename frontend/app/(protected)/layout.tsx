"use client";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ShopProvider } from "@/context/shopContext";

import {
  GalleryVerticalEndIcon,
  AudioLinesIcon,
  TerminalIcon,
} from "lucide-react";

import { useParams, usePathname } from "next/navigation";
import React from "react";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const teams = [
    {
      id: 1,
      name: "Apple Inc",
      logo: <GalleryVerticalEndIcon />,
      plan: "Enterprise",
      analytics: {
        Products: 225,
        Users: 1725,
        Revenue: 10240,
      },
    },
    {
      id: 2,
      name: "Teemu Oy.",
      logo: <AudioLinesIcon />,
      plan: "Startup",
      analytics: {
        Products: 15,
        Users: 55,
        Revenue: 4240,
      },
    },
    {
      id: 3,
      name: "TeemuGang",
      logo: <TerminalIcon />,
      plan: "Free",
      analytics: {
        Products: 25,
        Users: 125,
        Revenue: 24240,
      },
    },
  ];
  const path = usePathname();
  const params = useParams();
  const shopId = params.shopId as string;

  const selectedShop = teams.find((t) => t.id === Number(shopId));

  if (!selectedShop) return <div>Shop not found</div>;

  return (
    <SidebarProvider>
      <AppSidebar teams={teams} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center border-b border-border gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
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
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <ShopProvider value={selectedShop}>{children}</ShopProvider>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
