import React from "react";
import Image from "next/image";
import { Button } from "../button";
import { Truck } from "lucide-react";

export default function HeroSection() {
  return (
    // Outer container with padding and max-width constraints
    <section className="common-box py-12  bg-primary-muted bg-primary-background  ">
      {/* relative container with image at the bg */}
      <div className="relative flex   overflow-hidden rounded-3xl max-h-100  md:min-h-122 px-8 sm:px-6 md:px-16.5 py-7  text-white shadow-xl items-center justify-center ">
        <Image
          src={"/tihar-dio.jpg"}
          alt="hero-section-image"
          fill
          sizes="(max-width: 768px) 100vw, 1200px"
          priority
          className="object-cover"
        />
        {/* Deep warm gradient overlay combined with blur for text readability */}
        <div className="absolute inset-0 bg-linear-to-r  from-red-950/90 via-red-900/80 to-amber-950/80 " />
        {/* Relative layout wrapper to keep content above the background overlay */}
        <div className="relative z-10 grid gap-8 lg:grid-cols-3 pt-8 md:pt-16.5  h-full  w-full min-h-100 backdrop:blur-xl">
          {/* left side texts */}
          <div className="col-span-2 space-y-8   ">
            <div className="space-y-5 max-w-2xl">
              <Button
                variant={"secondary"}
                className={` rounded-3xl text-[12px]  uppercase px-3.5 font-medium   text-primary bg-background `}
              >
                festive season 2026
              </Button>
              <h1 className="text-4xl tracking-tight font-extrabold font-manrope">
                Dashain Festival Grand Sale
              </h1>
              <p className="md:max-w-130 lg:max-w-130  font-medium">
                Celebrate the victory of good over evil with up to 70% off on
                electronics, clothing, and local delicacies. Get free delivery
                across Kathmandu Valley.
              </p>
            </div>
            <div className="flex gap-4">
              <Button
                className={`py-6 px-8 text-[16px] rounded-xl cursor-pointer`}
                variant={"secondary"}
              >
                Shop Now
              </Button>
              <Button
                className={`py-6 px-8 text-[16px] border border-gray-100 text-white bg-transparent rounded-xl cursor-pointer`}
                variant={"destructive"}
              >
                View Offers
              </Button>
            </div>
          </div>
          {/* right side small div */}
          <div className=" hidden w-63  col-span-1 py-6 pl-7 justify-self-end self-end  mb-0 -mr-2.5 lg:flex flex-col justify-center bg-background  rounded-xl space-y-2 ">
            {/* icon and header */}
            <div className="flex  items-center gap-2.5">
              {/* icon-container  */}
              <div className="bg-primary text-{#f3e8e9} rounded-lg px-2 py-2.5">
                <Truck size={25} />
              </div>
              <h1 className="text-destructive font-medium">Free Shipping</h1>
            </div>
            <p className="text-[13px] text-gray-700 font-medium leading-3.5">
              On all orders above NPR 5,000 <br />
              within Kathmandu District.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
