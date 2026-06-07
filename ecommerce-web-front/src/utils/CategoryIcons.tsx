import { CategoryType } from "@/app/(user)/fashion/page";
import { Venus } from "lucide-react";
import React from "react";

// #IMP#:We don't have to import CategoryType manually, when used "interface" it is automatically suggested
interface categoryIconProps {
  category: CategoryType;
}

export default function CategoryIcons({ category }: categoryIconProps) {
  const Icon = category.iconName;
  return (
    <div className="flex flex-col gap-2 shrink-0 w-30 text-center items-center cursor-pointer ">
      {/* Icons */}
      <div className="h-24 w-24 rounded-full border border-[#e3c3c0] bg-[#fce3e0] flex items-center justify-center shadow-lg shrink-0 hover:shadow-2xl transition-shadow duration-300 ">
        <Icon
          size={24}
          strokeWidth={2}
          className="fill-[#680006] text-[#680006]"
        />
      </div>
      {/* texts */}
      <div className="text-center h-10 flex self-center justify-center   ">
        <h3 className="text-sm font-bold  leading-tight wrap-break-word  ">
          {category.categoryName}
        </h3>
      </div>
    </div>
  );
}
