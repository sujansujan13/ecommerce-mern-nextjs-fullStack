"use client";
import { Button } from "@/components/ui/button";
import {
  CircuitBoard,
  Home,
  House,
  ShoppingBag,
  ShoppingBasket,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

// 1. Map the string names from your array to actual Lucide component references
const iconMap: Record<
  string,
  React.ComponentType<{
    className?: string;
    size?: number;
    width?: number;
    height?: number;
    style?: React.CSSProperties;
  }>
> = {
  // You must use quotes for object keys containing special characters like hyphens to prevent JavaScript from misinterpreting them, whereas single-word keys can be written without quotes.
  house: House,
  "circuit-board": CircuitBoard,
  handbag: ShoppingBag,
  "shopping-basket": ShoppingBasket,
};

export default function MobileNar() {
  // It reads the current URL of the page in the browser and returns its path as a string.
  const pathname = usePathname();

  //  States to control whether the bar is visible and to track scroll position
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = React.useRef(0);

  // Effect hook to monitor scrolling behavior
  useEffect(() => {
    const handleScroll = () => {
      // window.scrollY gets the number of pixels the user has scrolled from the top of the page vertically
      const currentScrollY = window.scrollY;

      // Keep the nav visible when at the very top of the screen
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY - lastScrollYRef.current > 5) {
        // Hide when the user scrolls down
        setIsVisible(false);
      } else if (lastScrollYRef.current - currentScrollY > 5) {
        // Show when the user scrolls up
        setIsVisible(true);
      }
      // Show when the user scrolls up

      // Update the previous scroll position
      lastScrollYRef.current = currentScrollY;
    };

    // Attach event listener when the component mounts
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Clean up event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // array of object of the links to be mapped
  const navlinks = [
    { label: "Home", href: "/", iconName: "house" },
    { label: "Electronics", href: "/electronics", iconName: "circuit-board" },
    { label: "Fashion", href: "/fashion", iconName: "handbag" },
    { label: "Groceries", href: "/groceries", iconName: "shopping-basket" },
  ];
  return (
    //  Added transition and translate classes to animate the hiding/showing effect
    <nav
      className={`block md:hidden   fixed bottom-0 left-0 right-0 bg-background mobile-nav-container transition-transform duration-300  ${isVisible ? "translate-y-0" : "translate-y-full"} `}
    >
      <div className="common-box px-4 border-t rounded-t-xl ">
        <div className="flex  items-center gap-2 justify-between w-full h-20   ">
          {navlinks.map((link, index) => {
            {
              /* storing icons in an array */
            }
            // Specify that the string must be one of the keys of the object
            // const Icon = iconMap[iconName as keyof typeof iconMap];
            const Icons = iconMap[link.iconName] || House;
            // accessing pathname string and assigning the current pathname
            const isAlive = pathname === link.href;

            return (
              <Link key={link.href} href={link.href}>
                <div
                  className={`py-4 px-1 rounded-2xl ${isAlive ? "bg-red-100" : ""}`}
                >
                  <Button className={`flex flex-col `} variant={"ghost"}>
                    <Icons
                      style={{ width: "20px", height: "20px" }}
                      className={`stroke-[2.5] text-muted-foreground ${isAlive ? "text-red-900" : ""}`}
                    />
                    <span
                      className={`uppercase text-xs font-bold ${
                        isAlive ? "text-red-900" : "text-muted-foreground"
                      }`}
                    >
                      {link.label}
                    </span>
                  </Button>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

// 1. Record<K, T>
// The Record utility is a built-in TypeScript feature used to create an object type with specific keys (K) and values (T).

// In your example, K is string (meaning the property names/keys of the object are text, like "house" or "circuit-board").

// 2. React.ComponentType<P>
// This represents any valid React component (either a functional component or a class component) that accepts a specific set of properties (P).

// 3. { className?: string }
// This is the property type (the P in ComponentType).

// It defines an object with an optional className string.

// The ? means the component can be rendered without a className prop, but if one is provided, it must be a string.
