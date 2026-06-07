"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock } from "lucide-react";
import React, { useState } from "react";

type passwordProps = {
  id: string;
  placeholder: string;
  value: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export default function PasswordInput({
  id,
  placeholder,
  value,
  label,
  onChange,
}: passwordProps) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="space-y-1.5">
      <Label
        htmlFor={id}
        className="text-xs font-bold uppercase tracking-wider text-slate-700"
      >
        Password
      </Label>
      <div className="relative flex items-center ">
        <div className="absolute left-3.5 text-[#8D706D] pointer-events-none">
          <Lock size={18} strokeWidth={2.2} />
        </div>
        <Input
          type={showPassword ? "text" : "password"}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="pl-10 bg-[#FFE9E6] border-[#E0BFBB]  transition-all h-11 text-[16px] placeholder:text-[16px]"
          required
        />
        <button
          type="button"
          className="absolute right-3 top-3"
          onClick={() => {
            setShowPassword((prev) => !prev);
          }}
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </button>
      </div>
    </div>
  );
}
