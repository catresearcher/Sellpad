"use client";

import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useProducts";
import { motion } from "framer-motion";

function ScrollButton() {
  const scrollToProducts = () => {
    const el = document.getElementById("products");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="flex justify-center pt-10">
      <motion.button
        onClick={scrollToProducts}
        className="rounded-full w-12 h-12 border flex items-center justify-center cursor-pointer"
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileTap={{ scale: 0.9 }}
      >
        <span className="size-6 icon-[solar--arrow-down-linear]" />
      </motion.button>
    </section>
  );
}

export default function Home() {
  const { data: products } = useProducts();

  if (!products) return <div>No products..</div>;

  return (
    <div className="flex flex-col mx-auto w-[55%] min-h-screen py-6 gap-20">
      <header className="w-fit mx-auto px-4 py-2 flex items-center space-x-8 justify-between bg-muted/5 border border-border shadow-sm rounded-full">
        <h1 className="text-2xl font-bold italic">
          A<span className="text-emerald-400">S</span>
        </h1>

        <ul>
          <li className="text-muted-foreground text-base hover:text-foreground transition-colors duration-200 cursor-pointer">
            Products
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <Button size="icon-lg" variant="outline">
            <span className="icon-[solar--cart-3-bold] size-5" />
          </Button>
          <Button size="icon-lg" variant="outline">
            <span className="icon-[ic--baseline-discord] size-5" />
          </Button>
        </div>
      </header>

      <main className="flex flex-col gap-24">
        <section className="text-center flex flex-col gap-6 pt-20">
          <div className="flex items-center gap-1 w-fit px-4 py-1 mx-auto rounded-full border border-border text-muted-foreground font-medium">
            {[1, 2, 3, 4, 5].map((n) => (
              <span
                key={n}
                className="icon-[material-symbols--star] size-4 text-yellow-400"
              />
            ))}
            <div className="flex items-center gap-1 ml-2">
              <span className="text-foreground font-semibold">100,000+</span>
              gamers ·
              <span className="text-foreground font-semibold">
                150,000+
              </span>{" "}
              orders delivered
            </div>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold italic leading-tight">
            Get the edge. <br />
            <span className="text-emerald-500">Stay undetected.</span>
          </h1>

          <p className="text-xl font-semibold max-w-md mx-auto text-muted-foreground">
            Premium cheats & accounts for 40+ games. License delivered in 60
            seconds.
          </p>

          <div className="flex items-center gap-2 mx-auto">
            <Button
              variant="outline"
              className="rounded-2xl h-12 px-4 font-medium text-lg flex items-center space-x-1"
            >
              <span className="icon-[solar--arrow-left-linear] size-5" />
              <span>View Products</span>
            </Button>
          </div>
        </section>

        <ScrollButton />

        <section id="products" className="flex flex-col gap-6 pt-24 pb-32">
          <h1 className="text-3xl font-semibold">Products</h1>

          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products?.map((p: any) => (
              <li key={p.id} className="group rounded bg-card p-5 ">
                <div className="flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight">
                        {p.name}
                      </h3>

                      <p className="mt-1 text-sm text-muted-foreground">
                        Stock: {p.stock}
                      </p>
                    </div>

                    <p className="text-lg font-bold text-emerald-600">
                      {Number(p.price).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </p>
                  </div>

                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-muted-foreground">
                    {p.description}
                  </p>

                  <div className="mt-auto pt-5">
                    <button className="w-full rounded border bg-background px-4 py-2.5 text-sm font-medium">
                      View Product
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-10 text-center text-muted-foreground">
        footer
      </footer>
    </div>
  );
}
