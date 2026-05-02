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
];

export default function Notification() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <span className="cursor-pointer icon-[solar--bell-linear] size-6"></span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[340px] overflow-hidden rounded-md border border-border bg-popover shadow-xl p-0"
      >
        <div className="px-4 py-3 flex items-center justify-between">
          <h1 className="font-medium text-base text-white">Notifications</h1>
          <span className="text-xs text-muted-foreground">
            {notifications.length} total
          </span>
        </div>

        <DropdownMenuSeparator />

        <div className="max-h-[320px] overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((n) => (
              <DropdownMenuItem
                key={n.id}
                className="flex items-start gap-3 px-4 py-3 border-b border-border/40 last:border-0 hover:bg-muted/30 transition-colors cursor-pointer"
              >
                <span
                  className={`w-8 h-8 flex items-center justify-center rounded-full shrink-0
              ${
                n.type === "message"
                  ? "bg-muted/40 text-white/60"
                  : n.type === "success"
                    ? "bg-green-400/15 text-green-500"
                    : "bg-red-400/15 text-red-500"
              }`}
                >
                  <span
                    className={
                      n.type === "message"
                        ? "icon-[solar--letter-bold]"
                        : n.type === "success"
                          ? "icon-[material-symbols--check-rounded]"
                          : "icon-[material-symbols--close-rounded]"
                    }
                  />
                </span>

                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h1 className="text-sm text-white font-medium truncate">
                      {n.title}
                    </h1>
                    <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                      {n.date}
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground">{n.sender}</p>
                </div>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-[220px] gap-2">
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
