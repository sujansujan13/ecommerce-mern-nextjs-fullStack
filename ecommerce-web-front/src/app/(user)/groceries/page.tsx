"use client";
import GroceryLeftBar from "@/components/Groceries/GroceryLeftBar";
import GroceriesHeroSection from "@/components/Groceries/HeroSection";
import SortDropDown from "@/components/Groceries/SortDropDown";
import BreadCrumb from "@/utils/Breadcrumb";
import SearchInput from "@/utils/SearchInput";
import { useEffect, useState } from "react";
import ProductCard from "@/utils/product-card";
import MobileFilters from "@/components/Groceries/MobileFilters";
import Link from "next/link";
import { ProductType } from "../../../Types/ProductType";

export default function page() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popularity");

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchGroceries = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          "http://localhost:4000/api/products?category=groceries",
          { signal },
        );

        if (!res.ok) throw new Error("Fetch Error");

        const data = await res.json();
        setProducts(data.products || data);
      } catch (error) {
        if (error instanceof Error) {
          if (
            error.name === "AbortError" ||
            error.message.includes("aborted")
          ) {
            return;
          }
          console.error("Real API error", error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchGroceries();
    return () => controller.abort();
  }, []);

  return (
    // {/* Page level vertical space */}
    <div className="common-box py-6 md:py-10 space-y-3 bg-[#fff8f7] ">
      <BreadCrumb />
      <div className="mb-4 md:mb-8">
        <GroceriesHeroSection />
      </div>
      <div className="block lg:hidden">
        {/* mobile filters */}
        <MobileFilters />
      </div>
      <div className="lg:flex  gap-10">
        <aside className="hidden lg:flex">
          <GroceryLeftBar />
        </aside>
        <main className="flex-1 space-y-4 ">
          <div className="w-full flex flex-col md:flex-row md:items-center gap-2.5 md:gap-4">
            <div className="w-full md:max-w-md ">
              <SearchInput
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search for groceries..."
              />
            </div>
            <SortDropDown value={sortBy} onChange={setSortBy} />
          </div>
          {/* productCard */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 h-screen overflow-y-auto pr-2">
            {loading ? (
              <p>Loading...</p>
            ) : (
              products.map((product) => {
                return (
                  <div key={product._id}>
                    <Link href={`/product/${product.category}/${product.slug}`}>
                      <ProductCard variant="groceries" product={product} />
                    </Link>
                  </div>
                );
              })
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
