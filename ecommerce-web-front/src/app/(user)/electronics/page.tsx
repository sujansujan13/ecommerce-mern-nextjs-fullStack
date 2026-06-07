"use client";
import DealsCard from "@/components/Electronics/Electronic-Utils/DealsCard";
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
import React, { useEffect, useState } from "react";
import Link from "next/link";
import BreadCrumb from "@/utils/Breadcrumb";
import LeftSidebar from "@/components/Electronics/LeftSidebar";
import SearchInput from "@/utils/SearchInput";

const sorting = [
  { label: "Popularity", value: "Popularity" },
  { label: "Price(Low to High)", value: "Price(Low to High)" },
  { label: "Price(High to Low)", value: "Price(High to Low)" },
  { label: "Newest Arrival", value: "Newest Arrival" },
];
const Deals = [
  {
    header: "Smartphone Deals",
    image: "/smartphone.jpg",
    para: "Up to 25% off",
  },
  {
    header: "Smartphone Deals",
    image: "/smartphone.jpg",
    para: "Up to 25% off",
  },
  {
    header: "Smartphone Deals",
    image: "/smartphone.jpg",
    para: "Up to 25% off",
  },
];

export default function page() {
  // state for products and loading status
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // useEffect to fetch products from the API when the component mounts
  useEffect(() => {
    // Yasko mukhya karan "Race Condition" ra "Memory Leak" bata bachnu ho.
    const controller = new AbortController();
    const { signal } = controller;

    const fetchElectronics = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "http://localhost:4000/api/products?category=electronics",
          { signal },
        );

        if (!res.ok) throw new Error("Fetch failed");

        const data = await res.json();
        setProducts(data.products || data);
      } catch (error) {
        if (error instanceof Error) {
          // React le unmount garda aune intentional errors lai ignore garne
          if (
            error.name === "AbortError" ||
            error.message.includes("aborted")
          ) {
            // Kehi pani nagarne, yo normal behavior ho Strict Mode ma
            return;
          }

          // Baki real network errors lai matra print garne
          console.error("Real API Error:", error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchElectronics();
    return () => controller.abort();
  }, []);

  return (
    <div className="common-box py-6 md:py-10 space-y-3 bg-[#fff8f7]">
      <div className="pt-2">
        <BreadCrumb />
      </div>

      {/* Header section */}
      <div className="flex flex-col items-start gap-y-2 mb-8">
        <h1 className="text-[#680007] text-2xl font-semibold">
          Electronics & Gadgets
        </h1>
        <p className="text-[#8d706d] font-medium leading-relaxed max-w-2xl">
          Discover authentic tech with verified local warranties. From the
          latest smartphones to home appliances, we bring the global standard to
          Nepal.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-10 ">
        {/* Sidebar: Fixed width, no shrinking */}
        <aside className="w-full  lg:w-64 shrink-0">
          <LeftSidebar />
        </aside>

        {/* Product Area: flex-1 makes this section fill the rest of the row */}
        <main className="flex-1 w-full space-y-4">
          {/* rating boxes */}
          <div className="md:flex items-center justify-between  space-y-4 md:space-y-0 border-2 border-[#f9e8e6] bg-white p-4 rounded-2xl ">
            <div className="w-full md:max-w-md ">
              <SearchInput
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search for electronics..."
              />
            </div>
            <div className="flex   items-center gap-x-2">
              <h3 className="font-medium md:w-full ">Sort by:</h3>
              <Select defaultValue={`Popularity`}>
                <SelectTrigger
                  className={` border-none w-full max-w-60 text-sm text-[#680007] font-medium `}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel className={`text-sm `}>
                      Pricing and Ordering
                    </SelectLabel>
                    {sorting.map((sort) => (
                      <SelectItem
                        key={sort.value}
                        value={sort.value}
                        className={`text-lg font-medium`}
                      >
                        {sort.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-6 overflow-hidden  ">
            <DealsCard Deals={Deals} />

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 ">
              {loading ? (
                <p>Loading...</p>
              ) : (
                products.map((product) => (
                  <div key={product._id}>
                    <Link href={`/product/${product.category}/${product.slug}`}>
                      <ProductCard product={product} variant="category" />
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
