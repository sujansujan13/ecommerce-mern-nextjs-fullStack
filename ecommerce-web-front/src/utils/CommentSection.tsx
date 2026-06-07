import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import { ElectronicComments } from "../Data/ElectronicComments";
import React, { useState } from "react";
import CommentCard from "./CommentCard";
import { ProductType } from "../Types/ProductType";

export default function CommentSection({ product }: { product: ProductType }) {
  // Track permanent selection and temporary hover state
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  // filtering the comments of the corresponding product
  // you use {} , never forget return
  const dynamicComment = ElectronicComments.filter((comment) => {
    return comment.productId === product._id;
  });
  console.log(dynamicComment);
  console.log(ElectronicComments);
  console.log(product);
  return (
    <div className="space-y-4">
      {/* headings */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-manrope text-2xl text-[#251817] font-extrabold ">
            Customer Reviews
          </h1>
          <p className="text-sm text-[#3b130e] font-medium max-w-40">
            Verified buyers sharing their journey.
          </p>
        </div>
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="text-lg font-bold text-[#3b130e] p-4 size-24 md:size-0 md:px-22 md:py-4"
              >
                Write a <br className="md:hidden" />
                Review
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm md:max-w-lg p-8   bg-[#fff8f7]">
              <form
                action=""
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log("submiited");
                }}
                className="space-y-5"
              >
                <DialogHeader>
                  <DialogTitle className="text-2xl font-manrope font-bold text-[#251817]">
                    Write a Review
                  </DialogTitle>
                  <DialogDescription className="text-sm font-normal text-[#59413e] ">
                    Share your experience with other customers
                  </DialogDescription>
                </DialogHeader>
                {/* rating part  */}
                <div className="space-y-2">
                  <Label className="text-sm font-manrope font-bold text-[#59413e]">
                    Overall Rating
                  </Label>
                  {/* star-part */}
                  {/* #DIFFICULT# */}
                  <div className="flex items-center gap-1.5">
                    {/* starValue is simply a loop variable representing the number/position of the current star being rendered (from 1 to 5). */}
                    {[1, 2, 3, 4, 5].map((starValue) => {
                      // Determine if this specific star should be colored/filled
                      // variable declaration with a boolean expression.
                      const isFilled = starValue <= (hoverRating || rating);
                      return (
                        <button
                          key={starValue}
                          type="button"
                          onClick={() => setRating(starValue)}
                          onMouseEnter={() => setHoverRating(starValue)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="transition-transform active:scale-95 focus:outline-none"
                        >
                          <Star
                            size={28}
                            strokeWidth={2.5}
                            className={`transition-colors duration-150 ${isFilled ? "fill-[#680007] stroke-[#680007]" : "fill-[#fff8f7] stroke-[#e0bebb]"}`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
                <Field>
                  <Label
                    className="text-sm font-manrope font-bold text-[#59413e]"
                    htmlFor="comment"
                  >
                    Your Thoughts:
                  </Label>
                  <Input
                    className="rounded-sm py-6 px-2 text-[16px] placeholder:text-[16px] placeholder:text-[#b29e9c] border-[#edd6d3] bg-white focus-visible:ring-[#680007]"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    id="comment"
                    placeholder="Share your experience "
                  />
                </Field>
                <div className="flex flex-col md:flex-row items-center  gap-2 s">
                  <Button
                    type="submit"
                    className="w-full md:w-1/2 p-7 text-[16px] bg-[#680007] font-bold"
                  >
                    Submit Review
                  </Button>
                  <Button
                    type="button"
                    className="w-full md:w-1/2 p-7 text-[16px] bg-[#fce3e0] text-[#59413e] font-bold"
                    onClick={() => {
                      setRating(0);
                      setHoverRating(0);
                      setComment("");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      {/* comment-card */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        {/* SLICE is used to load only 3 comments */}
        {dynamicComment.slice(0, 2).map((comment) => {
          return <CommentCard key={comment._id} review={comment} />;
        })}
      </div>
    </div>
  );
}

// #CURIOSITY#: how to make the bg more blur
//
// #TODO#: load only two comments at a time and there is a button "load more" which loads other two
