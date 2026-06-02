import { CustomersTable } from "@/components/Customers/data-table";
import PageTitle from "@/components/ui/pageTitle";

export default function Customers() {
  return (
    <div>
      <PageTitle
        title="Customers"
        description="Browse and manage your customers."
      />

      <CustomersTable />
    </div>
  );
}
