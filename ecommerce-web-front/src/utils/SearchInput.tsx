"use client";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";

// ── Types ──────────────────────────────────────────────────────────────
interface Product {
  _id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  images?: string[];
}

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  // NEW: passed down from the page that already has these
  results?: Product[];
  loading?: boolean;
  onResultClick?: (slug: string, category: string) => void;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search for items...",
  // ADDED: default to empty/false so existing usages don't break
  results = [],
  loading = false,
  onResultClick,
}: SearchBarProps) {
  // ADDED: track whether the input is focused
  // dropdown should only show when the user is actively typing
  const [isFocused, setIsFocused] = useState(false);

  // ADDED: ref to the wrapper div so we can detect outside clicks
  const wrapperRef = useRef<HTMLDivElement>(null);

  // ADDED: close dropdown when user clicks anywhere outside the component
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ADDED: dropdown is visible only when:
  // 1. input is focused
  // 2. user has typed something (not empty)
  // 3. suggestions are available OR we're loading
  const showDropdown = isFocused && value.trim().length > 0;

  return (
    // ADDED: position:relative on wrapper so dropdown can be absolute inside it
    <div ref={wrapperRef} className="relative w-full">
      {/* Search icon — unchanged */}
      <span className="absolute inset-y-0 left-0 flex items-center pl-4 pr-4 pointer-events-none">
        <Search
          strokeWidth={3}
          className="h-4 w-4 text-[#680006] font-medium"
        />
      </span>

      {/* ADDED: Loader replaces the search icon position on the RIGHT while fetching */}
      {loading && value.trim() && (
        <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          <Loader2 size={16} className="animate-spin text-[#680006]" />
        </span>
      )}

      <Input
        type="search"
        value={value}
        className="bg-white md:h-12.5 p-5 h-10.5 pl-10 rounded-2xl border-2 border-[#E0BFBB] transition-colors duration-200 focus-visible:outline-hidden focus-visible:border-[#680006] focus-visible:ring-0 focus-visible:ring-offset-0"
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        // ADDED: show dropdown on focus
        onFocus={() => setIsFocused(true)}
        // NOTE: we don't hide on blur here — handleClickOutside handles that
        // If we used onBlur, clicking a result would close BEFORE the click registers
      />

      {/* ADDED: Suggestions dropdown */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E0BFBB] rounded-2xl shadow-lg z-50 overflow-hidden max-h-72 overflow-y-auto">
          {/* State 1: still fetching */}
          {loading && (
            <p className="px-4 py-3 text-sm text-slate-400 text-center">
              Searching...
            </p>
          )}

          {/* State 2: done, no results */}
          {!loading && results.length === 0 && (
            <p className="px-4 py-3 text-sm text-slate-400 text-center">
              No results for &quot;{value}&quot;
            </p>
          )}

          {/* State 3: results ready */}
          {!loading && results.length > 0 && (
            <ul>
              {results.map((product) => (
                <li key={product._id}>
                  <button
                    // ADDED: onMouseDown instead of onClick
                    // Why? onClick fires AFTER onBlur — so if input loses focus first,
                    // the dropdown closes before the click registers.
                    // onMouseDown fires BEFORE onBlur, so the click always lands.
                    onMouseDown={() => {
                      if (onResultClick) {
                        onResultClick(product.slug, product.category);
                      }
                      onChange(""); // clear input
                      setIsFocused(false); // close dropdown
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#fff8f7] transition-colors text-left"
                  >
                    {/* Thumbnail */}
                    {product.images?.[0] ? (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        width={36}
                        height={36}
                        className="rounded-lg object-cover shrink-0"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-lg bg-slate-100 shrink-0" />
                    )}

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-700 truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-slate-400 capitalize">
                        {product.category}
                      </p>
                    </div>

                    <span className="text-sm font-semibold text-amber-900 shrink-0">
                      Rs. {product.price.toLocaleString()}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
