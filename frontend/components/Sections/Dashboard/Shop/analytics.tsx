import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ShopAnalytics({
  Products,
  Users,
  Revenue,
}: {
  Products: number;
  Users: number;
  Revenue: number;
}) {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Products</CardTitle>
          <CardDescription className="text-xs">
            All of your Products
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h1 className="text-3xl font-semibold">{Products}</h1>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Users</CardTitle>
          <CardDescription className="text-xs">
            All of your users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h1 className="text-3xl font-semibold">{Users}</h1>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Revenue</CardTitle>
          <CardDescription className="text-xs">
            Your shops revenue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h1 className="text-3xl font-semibold">
            {" "}
            {Revenue.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </h1>
        </CardContent>
      </Card>
    </div>
  );
}
