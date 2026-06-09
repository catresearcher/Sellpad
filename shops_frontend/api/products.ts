const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function fetchProducts() {
  const response = await fetch(`${apiUrl}/shop/products`);

  if (!response.ok) {
    throw new Error("Product fetch not successful");
  }

  return response.json();
}
