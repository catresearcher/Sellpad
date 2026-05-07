import EditProductPageChild from "@/components/Pages/EditProductPage";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ productId: number }>;
}) {
  const { productId } = await params;
  return <EditProductPageChild productId={productId}></EditProductPageChild>;
}
