"use client";
import React, { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";

export default function FashionSideBar() {
  // logic: In Base UI, we can just use a number for a single handle but in radix UI we would have to use [500]
  // state for slider
  const [price, setPrice] = useState([500]);
  const MAX_PRICE = 50000;
  return (
    <div className="space-y-6">
      {/* checkbox */}
      <div className="space-y-3">
        <h1 className="text-[#251817] text-[20px] font-extrabold font-manrope">
          Category
        </h1>
        <div className="space-y-2">
          {["Men", "Women", "Kid"].map((cat) => (
            <div key={cat} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                className={`size-4 bg-white border border-[#6B7280] fill-[#59413E]`}
                id="cat"
              />
              <Label htmlFor="cat" className="text-[16px] cursor-pointer">
                {cat}
              </Label>
            </div>
          ))}
        </div>
      </div>
      {/* fabric category  */}
      <div className="space-y-3">
        <div>
          <h1 className="font-manrope font-extrabold text-[20px] text-[#251817] ">
            Fabric
          </h1>
        </div>
        <div className="flex items-center gap-3 ">
          {["Pashmina", "Dhaka", "Cotton"].map((fabric) => {
            return (
              <div key={fabric} className="flex  items-center gap-3  ">
                <Button
                  size={"sm"}
                  className={`bg-[#67BAFD] text-[#004972] cursor-pointer hover:bg-blue-400  rounded-3xl text-xs px-3 font-semibold tracking-wide `}
                >
                  {fabric}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
      {/* price-range */}
      <div className="space-y-6">
        <div>
          <h1 className="font-manrope font-extrabold text-[20px] text-[#251817] ">
            Price Range(NPR)
          </h1>
        </div>
        {/* slider */}
        <div className="w-full space-y-4">
          {/* Base UI Slider requires you to define the sub-components */}
          {/* #UNSOLVED: Can't change the sliding color and also the h-w issue */}
          <div className="w-full">
            <Slider
              value={price}
              max={MAX_PRICE}
              min={500}
              step={100}
              onValueChange={(value) => setPrice(value as number[])}
              className={`w-full  rounded-2xl `}
            />
          </div>

          {/* price span */}
          <div className="w-full flex items-center justify-between text-[12px]">
            <span>
              <span className="text-[#680006]">
                Rs. {price[0].toLocaleString()}
              </span>
            </span>
            <span>
              <span className="text-gray-500">
                Rs. {MAX_PRICE.toLocaleString()}
              </span>
            </span>
          </div>
        </div>
      </div>
      {/* brand */}
      <div className="space-y-4">
        <div>
          <h1 className="font-manrope font-extrabold text-[20px] text-[#251817] ">
            Brand
          </h1>
        </div>
        <div className="space-y-2">
          {["GoldStar", "Sonam", "LocalArtisans"].map((brand) => {
            return (
              <div
                key={brand}
                className="flex items-center gap-3 cursor-pointer tracking-wide "
              >
                <Checkbox
                  className={`size-4 bg-white border border-[#6B7280] fill-[#59413E]`}
                  id="brand"
                />
                <Label htmlFor="brand" className="text-[16px] cursor-pointer">
                  {brand}
                </Label>
              </div>
            );
          })}
        </div>
      </div>
      {/* occasion */}
      <div className="space-y-4">
        <div>
          <h1 className="font-manrope font-extrabold text-[20px] text-[#251817] ">
            Occasion
          </h1>
        </div>
        <div className="space-y-2">
          {["Casual", "Festive", "Formal"].map((occasion) => {
            return (
              <div
                key={occasion}
                className="flex items-center gap-3 cursor-pointer tracking-wide "
              >
                <Checkbox
                  className={`size-4 bg-white border border-[#6B7280] fill-[#59413E] rounded-full`}
                  id="occasion"
                />
                <Label
                  htmlFor="occasion"
                  className="text-[16px] cursor-pointer"
                >
                  {occasion}
                </Label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// #WHATandWHY htmlFor
// Yadi tapai le htmlFor={cat} ra checkbox ko id={cat} milayera lekhnu bhayo bhane, user le Checkbox ma nai click garnu pardaina. Label (jastai: "Men") ma click garda pani checkbox aafai check/uncheck hunchha.
// Mobile users ko lagi yo dherai helpful hunchha kina bhane checkbox sano hunchha ra label ma click garna sajilo hunchha
