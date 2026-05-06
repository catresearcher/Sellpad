"use client";

import ShopAnalytics from "@/components/Sections/Dashboard/Shop/analytics";
import ShopRevenueChart from "@/components/Sections/Dashboard/Shop/chart";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useShop } from "@/context/shopContext";
import { filteredAnalytics } from "@/utils/filterDate";
import { isWithinInterval } from "date-fns";
import { useMemo } from "react";

export default function ShopOverview() {
  const { selectedShop, date } = useShop();
  if (!selectedShop) return null;

  return (
    <div className="flex flex-col gap-4">
      <ShopAnalytics
        ShopAnalytics={{
          visitors: 10251,
          current_visitors: 22,
          orders: 1029,
          products: selectedShop.analytics.Products,
        }}
        Users={filteredAnalytics(
          selectedShop.analytics.Users,
          date?.from,
          date?.to,
        )}
        Revenue={filteredAnalytics(
          selectedShop.analytics.Revenue,
          date?.from,
          date?.to,
        )}
      />
      <div className="grid grid-cols-3 gap-4 w-full min-h-[45vh]">
        <Card className="col-span-2 h-full">
          <CardHeader>
            <CardTitle>Revenue chart</CardTitle>
            <CardDescription>Your revenue growth over month</CardDescription>
            <h1 className="text-4xl font-semibold">
              {" "}
              {Object.values(
                filteredAnalytics(
                  selectedShop.analytics.Revenue,
                  date?.from,
                  date?.to,
                ),
              )
                .reduce((sum, month: any) => sum + month.uv, 0)
                .toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
            </h1>
          </CardHeader>
          <CardContent className="w-full min-h-[35vh]">
            <ShopRevenueChart
              data={filteredAnalytics(
                selectedShop.analytics.Revenue,
                date?.from,
                date?.to,
              )}
            />
          </CardContent>
        </Card>
        <Card className="col-span-1 h-full">
          <CardHeader>
            <CardTitle>Latest transaction</CardTitle>
            <CardDescription>Your latest transactions</CardDescription>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-4 w-full min-h-[60vh]">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Latest transaction</CardTitle>
            <CardDescription>Your latest transactions</CardDescription>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Latest transaction</CardTitle>
            <CardDescription>Your latest transactions</CardDescription>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>
    </div>
  );
}
