import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";

type SpinnerProps = React.ComponentProps<"svg"> & {
  size?: string;
};

function Spinner({ className, size, ...props }: SpinnerProps) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn(`size-${size ? size : "4"} animate-spin`, className)}
      {...props}
    />
  );
}

export { Spinner };
