import React from "react";
import ProductCard from "../../../utils/product-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../carousel";
// Mock Data: In MERN, this comes from your Node.js API
import { trendingProducts } from "../../../Data/homePageCards";
import Link from "next/link";

export default function TrendingSection() {
  return (
    <section className="py-15 w-full bg-[#fff0ee] ">
      <div className="common-box ">
        {/* carousel starts here */}
        <Carousel
          opts={{ align: "start", loop: true }}
          className="w-full space-y-6  "
        >
          {/* Header Section */}
          <div className="w-full flex items-center justify-between ">
            {/* title and all */}
            <div className="flex flex-col  ">
              <h1 className="text-[28px] text-[#680007] font-manrope font-bold md:font-extrabold xl:text-2xl">
                Trending in Nepal
              </h1>
              <p className="text-[16px] font-medium text-[#59413e] xl:text-sm">
                Top Picked Items This Week
              </p>
            </div>
            <div className="flex  items-center gap-2">
              <CarouselPrevious className={`static translate-y-0 `} />
              <CarouselNext className={`static translate-y-0  `} />
            </div>
          </div>
          <CarouselContent className="flex ">
            {trendingProducts.map((product) => (
              <CarouselItem
                key={product._id}
                //       {/* Carousel Content: Professional Responsive logic
                //     - 1 card on mobile (basis-full)
                //     - 2 cards on tablet (md:basis-1/2)
                //     - 4 cards on laptop (lg:basis-1/4)
                // */}
                className="   basis-full md:basis-1/2 lg:basis-1/4 xl:basis-1/4  rounded-2xl "
              >
                <Link href={`/product/${product.category}/${product.slug}`}>
                  <ProductCard variant="trending" product={product} />
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
