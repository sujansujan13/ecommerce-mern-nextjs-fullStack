"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cartItemsProps } from "@/context/cartContext";

interface OrderSummaryCardProps {
  items: cartItemsProps[];
  currentStep: number;
  onNext: () => void;
  isSubmitting?: boolean;
}

export default function OrderSummaryCard({
  items,
  currentStep,
  onNext,
  isSubmitting = false,
}: OrderSummaryCardProps) {
  // Compute subtotal dynamically based on actual row items
  const subtotal = items.reduce((sum, item) => {
    if (item.productId && typeof item.productId === "object") {
      return sum + item.productId.price * item.quantity;
    }
    return sum;
  }, 0);

  const shippingFee = subtotal > 0 ? 150 : 0;
  const discountAmount = subtotal > 10000 ? 500 : 0; // Simulated business promo discount logic
  const grandTotal = subtotal + shippingFee - discountAmount;
  const currency =
    items[0]?.productId && typeof items[0].productId === "object"
      ? items[0].productId.currency
      : "NPR";

  return (
    <div className="border border-[#e0bebb]/60 rounded-2xl p-4 md:p-5 bg-white shadow-sm space-y-4 h-fit">
      <h2 className="text-lg md:text-xl font-manrope font-extrabold text-stone-950 border-b border-stone-100 pb-3.5">
        Order Summary
      </h2>

      {/* Item Strip list block (Shows up in steps 2 & 3 based on your layout designs) */}
      {currentStep > 1 && (
        <div className="max-h-45 overflow-y-auto divide-y divide-stone-50 pr-1 space-y-2">
          {items.map((item) => {
            const prod = item.productId;
            if (!prod || typeof prod === "string") return null;

            return (
              <div
                key={item._id}
                className="flex items-center gap-3 pt-2 first:pt-0"
              >
                <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-stone-50 shrink-0 border border-stone-100">
                  <Image
                    src={prod.images[0]}
                    alt={prod.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-stone-950 truncate">
                    {prod.name}
                  </h4>
                  <p className="text-[11px] text-stone-500 font-medium">
                    Qty: {item.quantity}
                  </p>
                </div>
                <span className="text-xs font-bold text-stone-900 shrink-0">
                  {currency} {(prod.price * item.quantity).toLocaleString()}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Computational ledger matrix elements */}
      <div className="space-y-2.5 text-xs md:text-sm border-t border-stone-100 pt-3">
        <div className="flex justify-between text-stone-600 font-medium">
          <span>Subtotal</span>
          <span className="font-bold text-stone-900">
            {currency} {subtotal.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between text-stone-600">
          <span>Shipping Fee</span>
          <span className="font-semibold text-stone-800">
            {currency} {shippingFee}
          </span>
        </div>
        {discountAmount > 0 && (
          <div className="flex justify-between text-emerald-600 font-medium">
            <span>Volume Discount</span>
            <span className="font-bold">
              - {currency} {discountAmount}
            </span>
          </div>
        )}

        <div className="flex justify-between items-baseline pt-3 border-t border-dashed border-stone-200">
          <span className="text-sm font-bold text-stone-950">Total</span>
          <span className="font-extrabold text-xl md:text-2xl text-[#801818]">
            {currency} {grandTotal.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Contextual Action Button Handler execution block */}
      <Button
        onClick={onNext}
        disabled={items.length === 0 || isSubmitting}
        className="w-full font-manrope text-sm md:text-base bg-[#801818] hover:bg-[#6b1414] text-white py-6 md:py-7 rounded-2xl font-bold flex items-center justify-center gap-2 group shadow-sm transition-all cursor-pointer disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Processing Order...
          </>
        ) : currentStep === 3 ? (
          "Place Order"
        ) : (
          <>
            Proceed Next
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </>
        )}
      </Button>

      <p className="text-[10px] text-center text-stone-400 font-medium tracking-wide">
        🔒 Secure 256-bit SSL Encrypted Connection Engine
      </p>
    </div>
  );
}
