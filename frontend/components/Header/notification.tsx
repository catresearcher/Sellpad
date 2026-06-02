import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const notifications = [
  {
    id: "1",
    title: "Nigga",
    sender: "Teemu",
    type: "message",
    date: "5/3/2026 12:05",
  },
  {
    id: "2",
    title: "Order #62 Paid",
    sender: "Product #52",
    type: "success",
    date: "5/3/2026 01:05",
  },
  {
    id: "3",
    title: "Subscription payment declined",
    sender: "Stripe",
    type: "error",
    date: "5/3/2026 00:00",
  },
  {
    id: "4",
    title: "Subscription payment declined",
    sender: "Stripe",
    type: "error",
    date: "5/3/2026 00:00",
  },
  {
    id: "5",
    title: "Subscription payment declined",
    sender: "Stripe",
    type: "error",
    date: "5/3/2026 00:00",
  },
  {
    id: "6",
    title: "Subscription payment declined",
    sender: "Stripe",
    type: "error",
    date: "5/3/2026 00:00",
  },
  {
    id: "7",
    title: "Subscription payment declined",
    sender: "Stripe",
    type: "error",
    date: "5/3/2026 00:00",
  },
];

export default function Notification() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <span className="cursor-pointer icon-[solar--bell-bing-bold-duotone] size-5"></span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-85 overflow-hidden rounded-md border border-border bg-popover shadow-xl p-0"
      >
        <div className="px-4 py-3 flex items-center justify-between">
          <h1 className="font-medium text-base text-accent-foreground">
            Notifications
          </h1>
          <span className="text-xs text-muted-foreground">
            {notifications.length} total
          </span>
        </div>

        <DropdownMenuSeparator />

        <div className="max-h-80 overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((n) => (
              <DropdownMenuItem
                key={n.id}
                className="flex items-start gap-3 px-4 py-3 border-b border-border/40 last:border-0 hover:bg-muted/30 transition-colors cursor-pointer"
              >
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h1 className="text-md text-accent-foreground font-medium truncate">
                      {n.title}
                    </h1>
                    <span className="text-md text-muted-foreground whitespace-nowrap">
                      {n.date}
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground">{n.sender}</p>
                </div>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-55 gap-2">
              <div className="w-10 h-10 rounded-full bg-muted/30 flex items-center justify-center">
                <span className="icon-[solar--bell-off-bold] text-muted-foreground" />
              </div>
              <span className="text-sm text-muted-foreground">
                No Notifications
              </span>
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
