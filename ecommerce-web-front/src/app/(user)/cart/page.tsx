"use client";
import CartItemRow from "@/components/Cart/CartItemRow";
import OrderSummary from "@/components/Cart/OrderSummary";
import { useCart } from "../../../context/cartContext";

import { Award, Loader2, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { cartItems, isLoading } = useCart();

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-[#801818]" />
        <p className="text-sm font-medium text-stone-500">
          Loading your Himalayan items...
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#fff8f7] common-box py-5 md:py-10">
      {/* Page Heading */}
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold font-manrope text-stone-900 flex items-baseline gap-2">
          Your Cart
          <span className="text-lg font-normal font-manrope  text-[#59413e]">
            (3 items)
          </span>
        </h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="border border-dashed border-[#e0bebb] rounded-2xl p-12 text-center bg-white space-y-4">
          <div className="p-4 bg-[#fff0ee] rounded-full w-fit mx-auto text-[#801818]">
            <ShoppingBag className="h-8 w-8" />
          </div>
          <p className="text-stone-600 font-medium">Your cart is empty.</p>
        </div>
      ) : (
        // (  {/* Main Multi-Column Viewport Wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Left Side: Items & Perks */}
          <div className="lg:col-span-2 space-y-4">
            <div className="space-y-3">
              {cartItems.map((item) => (
                <CartItemRow key={item._id} item={item} />
              ))}
            </div>

            {/* Himalayan Loyalty Perks Widget */}
            <div className="bg-[#801818] text-white rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shadow-inner">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-white/10 rounded-xl">
                  <Award className="h-5 w-5 text-amber-400" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Himalayan Rewards</p>
                  <p className="text-xs text-stone-200">
                    You are earning 184 points with this order.
                  </p>
                </div>
              </div>
              <button className="bg-white text-[#801818] hover:bg-stone-50 transition-all font-semibold text-xs px-4 py-2 rounded-xl self-end sm:self-auto shadow-sm">
                View Loyalty Perks
              </button>
            </div>
          </div>

          {/* Right Side: Order Summary sticky sidecar */}
          <div className="lg:col-span-1 lg:sticky lg:top-6">
            <OrderSummary />
          </div>
        </div>
      )}
    </main>
  );
}
