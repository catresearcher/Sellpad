import EditPageChild from "@/components/Pages/EditProductPage";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ productId: number }>;
}) {
  const { productId } = await params;
  return <EditPageChild productId={productId}></EditPageChild>;
}
