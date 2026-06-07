import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { SelectIcon } from "@base-ui/react";

interface sortProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SortDropDown({ value, onChange }: sortProps) {
  return (
    <div className="flex items-center justify-between gap-3 ">
      <span className="text-sm font-bold text-[#59413E] shrink-0">
        Sort by:
      </span>
      <Select
        value={value}
        // FIX IS HERE: Radix/Shadcn uses onValueChange and hands you a clean string directly!
        onValueChange={(val) => onChange(val)}
      >
        <SelectTrigger
          id="sort"
          className="w-full  border border-[#8D706D] p-4.5 bg-white rounded-2xl font-medium text-amber-900 text-[16px] overflow-hidden"
        >
          <SelectValue placeholder="Select an Option" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel className="text-sm font-bold ">
              Pricing and Ordering
            </SelectLabel>

            <SelectItem
              className="text-[16px] font-semibold text-[#8D706D] transition-colors duration-100 cursor-pointer "
              value="popularity"
            >
              Popularity
            </SelectItem>
            <SelectItem
              className="text-[16px] font-semibold text-[#8D706D] transition-colors duration-100 cursor-pointer "
              value="price-low"
            >
              Price:Low to High
            </SelectItem>
            <SelectItem
              className="text-[16px] font-semibold text-[#8D706D] transition-colors duration-100 cursor-pointer "
              value="price-high"
            >
              Price:High to Low
            </SelectItem>
            <SelectItem
              className="text-[16px] font-semibold text-[#8D706D] transition-colors duration-100 cursor-pointer"
              value="newest"
            >
              Newest Arrivals
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
