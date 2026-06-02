"use client";

import ShopAnalytics from "@/components/Shop/analytics";
import ShopRevenueChart from "@/components/Shop/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useShop } from "@/context/shopContext";
import { filteredAnalytics } from "@/utils/filterDate";

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
          Orders: filteredAnalytics(
            selectedShop.analytics.Orders,
            date?.from,
            date?.to,
          ),
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
      <div className="grid grid-cols-3 gap-4 w-full min-h-[65vh]">
        <Card className="col-span-3 h-full border border-border rounded">
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
          <CardContent className="w-full min-h-[50vh]">
            <ShopRevenueChart
              data={filteredAnalytics(
                selectedShop.analytics.Revenue,
                date?.from,
                date?.to,
              )}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
