import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageTitleProps {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}

const PageTitle = ({
  title,
  description,
  children,
  className,
}: PageTitleProps) => {
  const headingBlock = (
    <div className="flex flex-col space-y-1">
      <h2 className="text-xl font-semibold">{title}</h2>
      {description && (
        <p className="text-sm font-medium text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );

  return (
    <div
      className={cn(
        "mb-4",
        children
          ? "flex flex-row justify-between items-center"
          : "flex flex-col space-y-1",
        className,
      )}
    >
      {headingBlock}
      {children}
    </div>
  );
};

export default PageTitle;
