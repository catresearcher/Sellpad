import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ShopAnalytics({
  Users,
  Revenue,
  ShopAnalytics,
}: {
  Users: { date: string; uv: number }[];
  Revenue: { date: string; uv: number }[];
  ShopAnalytics: {
    visitors: number;
    current_visitors: number;
    orders: number;
    Orders: { date: string; uv: number }[];
  };
}) {
  const all_time_users = Object.values(Users).reduce(
    (sum, month: any) => sum + month.uv,
    0,
  );
  const all_time_revenue = Object.values(Revenue).reduce(
    (sum, month: any) => sum + month.uv,
    0,
  );
  const all_time_products = Object.values(ShopAnalytics.Orders).reduce(
    (sum, month: any) => sum + month.uv,
    0,
  );

  return (
    <div className="w-full flex flex-col gap-4 ">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-sm">Revenue</CardTitle>
            <CardDescription className="text-xs">
              Your shops all time revenue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h1 className="text-3xl font-semibold">
              {" "}
              {all_time_revenue.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </h1>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Orders</CardTitle>
            <CardDescription className="text-xs">
              All of your orders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h1 className="text-3xl font-semibold">{all_time_products}</h1>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Customers</CardTitle>
            <CardDescription className="text-xs">
              All of your customers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h1 className="text-3xl font-semibold">{all_time_users}</h1>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
