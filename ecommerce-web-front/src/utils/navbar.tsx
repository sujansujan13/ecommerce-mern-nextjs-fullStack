"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MapPin, ShoppingCart, User } from "lucide-react";
import { getCategoryFromPath } from "./getCategoryFromPath";
import { useAuth } from "../context/AuthProvider";
import UserIConCom from "./UserIConCom";
import SearchDialog from "./SearchDialog";

export default function Navbar() {
  const { user, loading, logout } = useAuth();
  const pathname = usePathname();
  const activeCategory = getCategoryFromPath(pathname);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [Loading, setLoading] = useState(true);

  const navlinks = [
    { label: "Home", href: "/", iconName: "house" },
    { label: "Electronics", href: "/electronics", iconName: "circuit-board" },
    { label: "Fashion", href: "/fashion", iconName: "handbag" },
    { label: "Groceries", href: "/groceries", iconName: "shopping-basket" },
  ];

  const fetchProduct = async (value: string, signal: AbortSignal) => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:4000/api/products?search=${encodeURIComponent(value)}`,
        {
          signal,
        },
      );

      // 🧠 IMPORTANT: check before parsing JSON
      if (!res.ok) {
        const text = await res.text();
        console.error("Backend error:", text);
        return;
      }

      const data = await res.json();

      setResults(data.products || data || []); // Handle both { products: [...] } and [...] formats
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }
    const controller = new AbortController();

    const delayDebounceFn = setTimeout(() => {
      fetchProduct(searchQuery, controller.signal);
    }, 500); // Debounce by 500ms

    return () => {
      clearTimeout(delayDebounceFn);
      controller.abort();
    };
  }, [searchQuery]);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <nav className=" fixed top-0 z-50 w-full border-b border-background/40 bg-background  ">
      <div className="common-box  shadow-sm ">
        <div className="flex h-14 md:h-20 lg:h-17  items-center justify-between   ">
          {/* icon */}
          <div className="flex items-center">
            <Link href={"/"}>
              <h1 className="text-2xl md:text-2xl md:max-w-30 lg:max-w-60 font-bold  text-primary tracking-tighter">
                Himalayan Market
              </h1>
            </Link>
          </div>
          {/* navlinks */}
          <div className="hidden md:flex items-center justify-center md:gap-8 lg:gap-10 text-[14px] font-semibold">
            {navlinks.map((link) => {
              const isActive = (linkHref: string) => {
                if (linkHref === "/") return pathname === "/";
                return activeCategory === linkHref.slice(1);
              };
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors duration-200 pb-1 border-b-2 ${
                    isActive(link.href)
                      ? "text-primary border-primary font-bold"
                      : " border-transparent hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
          {/* right-side buttons and icons  */}
          <div className="flex items-center gap-3">
            {pathname === "/" && (
              <Button
                className="hidden lg:flex gap-2 px-7 py-5 rounded-full bg-[#fff0ee] border border-[#e0bebb]"
                variant={"outline"}
                size={"lg"}
              >
                <MapPin style={{ width: "1.25rem", height: "1.25rem" }} />
                <span className="font-semibold">Kathmandu</span>
              </Button>
            )}
            {loading ? (
              // Skeleton while checking auth — prevents flash of wrong state
              <div className="w-9 h-9 rounded-full bg-slate-100 animate-pulse" />
            ) : user ? (
              <UserIConCom onClick={handleLogout} />
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant={"outline"}>Login</Button>
                </Link>
                <Link href="/signUp">
                  <Button variant={"default"}>Sign Up</Button>
                </Link>
              </div>
            )}

            <Button variant={"ghost"} aria-label="Cart">
              <ShoppingCart
                className="stroke-[#4b5563]"
                style={{ height: "1.5rem", width: "1.5rem" }}
              />
            </Button>

            <SearchDialog
              value={searchQuery}
              results={results}
              loading={Loading}
              onChange={setSearchQuery}
              placeholder="Search products..."
            />

            {/* <Button variant={"ghost"} aria-label="Profile">
              <User
              onClick={}
                className="stroke-[#4b5563]"
                style={{ height: "1.5rem", width: "1.5rem" }}
              />
            </Button> */}
          </div>
        </div>
      </div>
    </nav>
  );
}

// /product/electronics/apex-4k-projector
// pathname.split("/")
// ["", "product", "electronics", "apex-4k-projector"]
