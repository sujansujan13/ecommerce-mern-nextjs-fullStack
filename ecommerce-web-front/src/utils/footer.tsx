import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <section className=" bg-[#f9fafb]  ">
      <div className="common-box md:px-8 border-b border-t py-16 ">
        <div className="md:flex items-start justify-between md:gap-3 lg:gap-2 md:text-[12px]">
          {/* title and sub */}
          <div className="md:w-37 lg:w-70 space-y-2">
            <header className="text-[19px] md:text-[16px] font-black tracking-wide">
              Himalayan Market
            </header>
            <p className="text-sm py-6 md:py-0">
              Nepal's premier digital marketplace connecting local traditions
              with modern convenience.
            </p>
          </div>
          {/* links */}
          <div className="flex flex-col gap-y-2 py-4 md:py-0 ">
            <h1 className="text-lg font-semibold md:text-[16px]">
              Quick Links
            </h1>
            <div className="flex flex-col gap-y-0.5 md:gap-y-2 text-sm">
              <Link href={"#"}>
                <h5>About Us</h5>
              </Link>
              <Link href={"#"}>
                <h5>Delivery Info </h5>
              </Link>
              <Link href={"#"}>
                <h5>Return Policy</h5>
              </Link>
              <Link href={"#"}>
                <h5>Seller Center</h5>
              </Link>
            </div>
          </div>
          {/* customer support */}
          <div className=" space-y-2 py-4 md:py-0 ">
            <h1 className="text-lg font-semibold md:text-[16px]">
              Customer Support
            </h1>
            <div className=" flex flex-col  md:gap-y-2 text-sm space-y-1">
              <Link href={"#"}>
                <h5>Help Center</h5>
              </Link>
              <Link href={"#"}>
                <h5>Contact Us </h5>
              </Link>
              <Link href={"#"}>
                <h5>Privacy Policy</h5>
              </Link>
            </div>
          </div>
          {/* secure payments */}
          <div className="flex flex-col gap-y-2 py-4 md:py-0">
            <h1 className="text-lg font-semibold md:text-[16px]">
              Secure Payments
            </h1>
            <div className="flex items-center gap-2 text-gray-600 md:w-40 md:flex-wrap">
              <Button variant={"outline"} size={"sm"}>
                eSewa
              </Button>
              <Button variant={"outline"} size={"sm"}>
                Khalti
              </Button>
              <Button variant={"outline"} size={"sm"}>
                VISA
              </Button>
              <Button variant={"outline"} size={"sm"}>
                COD
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* copywright-bar */}
      <div className="text-center py-6  text-gray-600">
        <span className="text-xs">
          © 2024 Himalayan Market. Secure Payments via eSewa, Khalti, and COD.
        </span>
      </div>
    </section>
  );
}
