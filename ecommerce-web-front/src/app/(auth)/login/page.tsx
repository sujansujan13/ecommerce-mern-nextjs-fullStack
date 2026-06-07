"use client";
import { loginUser } from "@/api/authApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PasswordInput from "@/utils/PasswordInput";
import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { SyntheticEvent, useState } from "react";
import { useAuth } from "../../../../context/AuthProvider";

export default function page() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isUnderlined, setIsUnderlined] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const { login } = useAuth();

  const loginHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await loginUser({ email, password });
      login(data.user, data.accessToken);
      router.push("/");
    } catch (error: any) {
      setError(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card className="w-full max-w-md md:min-w-lg mx-auto bg-white overflow-hidden shadow-md rounded-2xl border border-slate-100 p-0">
      <CardContent className="px-6 py-8 space-y-6 ">
        {/* title */}
        <div className="text-center ">
          <h1 className="font-manrope text-3xl font-black text-[#680006]">
            Himalayan Market
          </h1>
          <p className="text-[16px] font-serif text-[#59413e]">
            Heritage in every Click
          </p>
        </div>
        <form action="" className="space-y-6 mt-10">
          {/* email or password */}
          <div className="space-y-1.5">
            <Label
              htmlFor="email"
              className="text-xs font-bold uppercase tracking-wider text-slate-700"
            >
              Email or Phone Number
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
          {/* password */}
          <div>
            <PasswordInput
              id="password"
              label="password"
              placeholder="......."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* remember me and forgot password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                className={`border border-amber-800 h-4`}
              />
              <label
                htmlFor="remember"
                className="font-sans text-sm text-[#251817]"
              >
                Remember Me
              </label>
            </div>
            <Link
              onClick={() => {
                setIsUnderlined((prev) => !prev);
              }}
              href="#forgot"
              className={`hover:underline text-sm text-blue-600  hover:decoration-1 ${isUnderlined ? "underline  decoration-1 underline-offset-4" : ""} `}
            >
              Forgot Password?
            </Link>
          </div>
          <Button onClick={loginHandler} className="w-full h-11 bg-[#680007] ">
            Login
          </Button>
        </form>
        {/* or */}
        <div className="flex items-center gap-2">
          <div className="flex-1 border-t bg-slate-300" />
          <span>or contiue with</span>
          <div className="flex-1 border-t bg-slate-300  " />
        </div>
        {/* social login */}
        <div className="w-full flex justify-center gap-4">
          <Button
            variant="outline"
            className=" w-1/2 h-11 flex items-center gap-1.5"
          >
            <Image
              src={"/signUpImage/Google_Logo.png"}
              alt="google-login"
              height={20}
              width={20}
              className="object-cover"
            />
            <span>Google</span>
          </Button>
          <Button
            variant="outline"
            className="w-1/2 h-11 flex items-center gap-1.5"
          >
            <Image
              src={"/signUpImage/facebook.png"}
              alt="facebook-login"
              width={20}
              height={20}
              className="object-cover"
            />
            <span>Facebook</span>
          </Button>
        </div>
        {/* no account */}
        <div className="text-center">
          <p>
            Don't have an account?{" "}
            <Link href="/signUp">
              <span className="font-extrabold text-amber-800 hover:underline cursor-pointer">
                Create Account
              </span>
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
