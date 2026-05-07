"use client";
import { redirect } from "next/navigation";
import PageTitle from "@/components/ui/pageTitle";
import { useUser } from "@/context/userContext";
import { useShop } from "@/context/shopContext";
import { EditProductForm } from "@/components/Sections/Dashboard/Products/EditProductForm";
import { useQuery } from "@tanstack/react-query";
import { GetProduct } from "@/api/products/products";

export default function EditProductPageChild({
  productId,
}: {
  productId: number;
}) {
  const { user } = useUser();
  const { selectedShop } = useShop();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => GetProduct(productId),
    enabled: !!productId,
  });

  if (!user) return;
  if (!selectedShop) return;

  if (isLoading) return <div>Loading...</div>;

  if (!product) {
    redirect(`/dashboard/${selectedShop.id}/products`);
  }

  console.log(product);

  return (
    <div className="h-full flex flex-col">
      <PageTitle
        title="Edit Product"
        description="Modify your product details below"
      />

      <EditProductForm user={user} product={product} />
    </div>
  );
}
