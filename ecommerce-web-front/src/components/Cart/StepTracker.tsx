"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface StepTrackerProps {
  currentStep: number;
}

export default function StepTracker({ currentStep }: StepTrackerProps) {
  const steps = [
    { number: 1, label: "Cart" },
    { number: 2, label: "Details" },
    { number: 3, label: "Payment" },
  ];

  return (
    <div className="w-full max-w-md mx-auto my-6 md:my-10 px-4 isolation-auto">
      <div className="relative flex items-center justify-between z-0">
        {/* Progress Background Bar Line */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1px bg-stone-200 -z-10" />

        {steps.map((step, index) => {
          const isActive = currentStep === step.number;
          const isCompleted = currentStep > step.number;

          return (
            <div
              key={step.number}
              className="flex flex-col items-center relative flex-1"
            >
              {/* Connection Line segment masks */}
              {index === 0 && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/2 h-px bg-[#fff8f7] -z-10" />
              )}
              {index === steps.length - 1 && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-px bg-[#fff8f7] -z-10" />
              )}

              <div
                className={cn(
                  "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold font-manrope text-sm md:text-base border transition-all duration-300",
                  isActive &&
                    "bg-[#801818] border-[#801818] text-white shadow-sm ring-4 ring-[#fff0ee]",
                  isCompleted && "bg-[#801818] border-[#801818] text-white",
                  !isActive &&
                    !isCompleted &&
                    "bg-white border-stone-200 text-stone-400",
                )}
              >
                {step.number}
              </div>
              <span
                className={cn(
                  "mt-2 text-[11px] md:text-xs font-bold tracking-wide font-manrope uppercase transition-all duration-300",
                  isActive ? "text-[#801818]" : "text-stone-400",
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
