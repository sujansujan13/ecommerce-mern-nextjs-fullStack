"use client";

import Image from "next/image";
import { AlertTriangle, CheckCircle2, Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useCart, cartItemsProps } from "../../context/cartContext";
import { cn } from "@/lib/utils";

// FIX: Wrap your structural item data inside a standardized React Props interface
interface CartItemRowProps {
  item: cartItemsProps;
}

export default function CartItemRow({ item }: CartItemRowProps) {
  const { updateQuantity, removeFromCart } = useCart();

  const [inputValue, setInputValue] = useState<string>(
    item.quantity.toString(),
  );

  // 🚀 CRITICAL FIX: Keep the local input state in sync when item.quantity shifts!
  // yo EFFECT vayena vane user le + or - click garda quantity immediately update hudaina refresh garepaxi matra hunxa
  useEffect(() => {
    setInputValue(item.quantity.toString());
  }, [item.quantity]);

  const product = item.productId;

  // 3. TYPE GUARD: If it's null, undefined, or just a string ID (not populated),
  // do not render this row to avoid crashing.
  if (!product || typeof product === "string") {
    return null;
  }

  const handleinput = (e: ChangeEvent<HTMLInputElement>) => {
    const sanitized = e.target.value.replace(/[^0-9]/g, "");
    setInputValue(sanitized);
  };

  const handleQuantityFinalize = (strValue: string) => {
    let parsedQty = parseInt(strValue, 10);

    if (isNaN(parsedQty) || parsedQty < 1) {
      parsedQty = 1;
    }

    if (product.stockCount && parsedQty > product.stockCount) {
      parsedQty = product.stockCount;
    }

    setInputValue(parsedQty.toString());
    if (parsedQty !== item.quantity) {
      updateQuantity(product._id, parsedQty);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-[#e0bebb] rounded-2xl bg-white gap-4 shadow-sm">
      <div className="flex gap-4 w-full sm:w-auto">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-stone-50 shrink-0">
          <Image
            src={product.images[0] as string}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-between py-1 grow">
          <div className="space-y-1">
            <div className="flex justify-between items-start ">
              <h3 className="font-bold font-manrope text-stone-900 text-xl line-clamp-1 ">
                {product.name}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                className="sm:hidden text-stone-400 hover:text-red-500 "
              >
                <Trash2 className="h-8 w-8" />
              </Button>
            </div>
            <p className=" text-sm font-medium text-[#59413e] mt-0.5 line-clamp-1">
              {product.description}
            </p>

            {/*  Enhanced Dynamic In-Stock Badge UI */}
            {product.inStock && product.stockCount !== undefined && (
              <div className="pt-1">
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border tracking-wide shadow-3xs",
                    product.stockCount > 5
                      ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                      : "bg-amber-50 text-amber-700 border-amber-100",
                  )}
                >
                  {product.stockCount > 5 ? (
                    <CheckCircle2 className="h-3 w-3 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertTriangle className="h-3 w-3 text-amber-600 shrink-0 animate-pulse" />
                  )}
                  {product.stockCount > 5
                    ? `In Stock: ${product.stockCount}`
                    : `Only ${product.stockCount} left`}
                </span>
              </div>
            )}
          </div>

          {/* Mobile Quantity Selector */}
          {product.stockCount === 1 ? (
            /* 💡 If only 1 item exists in stock, lock the selector UI cleanly */
            <div className="inline-flex items-center mt-2 sm:hidden border border-amber-200 bg-amber-50 text-amber-800 text-[11px] font-bold px-3 py-1.5 rounded-full shadow-3xs">
              Qty: 1{" "}
              <span className="font-medium text-amber-600 ml-1">
                (Last item left)
              </span>
            </div>
          ) : (
            /* 💡 Standard Quantity Selector for items with multiple stock units available */
            <div className="flex items-center gap-2 mt-2 sm:hidden border border-stone-200 bg-stone-50 rounded-lg p-0.5 max-w-25 justify-between">
              <button
                onClick={() => updateQuantity(product._id, item.quantity - 1)}
                disabled={item.quantity <= 1}
                className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-white hover:shadow-3xs text-stone-600 transition-all disabled:opacity-40"
              >
                <Minus className="h-3 w-3" />
              </button>
              <input
                value={inputValue}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                onChange={handleinput}
                className="w-7 text-center bg-transparent border-none text-xs font-bold text-stone-800 focus:outline-none"
                onBlur={() => handleQuantityFinalize(inputValue)}
                onKeyDown={handleKeyDown}
              />
              <button
                onClick={() => updateQuantity(product._id, item.quantity + 1)}
                disabled={
                  product.stockCount
                    ? item.quantity >= product.stockCount
                    : false
                }
                className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-white hover:shadow-3xs text-stone-600 transition-all disabled:opacity-40"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Desktop/Tablet side content */}
      <div className="hidden sm:flex items-center gap-6 self-stretch justify-between sm:justify-end flex-1 sm:flex-initial">
        {product.stockCount === 1 ? (
          <div className="border border-amber-200 bg-amber-50 text-amber-800 text-xs font-bold px-4 py-2 rounded-xl min-w-[110px] text-center shadow-3xs">
            Qty: 1{" "}
            <span className="block text-[10px] text-amber-600 font-medium">
              Last available
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-3 border border-[#e0bebb] bg-[#fff0ee] rounded-full p-1.5 px-3">
            <button
              onClick={() => updateQuantity(product._id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="p-1 rounded-full hover:bg-white text-stone-600 transition-all"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            {/* <span className="text-sm font-semibold w-6 text-center">
            {item.quantity}
          </span> */}

            <input
              value={inputValue}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              onChange={handleinput}
              className="w-7 text-center bg-transparent border-none text-xs font-semibold focus:outline-none"
              onBlur={() => handleQuantityFinalize(inputValue)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={() => updateQuantity(product._id, item.quantity + 1)}
              className="p-1 rounded-full hover:bg-white text-stone-600 transition-all"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        <div className="shrink-0 min-w-25">
          {product.oldPrice && (
            <p className="text-xs text-stone-400 line-through">
              {product.currency} {product.oldPrice.toLocaleString()}
            </p>
          )}
          <p className="font-bold text-stone-900 text-sm sm:text-base">
            {product.currency} {product.price.toLocaleString()}
          </p>
        </div>

        <Button
          onClick={() => {
            removeFromCart(product._id);
          }}
          variant="ghost"
          size="icon"
          className="text-stone-400 hover:text-red-500 hidden sm:flex"
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile-only Pricing strip */}
      <div className="flex sm:hidden justify-between items-center w-full pt-2 border-t border-stone-100">
        <span className="text-lg text-black font-bold">Price</span>
        <div className="flex items-baseline gap-1.5">
          {product.oldPrice && (
            <span className="text-xs text-stone-400 line-through">
              {product.currency} {product.oldPrice.toLocaleString()}
            </span>
          )}
          <span className="font-bold text-stone-900 text-sm">
            {product.currency}
            {product.price.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
