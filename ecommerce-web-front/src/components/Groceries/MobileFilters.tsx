import React from "react";
import { Card, CardContent } from "../ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Button } from "../ui/button";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import GroceryLeftBar from "./GroceryLeftBar";

export default function MobileFilters() {
  return (
    <Card className="mx-auto w-full max-w-x-2xl  py-4 rounded-xl border border-[#e7dfdf] ">
      <CardContent>
        <Collapsible>
          <CollapsibleTrigger className="w-full" asChild>
            <div className="flex items-center justify-between group w-full">
              <div className="flex items-center gap-2">
                <SlidersHorizontal
                  size={15}
                  strokeWidth={3}
                  className="ml-auto group-data-[state=open]:rotate-180"
                />
                <span className="text-[16px] font-extrabold">Filters</span>
              </div>
              <ChevronDown size={20} strokeWidth={3} />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="py-5">
            <GroceryLeftBar />
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
