"use client";
import { registerUser } from "@/api/authApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PasswordInput from "@/utils/PasswordInput";
import axios from "axios";
// 🟢 Required icons import gareko
import { User, Mail, Phone, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";

export default function SignUpHeader() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await registerUser({ name, email, phone, password });
      localStorage.setItem("accessToken", data.accessToken);
      router.push("/");
    } catch (error: any) {
      setError(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card className="w-full max-w-md md:min-w-lg mx-auto bg-white overflow-hidden shadow-md rounded-2xl border border-slate-100 p-0">
      {/* Header Image Container */}
      <div className="relative h-36 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-amber-950/60 via-amber-900/40 to-amber-950/70 z-10" />

        <Image
          src="/signUpImage/signUpImage.png"
          alt="login-image"
          fill
          className="object-cover scale-105"
          priority
        />

        {/* Dead Center H1 Container */}
        <div className="absolute inset-0 z-20 flex items-center justify-center p-4">
          <h1 className="text-white font-extrabold text-3xl tracking-wide text-center drop-shadow-md">
            Create Account
          </h1>
        </div>
      </div>

      {/* Content Area */}
      <CardContent className="px-6 py-4">
        <div className="text-center mb-6">
          <p className="text-slate-600 text-[16px] font-medium leading-relaxed max-w-xs mx-auto">
            Join our community to access authentic heritage products from the{" "}
            <span className="font-semibold text-amber-900">
              heart of Nepal.
            </span>
          </p>
        </div>

        {/* Form Elements */}
        <form onSubmit={submitHandler} className="space-y-6">
          {/* 1. Full Name Input Field */}
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-xs font-bold uppercase tracking-wider text-slate-700"
            >
              Full Name
            </Label>
            <div className="relative flex items-center ">
              {/* 🟢 Centered Icon positioning alignment */}
              <div className="absolute left-3.5 text-[#8D706D] pointer-events-none">
                <User size={18} strokeWidth={2.2} />
              </div>
              <Input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                // 🟢 CRITICAL: pl-10 use gareko taaki text icon mathi nakhaptiyos
                className="pl-10  bg-[#FFE9E6]  border-[#E0BFBB] transition-all h-11 text-[16px] placeholder:text-[16px]"
                required
              />
            </div>
          </div>

          {/* 2. Email Address Input Field */}
          <div className="space-y-1.5">
            <Label
              htmlFor="email"
              className="text-xs font-bold uppercase tracking-wider text-slate-700"
            >
              Email Address
            </Label>
            <div className="relative flex items-center  ">
              <div className="absolute left-3.5 text-[#8D706D] pointer-events-none">
                <Mail size={18} strokeWidth={2.2} />
              </div>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                placeholder="name@example.com"
                className="pl-10 border-[#E0BFBB]  bg-[#FFE9E6] transition-all h-11 text-[16px] placeholder:text-[16px]"
                required
              />
            </div>
          </div>

          {/* 3. Phone Number Input Field */}
          <div className="space-y-1.5">
            <Label
              htmlFor="phone"
              className="text-xs font-bold uppercase tracking-wider text-slate-700"
            >
              Phone Number
            </Label>
            <div className="relative flex items-center">
              {/* 🟢 Icon first tracking, then Country Code prefix */}
              <div className="absolute left-3.5 text-[#8D706D] flex items-center gap-1.5 pointer-events-none border-r pr-2 border-slate-700">
                <Phone size={16} strokeWidth={2.2} />
                <span className="text-[#8D706D] text-xs font-medium">+977</span>
              </div>
              <Input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="98XXXXXXXX"
                // 🟢 Padding left expanded to pl-24 because of icon + country code text
                className="  bg-[#FFE9E6] pl-22 border-[#E0BFBB]  transition-all h-11 text-[16px] placeholder:text-[16px]"
                required
              />
            </div>
          </div>

          {/* 4. Password Input Field */}
          {/* <div className="space-y-1.5">
            <Label
              htmlFor="password"
              className="text-xs font-bold uppercase tracking-wider text-slate-700"
            >
              Password
            </Label>
            <div className="relative flex items-center ">
              <div className="absolute left-3.5 text-[#8D706D] pointer-events-none">
                <Lock size={18} strokeWidth={2.2} />
              </div>
              <Input
                type="password"
                id="password"
                placeholder="Min. 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-[#FFE9E6] border-[#E0BFBB]  transition-all h-11 text-[16px] placeholder:text-[16px]"
                required
              />
            </div> 
          </div> */}
          <div>
            <PasswordInput
              id="password"
              label="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 8 characters"
            />
          </div>

          {/* Terms & Conditions Box */}
          <div className="flex items-start gap-2.5 pt-1">
            <Checkbox
              id="terms"
              className="size-6 mt-0.5 border-slate-300 data-[state=checked]:bg-amber-800 data-[state=checked]:border-amber-800"
            />
            <label
              htmlFor="terms"
              className="text-sm leading-relaxed text-slate-600 select-none text-[12px] font-bold"
            >
              By creating an account, I agree to Himalayan Market's{" "}
              <span className="font-bold text-amber-800 hover:underline cursor-pointer">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="font-sbold text-amber-800 hover:underline cursor-pointer">
                Privacy Policy
              </span>
              .
            </label>
          </div>

          {/* Action Submit Button */}
          <Button
            className="w-full text-lg font-manrope  font-extrabold h-13 bg-amber-900 hover:bg-amber-950 text-white  rounded-lg transition-colors shadow-sm mt-2"
            type="submit"
          >
            Create Account
          </Button>
        </form>

        {/* The 'OR' Divider System */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-slate-200"></div>
          <span className="px-3 text-[12px] font-bold text-slate-400 tracking-widest uppercase">
            OR
          </span>
          <div className="flex-1 border-t border-slate-200"></div>
        </div>
        {/* login */}
        <div className="text-center mb-8">
          <p className="text-xl font-bold">
            Already a member?{" "}
            <Link href="/login">
              {" "}
              <span className="font-extrabold text-amber-800 hover:underline cursor-pointer">
                log In Here
              </span>
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
