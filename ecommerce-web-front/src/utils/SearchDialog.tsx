"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

interface Product {
  _id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  images?: string[];
}

interface SearchDialogProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  results: Product[];
  loading: boolean;
}

export default function SearchDialog({
  value,
  onChange,
  placeholder,
  results,
  loading,
}: SearchDialogProps) {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleResultClick = (href: string) => {
    // Step 1: clear input
    onChange("");
    // Step 2: close dialog first
    setOpen(false);
    // Step 3: navigate AFTER dialog closes
    // setTimeout pushes navigation to the next event loop tick,
    // giving React time to unmount the dialog before the page transition
    setTimeout(() => {
      router.push(href);
    }, 0);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" aria-label="Open search">
          <Search
            className="stroke-[#4b5563]"
            style={{ height: "1.5rem", width: "1.5rem" }}
          />
        </Button>
      </DialogTrigger>

      <DialogContent
        className="sm:max-w-md p-0 gap-0 overflow-hidden"
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          inputRef.current?.focus();
        }}
        onCloseAutoFocus={() => onChange("")}
      >
        <DialogTitle className="sr-only">Search products</DialogTitle>

        {/* Search input row */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100">
          <Search size={18} className="text-slate-400 shrink-0" />
          <Input
            ref={inputRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || "Search products..."}
            className="border-none shadow-none focus-visible:ring-0 p-0 text-base"
          />
          {loading && (
            <Loader2
              size={16}
              className="animate-spin text-slate-400 shrink-0"
            />
          )}
        </div>

        {/* Results area */}
        <div className="max-h-80 overflow-y-auto">
          {!value.trim() && (
            <p className="px-4 py-6 text-sm text-center text-slate-400">
              Type to search products
            </p>
          )}

          {value.trim() && loading && (
            <p className="px-4 py-6 text-sm text-center text-slate-400">
              Searching...
            </p>
          )}

          {value.trim() && !loading && results.length === 0 && (
            <p className="px-4 py-6 text-sm text-center text-slate-400">
              No products found for &quot;{value}&quot;
            </p>
          )}

          {value.trim() && !loading && results.length > 0 && (
            <ul role="listbox">
              {results.map((product) => (
                <li key={product._id} role="option" aria-selected="false">
                  {/* ✅ button instead of Link — we control navigation manually */}
                  <button
                    onClick={() =>
                      handleResultClick(
                        `/product/${product.category}/${product.slug}`,
                      )
                    }
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left"
                  >
                    {product.images?.[0] ? (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        width={40}
                        height={40}
                        className="rounded-lg object-cover shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-slate-100 shrink-0" />
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
      </DialogContent>
    </Dialog>
  );
}
