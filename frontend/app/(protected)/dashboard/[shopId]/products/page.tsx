"use client";
import { ProductsTable } from "@/components/Sections/Dashboard/Products/table";
import { useUser } from "@/context/userContext";

export default function Products() {
  const { user } = useUser();
  if (!user) return null;
  return (
    <div className="flex flex-col h-1000">
      <ProductsTable user={user} />
    </div>
  );
}
