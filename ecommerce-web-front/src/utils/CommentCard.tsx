import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Exo_2 } from "next/font/google";
import React from "react";

interface commentProps {
  _id: string;
  productId: string;
  userName: string;
  rating: number;
  text: string;
  createdAt: string;
  Location?: string;
}
export default function CommentCard({ review }: { review: commentProps }) {
  // Generate user initials for the Avatar placeholder (e.g., "Aayush Shrestha" -> "AS")
  const intials = review.userName
    .trim()
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase()
    .slice(0, 2); // Safety buffer: grab maximum 2 letters (e.g., "Siddharth UST" -> "SU")

  // Simple relative time calculator to show "Published 2 days ago" or similar
  const getRelativeTime = (isoString: string) => {
    const now = new Date();
    const created = new Date(isoString);
    const diffTime = Math.abs(now.getTime() - created.getTime());

    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30);
    const diffYear = Math.floor(diffDays / 365);

    if (diffDays <= 1) return "Published Today";
    if (diffDays < 30) return `Published ${diffDays} days ago`;
    if (diffMonths < 12) return `Published ${diffMonths} months ago`;

    return `Published ${diffYear} years ago`;
  };
  return (
    <Card className="p-7 rounded-3xl border border-[#ead5d2] bg-white">
      <CardContent className="p-0 space-y-4">
        {/* top avatar and all */}
        <div className="flex items-center justify-between">
          {/* avatar and user */}
          <div className="flex items-center gap-4">
            <Avatar className="size-13 border-2 border-[#fff8f7]">
              <AvatarFallback className="font-bold text-lg text-amber-800">
                {intials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="text-sm font-bold text-black">
                {review.userName}
              </h4>
              <span className="text-xs font-normal text-gray-800">
                {review.Location ?? "Verified Buyer"}
              </span>
            </div>
          </div>
          {/* rating-star */}
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((starCount) => {
              // creating boolean expression to determine
              // whether current star should appear filled
              // based on review rating
              const isFilled = starCount <= review.rating;
              return (
                <Star
                  key={starCount}
                  size={13}
                  className={`${isFilled ? "fill-amber-800 stroke-amber-800" : "fill-[#FFDAD6] stroke-amber-800"}`}
                />
              );
            })}
          </div>
        </div>
        {/* review-content */}
        <div className="italic text-sm font-medium">"{review.text}"</div>
        {/* published-date */}
        <div className="text-[11px] text-amber-900">
          {getRelativeTime(review.createdAt)}
        </div>
      </CardContent>
    </Card>
  );
}

//
// #ERROR# -> the initials didn't work as expected
// Because you passed an empty string "" into .split(), JavaScript broke "Aayush Shrestha" into an array of individual letters: ['A', 'a', 'y', 'u', 's', 'h', ' ', 'S', ...]. When you mapped over it and grabbed name[0], you just got all those letters back, resulting in the giant text blowout we see in the UI.
// #SOLUTION#
// To split a name into separate words, you must add a space inside the quotes: .split(" ").

//
// #REMEMBER#
// 🔥 Important React concept
// {} is ONLY for entering JavaScript inside JSX
// means:
{
  /* <h1>{review.rating}</h1> */
}
// “insert JS value into JSX”
//
// const isFilled = starCount <= {review.rating}
// you are already INSIDE JavaScript.
// So extra {} makes no sense.

//
// #TODOLATER#: clamping the size of comment-text and adding ...readmore and clicking it expand the whole comment
