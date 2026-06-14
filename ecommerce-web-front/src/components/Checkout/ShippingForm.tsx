"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ShippingData {
  fullName: string;
  phoneNumber: string;
  district: string;
  municipality: string;
  streetAddress: string;
}

interface ShippingFormProps {
  formData: ShippingData;
  onChange: (fields: Partial<ShippingData>) => void;
}

export default function ShippingForm({
  formData,
  onChange,
}: ShippingFormProps) {
  return (
    <div className="border border-[#e0bebb]/60 rounded-2xl p-4 md:p-6 bg-white shadow-xs space-y-5">
      <div className="flex items-center gap-2.5 border-b border-stone-100 pb-3">
        <span className="text-xl">🚚</span>
        <h2 className="text-xl md:text-2xl font-manrope font-extrabold text-[#59413e]">
          Shipping Address
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full Name Input */}
        <div className="space-y-2 col-span-1 md:col-span-1">
          <Label className="text-xs md:text-sm font-bold text-stone-700">
            Full Name
          </Label>
          <Input
            type="text"
            placeholder="e.g. Biraj Thapa"
            value={formData.fullName}
            onChange={(e) => onChange({ fullName: e.target.value })}
            className="bg-[#fff0ee]/30 p-5 border-stone-200 focus-visible:ring-[#801818] rounded-xl text-stone-900 placeholder:text-stone-400"
          />
        </div>

        {/* Phone Number Input */}
        <div className="space-y-2 col-span-1 md:col-span-1">
          <Label className="text-xs md:text-sm font-bold text-stone-700">
            Phone Number
          </Label>
          <Input
            type="tel"
            placeholder="+977 98XXXXXXXX"
            value={formData.phoneNumber}
            onChange={(e) => onChange({ phoneNumber: e.target.value })}
            className="bg-[#fff0ee]/30 p-5 border-stone-200 focus-visible:ring-[#801818] rounded-xl text-stone-900 placeholder:text-stone-400"
          />
        </div>

        {/* District Selector Dropdown primitive */}
        <div className="space-y-2 col-span-1 md:col-span-1">
          <Label className="text-xs md:text-sm font-bold text-stone-700">
            District
          </Label>
          <Select
            value={formData.district}
            onValueChange={(val) => onChange({ district: val })}
          >
            <SelectTrigger className="w-full p-5 bg-[#fff0ee]/30 border-stone-200 focus:ring-[#801818] rounded-xl text-stone-900">
              <SelectValue placeholder="Select district" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kathmandu">Kathmandu</SelectItem>
              <SelectItem value="lalitpur">Lalitpur</SelectItem>
              <SelectItem value="bhaktapur">Bhaktapur</SelectItem>
              <SelectItem value="pokhara">Pokhara</SelectItem>
              <SelectItem value="chitwan">Chitwan</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Municipality / City Info field */}
        <div className="space-y-2 col-span-1 md:col-span-1">
          <Label className="text-xs md:text-sm font-bold text-stone-700">
            Municipality / City
          </Label>
          <Input
            type="text"
            placeholder="e.g. Kathmandu Metro-32"
            value={formData.municipality}
            onChange={(e) => onChange({ municipality: e.target.value })}
            className="bg-[#fff0ee]/30 p-5 border-stone-200 focus-visible:ring-[#801818] rounded-xl text-stone-900 placeholder:text-stone-400"
          />
        </div>

        {/* Street Address / Local Landmark block field */}
        <div className="space-y-2 col-span-1 md:col-span-2">
          <Label className="text-xs md:text-sm font-bold text-stone-700">
            Street Address / Landmark
          </Label>
          <Textarea
            placeholder="House number, Street name, Near school/temple..."
            value={formData.streetAddress}
            onChange={(e) => onChange({ streetAddress: e.target.value })}
            className="bg-[#fff0ee]/30 border-stone-200 focus-visible:ring-[#801818] rounded-xl min-h-20 text-stone-900 placeholder:text-stone-400"
          />
        </div>
      </div>
    </div>
  );
}
