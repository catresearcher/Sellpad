"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useShop } from "@/context/shopContext";
import { usePathname } from "next/navigation";

import React from "react";
export default function BreadCrumbHeader() {
  const { selectedShop } = useShop();
  const path = usePathname();
  return (
    <Breadcrumb className="hidden md:block">
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
            const label = segment.charAt(0).toUpperCase() + segment.slice(1);
            const href =
              "/" +
              ["dashboard", selectedShop?.id, ...arr.slice(0, idx + 1)].join(
                "/",
              );

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
  );
}
