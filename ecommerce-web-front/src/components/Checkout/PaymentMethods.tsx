"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type PaymentGateway = "esewa" | "khalti" | "cod";

interface PaymentMethodsProps {
  selected: PaymentGateway;
  onSelect: (gateway: PaymentGateway) => void;
}

export default function PaymentMethods({
  selected,
  onSelect,
}: PaymentMethodsProps) {
  const options = [
    {
      id: "esewa" as PaymentGateway,
      name: "eSewa Wallet",
      meta: "Instant Payment Processing",
      logoBg: "bg-emerald-500",
      letter: "e",
    },
    {
      id: "khalti" as PaymentGateway,
      name: "Khalti",
      meta: "Secure digital checkout",
      logoBg: "bg-indigo-700",
      letter: "K",
    },
    {
      id: "cod" as PaymentGateway,
      name: "Cash on Delivery",
      meta: "Pay at your doorstep",
      logoBg: "bg-stone-800",
      letter: "💵",
    },
  ];

  return (
    <div className="border border-[#e0bebb]/60 rounded-2xl p-4 md:p-6 bg-white shadow-xs space-y-5">
      <div className="flex items-center gap-2.5 border-b border-stone-100 pb-3">
        <span className="text-xl">💳</span>
        <h2 className="text-xl md:text-2xl font-manrope font-extrabold text-[#59413e]">
          Payment Method
        </h2>
      </div>

      {/* Responsive Structural Switch Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {options.map((method) => {
          const isSelected = selected === method.id;
          return (
            <button
              key={method.id}
              type="button"
              onClick={() => onSelect(method.id)}
              className={cn(
                "relative flex flex-col items-center justify-center text-center p-5 border rounded-2xl transition-all duration-200 outline-none group cursor-pointer",
                isSelected
                  ? "border-[#801818] bg-[#fff0ee]/20 ring-1 ring-[#801818]"
                  : "border-stone-200 bg-white hover:border-[#e0bebb] hover:bg-stone-50/50",
              )}
            >
              {/* Selected Checkmark Badge overlay */}
              {isSelected && (
                <div className="absolute top-3 right-3 text-[#801818]">
                  <CheckCircle2 className="h-4 w-4 fill-[#801818] text-white" />
                </div>
              )}

              {/* Dynamic Native Logo Mimic boxes */}
              <div
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-lg mb-3 shadow-2xs transition-transform group-hover:scale-105",
                  method.logoBg,
                )}
              >
                {method.letter}
              </div>

              <span className="block font-bold text-stone-950 text-sm md:text-base tracking-tight">
                {method.name}
              </span>
              <span className="block text-[11px] text-stone-400 font-medium mt-0.5">
                {method.meta}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
