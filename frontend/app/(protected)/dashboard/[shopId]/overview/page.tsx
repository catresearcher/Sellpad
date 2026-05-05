import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ShopOverview() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-4 w-full min-h-[45vh]">
        <Card className="col-span-2 h-full">
          <CardHeader>
            <CardTitle>Revenue chart</CardTitle>
            <CardDescription>Your revenue growth over month</CardDescription>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
        <Card className="col-span-1 h-full">
          <CardHeader>
            <CardTitle>Latest transaction</CardTitle>
            <CardDescription>Your latest transactions</CardDescription>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>

      <Card className="">
        <CardHeader>
          <CardTitle>Latest transaction</CardTitle>
          <CardDescription>Your latest transactions</CardDescription>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  );
}
