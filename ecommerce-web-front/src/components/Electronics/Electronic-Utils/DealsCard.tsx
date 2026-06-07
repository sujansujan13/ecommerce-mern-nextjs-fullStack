import Image from "next/image";
import React from "react";

type DealsProps = {
  header: string;
  image: string;
  para: string;
};
export default function DealsCard({ Deals }: { Deals: DealsProps[] }) {
  return (
    // #REMINdER#:always use grid as possible
    <div className=" grid grid-cols-1 md:grid-cols-3 gap-3.5 overflow-hidden">
      {Deals.map((deal, index) => (
        <div
          key={index}
          className="relative h-40 overflow-hidden group rounded-2xl "
        >
          {/* GRADIENT FIX: Added inset-0 and z-10 */}
          <div className="absolute inset-0 bg-linear-to-t from-red-600/30 via-red-600/20 to-transparent z-10 rounded-2xl" />
          <Image
            src={deal.image}
            alt="Deals-Card"
            fill
            className="object-cover transition-transform duration-300 ease-in-out z-0 group-hover:scale-105 rounded-2xl"
          />

          <div className="absolute bottom-5 left-5 z-20 text-white ">
            <h1 className="text-[16px] font-medium">{deal.header}</h1>
            <h3 className="text-sm  ">{deal.para}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}
