"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { AlertTriangle, CheckCircle2, Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart, cartItemsProps } from "../../context/cartContext";
import { cn } from "@/lib/utils";

interface CartItemRowProps {
  item: cartItemsProps;
}

export default function CartItemRow({ item }: CartItemRowProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const [inputValue, setInputValue] = useState<string>(
    item.quantity.toString(),
  );

  useEffect(() => {
    setInputValue(item.quantity.toString());
  }, [item.quantity]);

  const product = item.productId;

  if (!product || typeof product === "string") {
    return null;
  }

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const sanitized = e.target.value.replace(/[^0-9]/g, "");
    setInputValue(sanitized);
  };

  const handleQuantityFinalize = (strValue: string) => {
    let parsedQty = parseInt(strValue, 10);
    if (isNaN(parsedQty) || parsedQty < 1) parsedQty = 1;
    if (product.stockCount && parsedQty > product.stockCount)
      parsedQty = product.stockCount;

    setInputValue(parsedQty.toString());
    if (parsedQty !== item.quantity) {
      updateQuantity(product._id || "", parsedQty);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-[#e0bebb]/50 rounded-2xl bg-white gap-4 shadow-3xs transition-all hover:border-[#e0bebb]">
      <div className="flex gap-4 w-full sm:w-auto">
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-stone-50 shrink-0 border border-stone-100">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-between py-0.5 grow min-w-0">
          <div>
            <div className="flex justify-between items-start gap-2">
              <h3 className="font-bold font-manrope text-stone-950 text-base md:text-lg truncate">
                {product.name}
              </h3>
              <button
                onClick={() => removeFromCart(product._id || "")}
                className="sm:hidden text-stone-400 hover:text-red-500 p-1 transition-colors cursor-pointer"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <p className="text-xs font-medium text-stone-500 line-clamp-1 mt-0.5">
              {product.description}
            </p>
          </div>

          {/* Dynamic Stocking Badging */}
          {product.stockCount !== undefined && (
            <div className="mt-1">
              <span
                className={cn(
                  "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border",
                  product.stockCount > 5
                    ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                    : "bg-amber-50 text-amber-700 border-amber-100",
                )}
              >
                {product.stockCount > 5 ? (
                  <CheckCircle2 className="h-2.5 w-2.5" />
                ) : (
                  <AlertTriangle className="h-2.5 w-2.5" />
                )}
                {product.stockCount > 5
                  ? `In Stock (${product.stockCount})`
                  : `Only ${product.stockCount} left`}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Adjustments Row layout panel */}
      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t border-stone-50 sm:border-0">
        {/* Quantity Inputs box */}
        <div className="flex items-center gap-2 border border-stone-200 bg-stone-50/60 rounded-xl p-1">
          <button
            onClick={() => updateQuantity(product._id || "", item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white text-stone-600 disabled:opacity-30 transition-all cursor-pointer"
          >
            <Minus className="h-3 w-3" />
          </button>
          <input
            value={inputValue}
            onChange={handleInput}
            onBlur={() => handleQuantityFinalize(inputValue)}
            className="w-8 text-center bg-transparent font-bold text-xs focus:outline-none text-stone-900"
          />
          <button
            onClick={() => updateQuantity(product._id || "", item.quantity + 1)}
            disabled={
              product.stockCount ? item.quantity >= product.stockCount : false
            }
            className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white text-stone-600 disabled:opacity-30 transition-all cursor-pointer"
          >
            <Plus className="h-3 w-3" />
          </button>
        </div>

        {/* Dynamic line value text outputs */}
        <div className="text-right min-w-20">
          <p className="font-extrabold text-stone-950 text-sm md:text-base">
            {product.currency}{" "}
            {(product.price * item.quantity).toLocaleString()}
          </p>
        </div>

        <button
          onClick={() => removeFromCart(product._id || "")}
          className="hidden sm:block text-stone-400 hover:text-red-500 p-1.5 transition-colors cursor-pointer"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
