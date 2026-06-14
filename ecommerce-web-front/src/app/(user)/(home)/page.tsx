"use client";
import CategorySection from "@/components/ui/home/category-section";
import HeroSection from "@/components/ui/home/hero-section";
import LocalSeller from "@/components/ui/home/local-seller";
import TrendingSection from "@/components/ui/home/trending-section";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <HeroSection />
      <CategorySection />
      <TrendingSection />
      <LocalSeller />
    </div>
  );
}
