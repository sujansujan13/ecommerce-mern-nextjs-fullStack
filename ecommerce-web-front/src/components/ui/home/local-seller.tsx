import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { Button } from "../button";
import HighlightGrid from "../home-utils/highlight-grid";

const sellers = [
  {
    name: "Patan Artisan Collective",
    description:
      "Specializing in handmade brassware and singing bowls for over three decades.",
    image: "/patan-logo.jpg",
  },
  {
    name: "Mustang Organic Farms",
    description:
      "Bringing the freshest mountain apples and dried herbs directly from the Mustang region.",
    image: "/mustang-logo.jpg",
  },
];
export default function LocalSeller() {
  return (
    <section className="w-full h-full pt-10 pb-30 md:pt-20 md:pb-30 bg-[#fff8f7] ">
      <div className="common-box ">
        {/* height and width later */}
        <div className="bg-[#fbfafa] md:flex  md:gap-10 rounded-3xl  p-8 md:px-10 md:pt-10 md:pb-7 space-y-8 shadow-2xl ">
          {/* text-division */}
          <div className="space-y-9 lg:space-y-4  md:flex flex-col md:justify-between lg:justify-around   md:min-w-70">
            <div className="space-y-4 md:space-y-6">
              <h4 className="uppercase text-[#006399] text-xs tracking-wide font-medium">
                Empowering Nepal
              </h4>
              <header className="font-manrope font-bold md:font-extrabold text-[28px]  md:leading-8 ">
                Local Seller Highlights
              </header>
              <p className="text-[16px] font-medium text-[#59413e] tracking-wide">
                We take pride in bringing local artisans and small business
                owners from every corner of Nepal to your doorstep. Support
                local, shop authentic.
              </p>
            </div>
            <div className="flex flex-col  gap-5 lg:gap-6 py-2">
              {sellers.map((seller, index) => (
                <div key={index} className="flex  gap-3 md:gap-4">
                  <Avatar className={`h-15 w-15 md:h-13 md:w-13 shrink-0`}>
                    <AvatarImage />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="leading-relaxed font-medium">
                      {seller.name}
                    </h1>
                    <p className="text-xs font-medium md:text-[14px]">
                      {seller.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <Button
                variant={"outline"}
                className={`px-9 py-6 text-[16px] rounded-xl border-2 border-[#680007] text-[#680007] leading-relaxed`}
              >
                Meet All Sellers
              </Button>
            </div>
          </div>
          <HighlightGrid />
        </div>
      </div>
    </section>
  );
}
