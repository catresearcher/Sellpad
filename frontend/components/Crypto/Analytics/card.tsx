import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CryptoCard({
  title,
  values,
}: {
  title: {
    icon: string;
    name: string;
    shorten: string;
    color: string;
  };
  values: {
    crypto: number;
    currency: number;
  };
}) {
  return (
    <Card className="rounded flex flex-col gap-4 border border-border">
      <CardHeader>
        <div className="flex items-center gap-3">
          <span
            className={`flex items-center justify-center rounded-md ${title.color} w-9 h-9`}
          >
            <span
              className={`${title.icon} text-primary-foreground size-5`}
            ></span>
          </span>

          <div>
            <CardTitle className="font-medium">{title.name}</CardTitle>

            <CardDescription className="text-xs">
              {title.shorten}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex items-end gap-2 font-semibold">
            <h1 className="text-2xl">{values.crypto.toFixed(5)}</h1>

            <h1 className="text-lg text-muted-foreground">{title.shorten}</h1>
          </div>
          <p className="text-sm text-muted-foreground font-medium">
            {values.currency.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
        </div>

        <div className="flex items-center gap-2 w-full">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex-1 h-10 font-medium gap-2 bg-primary rounded">
                <span className="icon-[solar--hand-money-outline] size-4" />
                Withdraw
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md border-border/50 bg-card p-6 text-foreground rounded-2xl shadow-2xl">
              <DialogHeader className="">
                <DialogTitle className="text-2xl font-semibold tracking-tight">
                  Withdraw {title.name}
                </DialogTitle>

                <DialogDescription className="text-sm text-muted-foreground">
                  Enter your wallet address and the amount you want to withdraw.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-5 py-2">
                <FieldGroup className="flex flex-col gap-1">
                  <Label className="text-sm font-medium text-muted-foreground">
                    Wallet Address
                  </Label>

                  <div className="relative">
                    <Input
                      className="h-12 rounded-xl border border-border bg-input px-4 text-sm placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary"
                      placeholder="0x..."
                    />
                  </div>
                </FieldGroup>

                <FieldGroup className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium text-muted-foreground">
                      Amount
                    </Label>

                    <span className="text-xs text-muted-foreground">
                      Available: {values.crypto}
                    </span>
                  </div>

                  <div className="relative">
                    <Input
                      className="h-12 rounded-xl border border-border bg-input px-4 pr-16 text-sm placeholder:text-zinc-500 focus-visible:ring-2 focus-visible:ring-primary"
                      placeholder="0.00"
                    />

                    <span className="absolute flex items-center justify-center right-4 top-1/2 -translate-y-1/2 text-sm font-medium">
                      <span
                        className={`flex items-center justify-center h-5 w-5 rounded-full ${title.color} text-white`}
                      >
                        <span className={`${title.icon} size-3`}></span>
                      </span>
                    </span>
                  </div>
                </FieldGroup>
              </div>

              <div className="flex flex-col gap-3">
                <Button className="flex-1 rounded-xl bg-primary text-primary-foreground hover:bg-primary/80 cursor-pointer h-10 p-2.5">
                  Withdraw
                </Button>
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 rounded-xl border-zinc-800 bg-transparent cursor-pointer p-2.5"
                  >
                    Cancel
                  </Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
