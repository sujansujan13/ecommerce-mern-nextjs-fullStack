import { Star, StarHalf } from "lucide-react";
import React from "react";

export default function Rating({
  value,
  text,
  starSize = 14, //default value
  starClassname = "fill-black stroke-black",
}: {
  value: number;
  text: string;
  starSize?: number;
  starClassname?: string;
}) {
  return (
    <div className="flex items-center gap-1 pt-1 ">
      {[1, 2, 3, 4, 5].map((index) => (
        <span key={index}>
          {value >= index ? (
            <Star size={starSize} className={starClassname} />
          ) : value >= index - 0.5 ? (
            <StarHalf size={starSize} className={starClassname} />
          ) : (
            <Star size={starSize} className={starClassname} />
          )}
        </span>
      ))}
      <div className="">
        {text && (
          <h3
            className="text-[10px] text-[#8d706d"
            title={text.toLocaleString()}
          >
            {text}
          </h3>
        )}
      </div>
    </div>
  );
}
