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

interface sortProps {
  defaultValue: string;
  onValueChange: (value: string) => void;
}

export default function SortDropDown({
  defaultValue,
  onValueChange,
}: sortProps) {
  return (
    <div className="flex items-center justify-between gap-3 ">
      <span className="text-sm font-bold text-[#59413E] shrink-0">
        Sort by:
      </span>
      <Select
        defaultValue={defaultValue}
        // FIX IS HERE: Radix/Shadcn uses onValueChange and hands you a clean string directly!
        onValueChange={(val) => onValueChange(val)}
      >
        <SelectTrigger
          id="sort"
          className="w-full min-w-60  border border-[#8D706D] p-4.5 bg-white rounded-2xl font-medium text-amber-900 text-[16px] overflow-hidden"
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
              value="Popularity"
            >
              Popularity
            </SelectItem>
            <SelectItem
              className="text-[16px] font-semibold text-[#8D706D] transition-colors duration-100 cursor-pointer "
              value="Price:Low to High"
            >
              Price:Low to High
            </SelectItem>
            <SelectItem
              className="text-[16px] font-semibold text-[#8D706D] transition-colors duration-100 cursor-pointer "
              value="Price:High to Low"
            >
              Price:High to Low
            </SelectItem>
            <SelectItem
              className="text-[16px] font-semibold text-[#8D706D] transition-colors duration-100 cursor-pointer"
              value="Newest Arrival"
            >
              Newest Arrival
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
