"use client";
import { useProducts } from "@/hooks/useProducts";

export default function Home() {
  const { data: products } = useProducts();
  console.log(products);
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black"></div>
  );
}
