import React from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { BadgeCheck } from "lucide-react";

const BRANDS = ["Samsung", "Apple", "Xiaomi", "Ultima", "GoldStar"];
export default function LeftSidebar() {
  const regions = [
    { label: "Kathmandu", value: "Kathmandu" },
    { label: "Pokhara", value: "Pokhara" },
    { label: "Chitwan", value: "Chitwan" },
    { label: "Butwal", value: "Butwal" },
  ];
  return (
    <div className="space-y-8  ">
      {/* CheckBoxes */}
      <div className="space-y-4">
        <div>
          <h1 className="text-[16px] font-medium">Brand</h1>
        </div>
        {BRANDS.map((brand) => {
          // We need a unique ID so the label knows which checkbox it belongs to
          const id = `brand-${brand.toLowerCase()}`;
          return (
            <div key={brand} className="flex items-center  gap-2.5">
              {/* // 1. Mark this as the "peer" */}
              <Checkbox
                className={`bg-[#ffff] border border-gray-400 peer`}
                id={id}
              />
              <Label
                htmlFor={id}
                className="peer-data-checked:text-[#8c1514] transition-colors cursor-pointer text-[16px]"
                // 2. Use peer-data-[state=checked] to change style
                // Base UI doesn't use the attribute data-state="checked". Instead, it uses a simpler attribute: data-checked.
              >
                {" "}
                {brand}
              </Label>
            </div>
          );
        })}
      </div>
      {/* min-max price */}
      <div className="space-y-4">
        <h1 className="text-[16px] font-medium ">Price Range (NPR)</h1>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min"
            className="h-10 bg-[#ffe9e6] border-2 border-[#efd4d0] text-center"
          />
          <span>to</span>
          <Input
            type="number"
            placeholder="Max"
            className="h-10 bg-[#ffe9e6] border-2 border-[#efd4d0] text-center"
          />
        </div>
      </div>
      {/* select delivery region */}
      <div className="space-y-4">
        <h1 className="text-[16px] font-medium">Delivery Region</h1>
        <Select>
          <SelectTrigger
            className={`w-full py-5 border-2 border-[#efd4d0] bg-[#ffe9e6] text-lg placeholder:text-gray-800 `}
          >
            {/* Adding the placeholder prop here */}
            <SelectValue placeholder="Select a region" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className={`text-sm `}>Delivery Regions</SelectLabel>
              {regions.map((region) => (
                <SelectItem
                  key={region.value}
                  value={region.value}
                  className={`text-xl font-medium`}
                >
                  {region.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {/* radio button  */}
      <div className="space-y-3">
        <h1 className="text-[16px] font-medium">Warranty Type </h1>
        <div>
          <RadioGroup defaultValue="brand-warranty">
            <div className="flex items-center gap-2.5">
              <RadioGroupItem
                value={"brand-warranty"}
                className={`peer`}
                id="r1"
              />
              <Label
                htmlFor="r1"
                className="peer-data-checked:text-[#8c1514] text-[16px]"
              >
                Brand Warranty
              </Label>
            </div>
            <div className="flex items-center gap-2.5">
              <RadioGroupItem
                value={"seller-warranty"}
                className={`peer`}
                id="r2"
              />
              <Label
                htmlFor="r2"
                className="peer-data-checked:text-[#8c1514] text-[16px]"
              >
                Seller Warranty
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>
      {/* a small card  */}
      <div className="py-4 px-5 border rounded-2xl bg-[#fce3e0] space-y-1.5">
        {/* icons and header */}
        <div className="flex items-center gap-2">
          {/* // 1. size: use 'size-{number}' for height/width
      // 2. color: 'text-{color}' changes the stroke/lines
      // 3. fill: 'fill-{color}' changes the inside background */}
          <BadgeCheck
            size={25}
            className="text-[#ffff] fill-amber-900 "
            style={{ filter: "none" }}
          />
          <h3 className="text-[16px] text-[#680007] font-medium">
            Authorized Store
          </h3>
        </div>
        {/* paragraph */}
        <div>
          <p className="text-xs text-gray-800 font-semibold">
            Shop with confidence. All products in this section are 100%
            authentic with 7-day easy returns.
          </p>
        </div>
      </div>
    </div>
  );
}
