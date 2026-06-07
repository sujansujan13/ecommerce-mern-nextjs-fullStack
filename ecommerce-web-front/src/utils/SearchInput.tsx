import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search for items...",
}: SearchBarProps) {
  return (
    <div className="relative w-full ">
      {/* #CURIOUS#:pointer-events-none */}
      <span className="absolute inset-y-0 left-0 flex items-center pl-4 pr-4 pointer-events-none">
        <Search
          strokeWidth={3}
          className="h-4 w-4  text-[#680006] font-medium"
        />
      </span>
      <Input
        type="search"
        value={value}
        // The Tailwind utility class that changes an element's border color when a user starts typing (clicks into it) is prefixed with focus:.
        // FIX: Swapped focus: with focus-visible: and disabled the default ring styles
        // #REMEMBER#:add an exclamation mark (!) right before the utility class. This translates to !important in regular CSS, forcing the browser to prioritize your text size over Shadcn’s default or u can change the default component
        className={`bg-white md:h-12.5 p-5  h-10.5 pl-10 rounded-2xl border-2 border-[#E0BFBB] transition-colors duration-200 focus-visible:outline-hidden focus-visible:border-[#680006] focus-visible:ring-0 focus-visible:ring-offset-0  `}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}
