import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  SparklesIcon,
  BadgeCheckIcon,
  CreditCardIcon,
  BellIcon,
  LogOutIcon,
} from "lucide-react";
import { useUser } from "@/context/userContext";
import Link from "next/link";

export default function Profile() {
  const { user, isLoading, logout } = useUser();

  if (isLoading) return <div>Loading..</div>;

  if (!user) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer h-10 w-10">
          <AvatarImage src={user.avatar} />
          <AvatarFallback className="font-medium">
            {user.username[0]}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        side={"bottom"}
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="rounded-lg">
              <AvatarImage className="rounded-lg" src={user.avatar} />
              <AvatarFallback className="rounded-lg">
                {user.username[0]}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user.username}</span>
              <span className="truncate text-xs">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        {user.role === "Admin" && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href={"/dashboard/1/overview"}>
                <DropdownMenuItem>
                  <CreditCardIcon />
                  Dashboard
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
