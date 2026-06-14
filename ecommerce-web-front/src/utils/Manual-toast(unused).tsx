import { useCart } from "@/context/cartContext";
import React, { useRef, useState } from "react";

export default function Toast() {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  // 💡 Manual Toast States
  const [showToast, setShowToast] = useState(false);
  // 1. Create a ref to store the timeout ID
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 💡 #OPTIMIZATION#: Accept the React Mouse Event to stop event bubbling
  const handleAdd = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setIsAdding(true);
      await addToCart(product._id, 1);

      // 2. Clear any existing timer from a previous click
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      setShowToast(true);

      // 3. Save the new timeout ID to the ref
      timerRef.current = setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } finally {
      setIsAdding(false);
    }
  };

  // 4. Clean up the timer if the component unmounts mid-timer
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div>
      {/* 💡 Manual Toast Component Element placed at the bottom of the card tree */}
      {showToast && (
        <div className="fixed top-5 right-5 z-50 bg-stone-900 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-lg border border-stone-800 flex items-center gap-2 transition-all animate-in fade-in slide-in-from-top-10 duration-300">
          <span className="text-emerald-400">✓</span>
          {product.name} added to cart!
        </div>
      )}
    </div>
  );
}
