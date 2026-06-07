"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProductType } from "@/Types/ProductType";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function RelatedCard({ related }: { related: ProductType }) {
  const [liked, setLiked] = useState(false);

  const productLink = `/product/${related.category}/${related.slug}`;
  return (
    // #IMP#-> shrink-0
    <Card className="w-70  gap-0 flex flex-col justify-between overflow-hidden border border-[#e0bebb] rounded-2xl  group shrink-0 hover:shadow-lg transition-shadow">
      <div className="w-full h-48 relative  overflow-hidden">
        {/* // Define your dynamic route slug path pathing rules safely */}
        <Link href={productLink} className="w-full h-full cursor-pointer block">
          <Image
            src={related?.images?.[0] as string}
            alt={related.name}
            fill
            sizes="(max-width: 768px) 100vw, 280px"
            className="object-cover overflow-hidden group-hover:scale-110 active:scale-95 duration-300 transition-transform will-change-transform "
          />
        </Link>
        <Button
          type="button"
          aria-label="Add to wishlist"
          variant={"secondary"}
          onClick={() => setLiked(!liked)}
          className={`absolute right-5 top-3 z-10 `}
        >
          <Heart className={`${liked ? "fill-red-500 text-red-500" : ""}`} />
        </Button>
      </div>
      {/* text-container */}
      <Link href={productLink} className="flex-1 cursor-pointer">
        <CardContent className="p-5">
          <h3 className="font-manrope font-bold text-lg line-clamp-1 ">
            {related.name}
          </h3>
          <p className="text-[16px] font-bold">NPR {related.price}</p>
        </CardContent>
      </Link>
    </Card>
  );
}
