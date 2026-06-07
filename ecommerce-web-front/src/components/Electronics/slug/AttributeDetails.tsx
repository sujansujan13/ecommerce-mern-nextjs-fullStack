// Inside your AttributeDetails.tsx file
import { ProductAttribute } from "../../../Types/ProductType"; // or your types path

interface AttributeDetailsProps {
  attr: ProductAttribute; // Expect a single object, NOT an array!
}

export default function AttributeDetails({ attr }: AttributeDetailsProps) {
  return (
    <div className="flex justify-between py-2 text-sm  border-b border-[#f6e1df]">
      <span className="text-[#5b4441] font-medium ">{attr.name}</span>
      <span className="  text-sm  font-bold text-[#251817]">{attr.value}</span>
    </div>
  );
}
