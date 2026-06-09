import React from "react";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import Image from "next/image";
import { Button } from "../components/ui/button";
import { Heart, ShoppingBag, ShoppingCart, Star } from "lucide-react";
import Rating from "@/utils/Rating";
// product-type
import { ProductType } from "../Types/ProductType";

// #MASTERSTROKE#: Never use fixed width and height for cards. Always let the content decide the height and width. This ensures your design is responsive and works on all screen sizes. Use padding and margins to create space instead of fixed dimensions.
type CardProps = {
  // Use a union type for variant to make it more restrictive/safe
  variant: "trending" | "category" | "fashion" | "groceries";
  // nested type: This uses the productprops definition above
  product: ProductType;
};
("");
export default function ProductCard({ variant, product }: CardProps) {
  if (variant === "trending") {
    return <TrendingStyle product={product} />;
  } else if (variant === "category") {
    return <ElectronicsStyle product={product} />;
  } else if (variant === "groceries") {
    return <GroceriesStyle product={product} />;
  } else {
    return <FashionStyle product={product} />;
  }
}

function TrendingStyle({ product }: { product: ProductType }) {
  return (
    <Card className="overflow-hidden border-none outline-none w-full p-4.5 lg:p-4 rounded-2xl bg-background">
      {/* here goes image and love icon */}
      <CardContent className="relative aspect-square    ">
        <Image
          src={product.images?.[0] as string}
          alt={product.name}
          fill
          className="object-cover rounded-xl"
        />
        <div className="absolute  h-full rounded-2xl inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
        {/* favoutite button */}
        <Button
          variant={"secondary"}
          size={"icon-lg"}
          className={`absolute top-3 right-3 rounded-full `}
        >
          <Heart className="text-primary" />
        </Button>
      </CardContent>
      <div className="flex flex-col items-start w-full space-y-0.5  ">
        <div className="space-y-2">
          <div>
            <h3 className="uppercase text-blue-800 font-medium xl:text-[12px]">
              {product.category}
            </h3>
          </div>
          {/* Line clamp ensures the text never pushes the card height too far */}
          <div className="h-4">
            {/* Fixed height for 1 line of text */}
            <h2 className="text-lg font-normal  line-clamp-1 leading-tight xl:text-[16px]">
              {product.name}
            </h2>
          </div>
          <div className="flex items-center gap-1 ">
            <h1 className="text-[20px] text-red-900 xl:text-[16px] font-medium">
              NPR {product.price.toLocaleString()}
            </h1>
            {product.oldPrice && (
              <h3 className="line-through text-xs ">
                NPR{product.oldPrice.toLocaleString()}
              </h3>
            )}
          </div>
        </div>
        <Button
          variant={"destructive"}
          className={`w-full rounded-lg py-5 bg-red-900 text-white text-lg xl:text-sm xl:font-semibold`}
        >
          Add to Cart
        </Button>
      </div>
    </Card>
  );
}

function ElectronicsStyle({ product }: { product: ProductType }) {
  return (
    /* 
       IMPROVEMENT: Removed fixed widths (lg:w-54). 
       The card should be controlled by the parent grid for better responsiveness.
       Added 'group' to allow styling child elements when hovering the whole card.
    */
    <Card className="group overflow-hidden border-none shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl w-full bg-white">
      {/* here goes image and love icon */}
      <CardContent className={`relative  aspect-square p-0 overflow-hidden `}>
        <Image
          src={product?.images?.[0] as string}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105 "
        />
        <div className="absolute  h-full  inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
        {/* featured button */}
        {product.isFeatured && (
          <Button
            variant={"secondary"}
            size={"sm"}
            className={`absolute top-3 left-3 text-[10px] bg-[#680007] text-white `}
          >
            <h3 className="uppercase ">Featured</h3>
          </Button>
        )}
        {/* favoutite button */}
        {product.badge && (
          <Button
            size={"sm"}
            className={` absolute top-3 right-3 text-[10px] bg-blue-400 text-white `}
          >
            {product.badge}
          </Button>
        )}
      </CardContent>
      <div className="flex flex-col items-start w-full  px-4 pb-2    ">
        <div className="w-full space-y-3">
          <div>
            <h3 className=" text-[#8d706d]  text-xs">{product.category}</h3>
          </div>
          {/* Line clamp ensures the text never pushes the card height too far */}
          <div className="h-4">
            {/* Fixed height for 1 line of text */}
            <h2 className="text-[16px] font-normal  line-clamp-1 leading-tight xl:text-[16px]">
              {product.name}
            </h2>
          </div>
          {/* rating */}
          <div>
            <Rating
              value={product.rating as number}
              text={`${product.reviewsCount}`}
            />
          </div>
          <div className=" flex items-center justify-between ">
            <div className=" flex flex-col items-center justify-center flex-wrap">
              <h1 className="text-[16px] text-red-900  font-medium">
                {product.currency} {""}
                <span className="text-[18px]">
                  {product.price.toLocaleString()}
                </span>
              </h1>
              <div className="h-4">
                {" "}
                {/* Reserved space for the 'oldPrice' line */}
                {product.oldPrice ? (
                  <span className="line-through text-[11px] text-slate-400">
                    NPR {product.oldPrice.toLocaleString()}
                  </span>
                ) : (
                  <span className="block h-full" /> /* Invisible spacer */
                )}
              </div>
            </div>

            <Button
              variant={"destructive"}
              className={` rounded-full p-4 bg-red-900 text-white text-lg xl:text-sm xl:font-semibold`}
            >
              <ShoppingCart
                style={{ height: "20", width: "20" }}
                strokeWidth={3}
              />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

function FashionStyle({ product }: { product: ProductType }) {
  // if ((product.numReviews as string) > "1000") {
  //   product.numReviews : product.numReviews / "1000";
  // }
  return (
    <div>
      <Card className="rounded-sm hover:shadow-2xl">
        <CardContent className="relative group aspect-4/5 lg:aspect-5/6 p-0 overflow-hidden">
          <Image
            src={product.images?.[0] as string}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 tracking-normal duration-300 ease-in-out"
          />
          {/* heart-reaction */}
          <Button
            variant={"secondary"}
            className="absolute top-5 right-5 h-10 w-10 rounded-full "
          >
            <Heart strokeWidth={3} />
          </Button>
        </CardContent>
        <div className="px-5 pb-5 space-y-1">
          <h3 className="uppercase tracking-wider text-[#680006] text-[16px] font-medium">
            {product.subCategory}
          </h3>
          <header className="font-bold font-manrope text-[20px] line-clamp-1">
            {product.name}
          </header>
          {/* ratings */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star size={16} fill="gold" stroke="gold" />
              <h3 className="text-[16px] font-medium">{product.rating}</h3>
            </div>
            <h4 className="text-xs text-[#0c0c0c]">({product.reviewsCount})</h4>
          </div>
          {/* pricing */}
          <div className="flex items-center justify-between shrink-0 ">
            <div className="flex items-center gap-2 shrink-0">
              <h2 className="font-manrope text-[16px] text-[#680006]">
                {product.currency} {product.price.toLocaleString()}
              </h2>
              {product.oldPrice && (
                <h3 className="text-xs line-through text-gray-500">
                  {product.currency} {product.oldPrice.toLocaleString()}
                </h3>
              )}
            </div>
            {/* shopping-buuton */}
            <Button className="h-11.5 w-10  ">
              <ShoppingBag size={40} strokeWidth={3} />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

// Record is a generic utility type? built into TypeScript.
// It creates an object type with specific key types and value types.
// basically short-hand for ->
// const badgeColors: {
// [key: string]: string;
// }
// Keys WITH spaces MUST use quotes
const badgeStyle: Record<string, string> = {
  PREMIUM: "bg-[#006399]",
  "BEST SELLER": "bg-[#680006]",
};
function GroceriesStyle({ product }: { product: ProductType }) {
  return (
    // Because the Image itself is overflowing outside the rounded container. We need to make the parent container relative and set overflow-hidden to ensure the image is contained within the rounded corners.
    <div>
      <Card className="rounded-xl hover:shadow-2xl  flex flex-col overflow-hidden">
        <CardContent className="relative h-50.5 group overflow-hidden p-0">
          <Image
            src={product.images?.[0] as string}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300 "
          />
          {product.badge && (
            <Button
              className={`absolute inset-y-0 left-2 top-2 text-[9px] p-0 px-1.5 font-extrabold ${badgeStyle[product.badge] || "bg-gray-300 text-black"}`}
            >
              {product.badge}
            </Button>
          )}
        </CardContent>

        <div className="px-5 pb-4 space-y-3">
          {/* name */}
          <div className="flex items-center justify-between">
            <header className="font-manrope text-[16px] md:text-lg text-black font-extrabold shrink-0">
              {product.name}
            </header>
            <div className="flex items-center gap-1">
              <Star size={14} className="fill-amber-500 stroke-amber-200" />
              {/* rating */}
              <span className="text-xs font-bold">{product.rating}</span>
            </div>
          </div>
          {/* description */}
          <p className="text-[#5b4441] leading-4 text-xs md:text-sm font-medium tracking-wide line-clamp-3">
            {product.description}
          </p>
          {/* weight and price  */}
          <div>
            <span className="text-[10px] md:text-xs text-[#59413e] font-bold">
              {product.weight}
            </span>
            <h1 className="text-lg md:text-[20px] font-bold text-[#680007]">
              {product.currency} {product.price}
            </h1>
          </div>
          <div className="mt-auto">
            <Button className="w-full h-10.5 rounded-xl bg-[#680006] hover:bg-[#d03139] text-white flex items-center gap-2 cursor-pointer">
              <ShoppingCart strokeWidth={2.5} />
              <span className="text-sm md:text-[16px] font-bold">
                Add to Cart
              </span>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
