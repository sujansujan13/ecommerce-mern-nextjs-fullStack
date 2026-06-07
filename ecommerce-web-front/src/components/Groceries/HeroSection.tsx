import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

export default function GroceriesHeroSection() {
  return (
    // LOGIC: Use more consistent aspect ratios. 2/1 for mobile, 3/1 for large screens.
    // Most professional hero sections:
    // avoid strict aspect ratios
    // use min-height
    // use responsive height instead
    <div className="relative w-full  h-[20vh] md:h-[30vh] lg:h-[35vh] xl:h-[40vh]  rounded-3xl overflow-hidden">
      <Image
        src="/GroceriesImages/grocerieshero.jpg"
        alt="Grocery Hero Image"
        fill
        priority // Add priority for LCP images
        className="object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-linear-to-tr from-[#680006]/40 via-[#680006]/60 to-transparent" />

      {/* Text Content - Anchored to bottom-left */}
      {/*  The Text Content (z-20) */}
      {/* Logic: Must be z-20 to sit ON TOP of the gradient. 
          'bottom-6 left-6' positions it exactly like the reference. */}
      {/* #RESPONSIVE#:flex flex-col justify-center items-start  */}
      <div className="w-full absolute inset-0 z-20 text-white space-y-4 p-8 flex flex-col justify-center items-start ">
        <header className="font-extrabold font-manrope text-2xl md:text-4xl leading-tight">
          Fresh From the Farm
        </header>

        <p className="text-sm md:text-lg font-bold max-w-md opacity-90 line-clamp-2 md:line-clamp-none">
          Authentic Himalayan staples sourced directly from local artisan
          farmers. Pure, organic, and traditionally preserved.
        </p>

        <Button
          variant="secondary"
          className="rounded-full px-6 py-3 md:px-8 md:py-6 text-sm md:text-base font-bold text-[#680006] shadow-lg"
        >
          Explore Collection
        </Button>
      </div>
    </div>
  );
}
