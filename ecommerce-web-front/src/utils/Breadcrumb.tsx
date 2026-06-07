// #CURIOUS#
"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function BreadCrumb() {
  const pathname = usePathname();
  // DIFFICULT
  // split path into segments and remove empty strings
  // Example : "/electronics/laptops" -> ["electronics","laptops"]
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");
  return (
    <Breadcrumb className="cursor-pointer">
      <BreadcrumbList>
        {/* always show home first  */}
        {/* 1. FIXED HOME: No nested Link, no h1 */}
        <BreadcrumbItem>
          <BreadcrumbLink
            render={(props) => (
              <Link
                href={"/"}
                {...props}
                className="text-[#8d706d] text-sm font-bold"
              >
                Home
              </Link>
            )}
          />
        </BreadcrumbItem>

        {/* only show the separator if there is something in the url segments at all */}
        {pathname.length > 0 && (
          <BreadcrumbSeparator className="text-[#8d706d]" />
        )}
        {/* 2. Map through each segment to build the path */}
        {pathSegments.map((segment, index) => {
          // #CURIOUS#
          // Build the URL for this specific segment
          // index 0 -> "/electronics", index 1 -> "/electronics/smartphones"
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const isLast = index === pathSegments.length - 1;
          // 3. Format the text (capitalize and replace hyphens)
          // #CURIOUS#
          // 1. Split the slug by hyphens into an array: ["smart", "air", "fryer"]
          // 2. Loop through each word and capitalize its first letter
          // 3. Join them back together with clean spaces
          const title = segment
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
          // #curious : why href instead index
          return (
            <React.Fragment key={href}>
              <BreadcrumbItem>
                {isLast ? (
                  // active page styling
                  <BreadcrumbPage className="text-[#680006] text-sm font-bold">
                    {title}
                  </BreadcrumbPage>
                ) : (
                  // non-active page styling
                  // 2. FIXED SEGMENTS: Use the same 'render' pattern to avoid double <a> tags
                  <BreadcrumbLink
                    render={(props) => (
                      <Link
                        href={href}
                        {...props}
                        className="text-[#8d706d] text-[16px] font-medium"
                      >
                        {title}
                      </Link>
                    )}
                  />
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator className="text-[#8d706d]" />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
