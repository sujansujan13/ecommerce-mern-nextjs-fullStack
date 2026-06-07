import BreadCrumb from "@/utils/Breadcrumb";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

export default function FashionHeroSection() {
  return (
    <section className="py-6">
      <div className="common-box">
        {/* spacing */}
        <div className="w-full  text-white ">
          {/* breadcrumb */}
          <div className="py-2">
            <BreadCrumb />
          </div>
          <div className="relative rounded-xl p-12   w-full overflow-hidden aspect-square md:aspect-video lg:aspect-7/3 xl:aspect-9/3 ">
            <Image
              src={"/fashion-hero-section.jpg"}
              alt=""
              fill
              loading="eager"
              className="object-cover w-full h-full "
            />
            {/* The Overlay Gradient - makes text readable */}
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-0  flex flex-col justify-center items-start gap-5 p-12">
              <Button
                className={`font-extrabold uppercase text-[10px] tracking-wide`}
              >
                New arrival
              </Button>
              {/* Use md:w-1/2 instead of w-30% (Tailwind uses fractions) */}
              <h1 className="max-w-50 md:max-w-full text-4xl font-[1000] font-manrope">
                Festive Collection
              </h1>

              <p className="text-[18px] font-medium max-w-115 leading-1.6">
                Experience the timeless elegance of authentic hand-woven Dhaka
                and pure Pashmina wear
              </p>
              <Button
                className={`text-[16px] font-extrabold py-6 px-9 text-center hover:bg-red-800 bg-red-900 rounded-lg cursor-pointer `}
              >
                Explore Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
