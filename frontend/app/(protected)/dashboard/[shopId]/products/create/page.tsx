"use client";
import { XIcon } from "@/components/assets/svgs";
import { CreateProductForm } from "@/components/Sections/Dashboard/Products/CreateProductForm";
import { Button } from "@/components/ui/button";
import PageTitle from "@/components/ui/pageTitle";
import { useShop } from "@/context/shopContext";
import { useUser } from "@/context/userContext";
import Link from "next/link";

const CreateProductPage = () => {
  const { user } = useUser();
  const { selectedShop } = useShop();
  if (!user) return null;
  if (!selectedShop) return null;

  return (
    <div className="h-full flex flex-col">
      <PageTitle
        title="Create product"
        description="Create your product below."
      >
        <Button size="lg" asChild variant="destructive">
          <Link href={`/dashboard/${selectedShop.id}/products`}>
            <XIcon className="size-5" /> Cancel Creating
          </Link>
        </Button>
      </PageTitle>

      <CreateProductForm user={user} />
    </div>
  );
};

export default CreateProductPage;
