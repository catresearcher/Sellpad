import { EditProductForm } from "@/components/dashboard/product/EditProductForm";
import { FullProduct } from "@/types/user";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUser } from "@/data/user";
import PageTitle from "@/components/ui/pageTitle";

async function getSessionCookie() {
  const cookieStore = await cookies();
  return cookieStore.get("fgr")?.value;
}

export async function getProduct(
  productId: number,
  shopId: number,
): Promise<FullProduct | undefined> {
  try {
    const session = await getSessionCookie();

    if (!session) {
      return undefined;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/shop/${shopId}/products/${productId}`,
      {
        headers: { cookie: `fgr=${session}` },
        cache: "no-store",
      },
    );
    if (!res.ok) return undefined;

    const data = await res.json();

    return data.product;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    return undefined;
  }
}

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ productId: number }>;
}) {
  const { productId } = await params;

  const user = await getUser();

  if (!user) return;

  const product = await getProduct(user?.shops[0].id, productId);

  if (!product) {
    redirect("/products");
  }

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
