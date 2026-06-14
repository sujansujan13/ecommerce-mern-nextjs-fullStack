import { useCart } from "@/context/cartContext";
import { useState } from "react";
import { toast } from "sonner";
import { ProductType } from "../Types/ProductType";

// 🚀 Custom hook to reuse cart logic across all card styles
export function useAddToCart(product: ProductType) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (isAdding) return;

    try {
      setIsAdding(true);

      const addToCartAction = async () => {
        return await addToCart(product._id, 1);
      };

      toast.promise(addToCartAction(), {
        loading: `Adding ${product.name} to cart...`,
        success: "Added to cart successfully!",
        error: "Could not add item.",
      });
    } finally {
      setIsAdding(false);
    }
  };

  return { handleAdd, isAdding };
}
