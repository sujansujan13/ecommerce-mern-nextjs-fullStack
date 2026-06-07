"use client";
import Image from "next/image";
import React, { useState } from "react";
import { ProductType } from "../../../Types/ProductType";
import { Button } from "@/components/ui/button";
import { BadgeCheck, Cpu, Heart, ShoppingCart } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Rating from "../../../utils/Rating";
import AttributeDetails from "./AttributeDetails";
import CommentSection from "@/utils/CommentSection";
import RelatedProduct from "@/utils/RelatedProduct";

export default function ProductClient({
  product,
  relatedProduct,
}: {
  product: ProductType;
  relatedProduct: ProductType[];
}) {
  const [selected, setSelected] = useState(
    (product?.images?.[0] as string) || "",
  );
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="space-y-4">
      <div className="space-y-4 lg:flex lg:gap-10 lg:items-start ">
        <div className="flex flex-col gap-2.5 md:flex-row lg:w-1/2">
          {/* Thumbnails */}
          <div className="relative order-2 md:order-1 md:w-24 pr-10 md:px-0">
            <Carousel
              opts={{ align: "start", loop: true }}
              orientation="horizontal"
              className="md:hidden"
            >
              <CarouselContent className="-ml-2">
                {product?.images?.map((img, index) => (
                  <CarouselItem key={index} className="pl-2 basis-1/4 shrink-0">
                    <div
                      onClick={() => setSelected(img)}
                      className={`relative h-20 overflow-hidden rounded-xl border-2 cursor-pointer ${
                        img === selected
                          ? "border-red-500"
                          : "border-transparent"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious className="ml-7" />
              <CarouselNext className="mr-7" />
            </Carousel>

            {/* Desktop Vertical Carousel */}
            <Carousel
              opts={{ align: "start", loop: true }}
              orientation="vertical"
              className="hidden h-125   md:block"
            >
              <CarouselContent className="flex flex-col gap-1  h-125">
                {product?.images?.map((img, index) => (
                  <CarouselItem
                    key={index}
                    className="pt-2  md:basis-auto shrink-0"
                  >
                    <div
                      onMouseEnter={() => setSelected(img)}
                      onClick={() => setSelected(img)}
                      className={`relative h-24 overflow-hidden rounded-xl border-2 cursor-pointer transition-all ${
                        img === selected
                          ? "border-red-500"
                          : "border-transparent"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious className="absolute left-1/2 -top-2 -translate-x-1/2 rotate-90" />

              <CarouselNext className="absolute bottom-2 left-1/2 -translate-x-1/2 rotate-90 " />
            </Carousel>
          </div>

          {/* Hero Image */}
          <div className="relative order-1 aspect-square overflow-hidden rounded-2xl md:order-2 min-w-0 md:flex-1 lg:w-1/2 lg:aspect-video">
            <Image
              src={selected}
              alt={product.name}
              fill
              className="object-cover transition-all duration-300"
            />

            <Button
              variant="secondary"
              type="button"
              size="lg"
              className="absolute right-3 top-3 rounded-full"
            >
              <Heart style={{ height: 20, width: 20 }} strokeWidth={2.5} />
            </Button>
          </div>
        </div>
        <div className="lg:w-1/2 space-y-6 ">
          <div className="space-y-1">
            {/* badge */}
            {product.badge ? (
              <div className="bg-[#ffdad6] w-fit px-2 py-1 text-xs font-bold rounded-2xl">
                {product.badge}
              </div>
            ) : (
              ""
            )}
            {/* name */}
            <h1 className="text-3xl font-manrope font-black">{product.name}</h1>
            {/* brand */}
            <h2 className="text-sm font-bold tracking-wider">
              By <span className="text-[#006399] ">{product.brand}</span>
            </h2>
          </div>
          {/* rating and reviewsCount */}
          <div>
            <Rating
              value={product.rating as number}
              text={`(${product.reviewsCount} reviews)`}
              starSize={20}
              starClassname="fill-amber-600 stroke-amber-400"
            />
          </div>
          {/* prices */}
          <div className="space-y-1 ">
            <div className="flex items-center gap-1.5 text-3xl font-extrabold">
              <span>{product.currency}</span>
              <span>{product.price}</span>
              <span className="line-through">{product.oldPrice}</span>
            </div>
            <p className="text-xs font-medium">
              Inclusive of all local taxes & shipping from Kathmandu HQ.
            </p>
          </div>
          {/* description  */}
          <p className="text-[16px] font-medium text-gray-700 leading-relaxed">
            {product.description}
          </p>

          {/* quantity */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-sm font-bold">Quantity</h1>
              <div className="flex items-center gap-2 border-2 w-fit rounded-lg">
                <Button
                  onClick={() => setQuantity(quantity - 1)}
                  variant={"ghost"}
                  disabled={quantity === 1}
                >
                  -
                </Button>
                <span>{quantity}</span>
                <Button
                  onClick={() => setQuantity(quantity + 1)}
                  variant={"ghost"}
                >
                  +
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <BadgeCheck size={16} strokeWidth={2.5} />
              <span className="text-sm font-bold"> {product.warranty}</span>
            </div>
          </div>
          {/* cart and buy button */}
          <div className="flex flex-col gap-3 ">
            <Button
              variant={"outline"}
              className="py-6 rounded-xl font-bold flex items-center gap-2 cursor-pointer bg-[#fff8f7] shadow-2xl hover:bg-red-500  transition-colors duration-300 border-2 border-red-700 text-red-700 tracking-wider group "
            >
              <ShoppingCart className="stroke-3 stroke-red-700 group-hover:stroke-white" />
              <span className="text-[16px] text-red-700 group-hover:text-white  tracking-wide   ">
                Add to Cart
              </span>
            </Button>
            <Button
              variant={"outline"}
              className="py-6 rounded-xl font-extrabold flex items-center gap-2 border-2 border-blue-700 text-blue-700 tracking-wider cursor-pointer bg-[#fff8f7] hover:bg-blue-200 "
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>
      {/* attributes */}
      <div className="border border-[#e0bebb] shadow-lg px-5 py-7 bg-[#fff0ee] rounded-3xl space-y-4">
        <div className="flex items-center gap-2 ">
          <Cpu size={20} strokeWidth={2.5} />
          <h1 className=" w-full text-[#251817] text-xl font-bold ">
            Technical Specifications
          </h1>
        </div>
        {product.attributes?.map((SingleAttr) => {
          return (
            <div key={SingleAttr.key}>
              <AttributeDetails attr={SingleAttr} />
            </div>
          );
        })}
      </div>
      {/* Comment-section */}
      <div className="mt-10">
        <CommentSection product={product} />
      </div>
      {/* Related-product-part */}
      <div className="mt-10">
        <RelatedProduct related={relatedProduct} />
      </div>
    </div>
  );
}
