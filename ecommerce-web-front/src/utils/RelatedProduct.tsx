import React from "react";
import { ProductType } from "../Types/ProductType";
import RelatedCard from "./RelatedCard";

export default function RelatedProduct({
  related,
}: {
  related: ProductType[];
}) {
  console.log(related);
  return (
    <div className="max-w-7xl space-y-6">
      <h1 className="font-manrope text-2xl font-extrabold">Related For You</h1>
      <div className="w-full flex flex-row items-center pb-5 gap-4 shrink-0 overflow-x-auto">
        {related.map((item) => {
          return <RelatedCard key={item._id} related={item} />;
        })}
      </div>
    </div>
  );
}
