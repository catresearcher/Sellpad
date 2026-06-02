"use client";
import { ProductsTable } from "@/components/Product/data-table";
import PageTitle from "@/components/ui/pageTitle";
import { useUser } from "@/context/userContext";

export default function Ccs() {
  const { user } = useUser();
  if (!user) return null;

  return (
    <div className="flex flex-col">
      {" "}
      <PageTitle
        title="Products"
        description="Browse and manage your customers."
      />
      <ProductsTable />
    </div>
  );
}
