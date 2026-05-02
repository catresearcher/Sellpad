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
import { usePathname } from "next/navigation";
import React from "react";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center border-b border-border gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-4 px-4 h-full">
            <SidebarTrigger className="" />
            <hr className="w-px h-full bg-border"></hr>
            <Breadcrumb>
              <BreadcrumbList>
                {path
                  .split("/")
                  .filter(Boolean)
                  .map((p, idx, arr) => {
                    const label = p.charAt(0).toUpperCase() + p.slice(1);
                    const href = "/" + arr.slice(0, idx + 1).join("/");

                    return (
                      <React.Fragment key={idx}>
                        {idx > 0 && <BreadcrumbSeparator />}

                        <BreadcrumbItem>
                          <BreadcrumbLink
                            href={href}
                            className={`font-medium ${idx === arr.length - 1 ? "text-white" : "text-muted-foreground"}`}
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
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
