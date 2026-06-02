"use client";

import { getNavMain } from "@/components/Sidebar/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { useShop } from "@/context/shopContext";
import { usePathname } from "next/navigation";

export default function BreadCrumbHeader() {
  const path = usePathname();
  const { selectedShop } = useShop();

  const activeTeamId = selectedShop?.id;
  if (!activeTeamId) return null;

  const navMain = getNavMain(activeTeamId);

  const currentPath = path;

  const activeParent = navMain.find((item) =>
    item.items?.some((subItem) => currentPath.startsWith(subItem.url)),
  );

  const activeChild = activeParent?.items?.find((subItem) =>
    currentPath.startsWith(subItem.url),
  );

  return (
    <Breadcrumb className="hidden md:block">
      <BreadcrumbList>
        <BreadcrumbItem className="text-muted-foreground flex items-start">
          <span className="icon-[bi--house-door-fill] size-4" />
          <p className="font-medium">Dashboard</p>
        </BreadcrumbItem>

        {activeParent && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink className="text-muted-foreground font-medium">
                {activeParent.title}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}

        {activeChild && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink className="text-foreground font-semibold">
                {activeChild.title}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
