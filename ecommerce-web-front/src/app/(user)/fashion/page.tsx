"use client";
import FashionHeroSection from "@/components/Fashion/FashionHeroSection";
import FashionSideBar from "@/components/Fashion/FashionSideBar";
import ProductCard from "@/utils/product-card";
import { ProductType } from "../../../Types/ProductType";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CategoryIcons from "@/utils/CategoryIcons";
import {
  LucideIcon,
  Mars,
  SportShoe,
  TowerControl,
  Venus,
  Watch,
} from "lucide-react";
import React, { ComponentType, useEffect, useState } from "react";
import Link from "next/link";
import SearchInput from "@/utils/SearchInput";

// #CURIOUS#:LucideIcon,ComponentType,export
export interface CategoryType {
  id: number;
  // Lucide icon athawa custom SVG component dubai accept garna
  iconName:
    | LucideIcon
    | ComponentType<{
        size?: number;
        strokeWidth?: number;
        className?: string;
      }>;

  categoryName: string;
}
const categoryIconsData = [
  { id: 1, iconName: Venus, categoryName: "Women's Wear" },
  { id: 2, iconName: Mars, categoryName: "Men's Wear" },
  { id: 3, iconName: TowerControl, categoryName: "Traditional Attire" },
  { id: 4, iconName: SportShoe, categoryName: "Footwear" },
  { id: 5, iconName: Watch, categoryName: "Accessories" },
];
const ordering = [
  { label: "Newest First", value: "newest first" },
  { label: "Price:Low to High", value: "low to high" },
  { label: "Price:High to Low", value: "high to low" },
  { label: "Most Popular", value: "most popular" },
];

export default function page() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const fetchFashion = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          " http://localhost:4000/api/products?category=fashion",
          { signal },
        );

        if (!res.ok) throw new Error("Fetch Failed");

        const data = await res.json();
        console.log(data);
        setProducts(data.products || data);
      } catch (error) {
        if (error instanceof Error) {
          if (
            error.name === "AbortError" ||
            error.message.includes("aborted")
          ) {
            return;
          }
          console.error("Real API Error", error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchFashion();
    return () => controller.abort();
  }, []);

  return (
    <div className="w-full h-full mx-auto bg-[#fff8f7] space-y-6 pb-10 ">
      <FashionHeroSection />
      {/* #UNSOLVED#: can't align the long text #Solved  */}
      <div className="w-full flex items-start  overflow-x-auto   common-box no-scrollbar flex-nowrap">
        {categoryIconsData.map((category) => {
          return <CategoryIcons key={category.id} category={category} />;
        })}
      </div>
      {/* sidebar and main content */}
      <div className="lg:flex common-box items-start gap-8 py-2 space-y-6  ">
        {/* for leftsidebar  */}
        <aside>
          <FashionSideBar />
        </aside>
        {/* for other content */}
        <main className="flex-1  space-y-6 ">
          <div className="flex flex-col md:flex-row md:self-center md:justify-between border rounded-sm p-5 border-[#FCE3E0] bg-white space-y-3 md:space-y-0">
            {/* text */}
            <div className="w-full md:max-w-md ">
              <SearchInput
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search for fashion items..."
              />
            </div>
            {/* selection part */}
            <div>
              <div className="flex items-center gap-4 ">
                <h3 className="text-[16px]">Sort by:</h3>

                <div>
                  <Select>
                    <SelectTrigger className="w-full min-w-60 text-sm text-[#680007] font-medium">
                      <SelectValue placeholder="Select an Option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel className="text-sm">
                          Pricing and Ordering
                        </SelectLabel>
                        {ordering.map((order) => {
                          return (
                            <div key={order.value}>
                              <SelectItem
                                className="text-lg font-medium text-[#680007]"
                                value={order.value}
                              >
                                {order.label}
                              </SelectItem>
                            </div>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
          {/* fashion-product-card */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
            {loading ? (
              <p>Loading...</p>
            ) : (
              products.map((product) => {
                return (
                  <div key={product._id}>
                    <Link href={`/product/${product.category}/${product.slug}`}>
                      <ProductCard variant="fashion" product={product} />
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
