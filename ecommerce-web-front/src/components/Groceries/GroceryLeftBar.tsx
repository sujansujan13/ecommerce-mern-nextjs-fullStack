"use client";
import React, { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";

export default function GroceryLeftBar() {
  const [price, setPrice] = useState([20000]);
  const MAX_PRICE = 50000;
  return (
    <div className="sticky top-24 space-y-6 w-full">
      {/* categories */}
      <div className="space-y-3">
        <header className="text-[18px] font-manrope text-[#251817] font-extrabold">
          Categories
        </header>
        <div className="space-y-3">
          {["Organic", "Grains", "Spices", "Dairy", "Fresh Produce"].map(
            (cat) => {
              return (
                <div key={cat} className="flex items-center gap-3 ">
                  <Checkbox
                    className={`cursor-pointer bg-white size-5 rounded-sm border border-[#8d706d]`}
                  />
                  <Label className="text-[16px] text-[#59413e] hover:text-[#680006] cursor-pointer">
                    {cat}
                  </Label>
                </div>
              );
            },
          )}
        </div>
      </div>
      {/* origin region */}
      <div className="space-y-3">
        <header className="text-[18px] font-manrope text-[#251817] font-extrabold">
          Origin Region
        </header>
        <div className="space-y-3">
          {["Mustang", "Ilam", "Kathmandu Valley", "Solukhumbu"].map(
            (region) => {
              return (
                <div key={region} className="flex items-center gap-3 ">
                  <Checkbox
                    className={`cursor-pointer bg-white size-5 rounded-full border border-[#8d706d]`}
                  />
                  <Label className="text-[16px] text-[#59413e] hover:text-[#680006] cursor-pointer">
                    {region}
                  </Label>
                </div>
              );
            },
          )}
        </div>
      </div>
      {/* price range slider  */}
      <div className="space-y-5 w-full">
        <header className="text-[18px] font-manrope text-[#251817] font-extrabold">
          Price Range
        </header>
        <div className="w-full space-y-3">
          <Slider
            // when you pass a value prop to an input or slider, it becomes a Controlled Component. This means the slider will ignore defaultValue entirely and only look at what is stored inside your price state variable.
            defaultValue={[20000]}
            min={500}
            max={MAX_PRICE}
            step={100}
            onValueChange={(value) => setPrice(value)}
            className="min-w-60"
          />
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#59413e]">
              {/* FIX: Read from the state variable, not the component prop */}
              NPR {price[0]?.toLocaleString() || "20,000"}
            </span>
            <span className="text-xs font-bold text-[#59413e]">
              NPR {MAX_PRICE}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
