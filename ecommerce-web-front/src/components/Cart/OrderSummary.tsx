"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function OrderSummary() {
  return (
    <div className="border border-[#e0bebb] rounded-2xl p-5 bg-white shadow-sm h-fit space-y-5">
      <h2 className="text-xl font-manrope font-bold text-stone-950 tracking-tight border-b-2 border-[#fdecea] py-4">
        Order Summary
      </h2>

      <div className="space-y-3.5 text-sm pb-4 border-b border-[#ceaaa5]">
        <div className="flex justify-between text-stone-700 font-medium">
          <span className="font-medium">Subtotal</span>
          <span className="font-bold text-sm text-stone-900">NPR 18,400</span>
        </div>

        <div className="space-y-2">
          <div>
            {" "}
            <label className="text-xs uppercase tracking-wider font-bold text-stone-950">
              Delivery District
            </label>
          </div>
          <div>
            <Select defaultValue="kathmandu">
              <SelectTrigger className="w-full p-5 bg-[#fff0ee] border-[#e0bdbb] focus:ring-amber-500 focus:border-amber-500 rounded-xl">
                <SelectValue placeholder="Select district" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kathmandu">
                  Kathmandu (Standard - 1 Day)
                </SelectItem>
                <SelectItem value="lalitpur">
                  Lalitpur (Standard - 1 Day)
                </SelectItem>
                <SelectItem value="bhaktapur">
                  Bhaktapur (Standard - 1 Day)
                </SelectItem>
                <SelectItem value="outside">
                  Outside Valley (2-3 Days)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-between text-stone-600 pt-1">
          <span className="text-sm font-medium">Shipping Fee</span>
          <span className="font-bold text-sm text-blue-700">NPR 150</span>
        </div>

        <div className="flex justify-between text-stone-600">
          <span className="text-sm font-medium">VAT (13%)</span>
          <span className="font-bold text-sm text-stone-900">NPR 2,411.50</span>
        </div>
      </div>

      {/* Promo Code input Group */}
      <div className="flex gap-2 ">
        <Input
          type="text"
          placeholder="Promo code"
          className="bg-[#fff0ee] p-5   border-stone-200 focus-visible:ring-amber-500 rounded-xl placeholder:text-black placeholder:font-medium placeholder:text-base"
        />
        <Button className="bg-[#006699] hover:bg-[#005580] rounded-xl p-5 text-white font-semibold px-5">
          Apply
        </Button>
      </div>

      <div className="pt-2 space-y-4">
        <div className="flex justify-between items-baseline mb-4">
          <span className="text-base font-semibold text-stone-900">
            Total Amount
          </span>
          <span className=" font-extrabold text-2xl text-[#801818]">
            NPR 20,961.50
          </span>
        </div>

        <Button className="w-full font-manrope text-lg bg-[#801818] hover:bg-[#6b1414] text-white py-8  rounded-3xl font-bold flex items-center justify-center gap-2 group shadow-md transition-all">
          Proceed to Checkout
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>

        <p className="text-xs text-center text-stone-800 mt-3">
          Secure SSL Encrypted Payment Processing
        </p>
      </div>
    </div>
  );
}
