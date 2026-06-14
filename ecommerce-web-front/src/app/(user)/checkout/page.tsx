"use client";

import React, { useState } from "react";
import { useCart } from "@/context/cartContext";
import { Loader2, ShoppingBag, ArrowLeft } from "lucide-react";
import StepTracker from "@/components/Cart/StepTracker";
import CartItemRow from "@/components/Cart/CartItemRow(improved)";
import ShippingForm from "@/components/Checkout/ShippingForm";
import PaymentMethods, {
  PaymentGateway,
} from "@/components/Checkout/PaymentMethods";
import OrderSummaryCard from "@/components/Cart/OrderSummaryCard";

export default function CheckoutPage() {
  const { cartItems, isLoading } = useCart();

  // High-performance numerical step indices tracker state
  const [step, setStep] = useState<number>(1);

  // Shared structural address fields data object state
  const [shippingData, setShippingData] = useState({
    fullName: "",
    phoneNumber: "",
    district: "kathmandu",
    municipality: "",
    streetAddress: "",
  });

  // Chosen digital transaction gateway path tracker state
  const [paymentGateway, setPaymentGateway] = useState<PaymentGateway>("esewa");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Form field update handler
  const handleShippingChange = (fields: Partial<typeof shippingData>) => {
    setShippingData((prev) => ({ ...prev, ...fields }));
  };

  // Step progression route guard checks validation workflow
  const handleNavigationNext = async () => {
    if (step === 1) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (step === 2) {
      if (
        !shippingData.fullName ||
        !shippingData.phoneNumber ||
        !shippingData.streetAddress
      ) {
        alert(
          "Please completely fill out required shipping information elements before advancing.",
        );
        return;
      }
      setStep(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (step === 3) {
      // Step 3 execution handler: Dispatch final database parameters to backend controllers
      setIsSubmitting(true);
      try {
        console.log("Dispatching final transaction payload structure...", {
          orderItems: cartItems,
          shipping: shippingData,
          payment: paymentGateway,
        });

        // Simulated server execution pipeline
        await new Promise((resolve) => setTimeout(resolve, 2000));
        alert("🎉 Order placed successfully through Himalayan Market!");
      } catch (err) {
        console.error("Order completion failed:", err);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleNavigationBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-2.5 bg-[#fff8f7]">
        <Loader2 className="h-9 w-9 animate-spin text-[#801818]" />
        <p className="text-sm font-bold text-stone-500 font-manrope">
          Populating current transaction pipeline frames...
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#fff8f7] py-4 md:py-8 px-4 sm:px-6 lg:px-8 max-w-350 mx-auto">
      {/* Visual Workflow Steps Navigator block */}
      <StepTracker currentStep={step} />

      {/* Back Button Navigation Controller */}
      {step > 1 && (
        <button
          onClick={handleNavigationBack}
          className="mb-4 inline-flex items-center gap-1.5 text-xs md:text-sm font-bold text-stone-500 hover:text-[#801818] transition-colors cursor-pointer group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to previous step
        </button>
      )}

      {cartItems.length === 0 ? (
        <div className="border border-dashed border-[#e0bebb] rounded-2xl p-10 text-center bg-white space-y-4 max-w-xl mx-auto mt-6">
          <div className="p-4 bg-[#fff0ee] rounded-full w-fit mx-auto text-[#801818]">
            <ShoppingBag className="h-8 w-8" />
          </div>
          <p className="text-stone-600 font-bold font-manrope">
            Your current checkout sequence is empty.
          </p>
        </div>
      ) : (
        /* Unified multi-column breakpoint grid wrapper */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start mt-2">
          {/* LEFT COLUMN: Dynamic step rendering */}
          <div className="lg:col-span-2 space-y-4">
            {step === 1 && (
              <div className="space-y-3 animate-fadeIn">
                <div className="mb-2">
                  <h1 className="text-xl md:text-2xl font-extrabold font-manrope text-stone-900">
                    Review Your Cart items
                  </h1>
                </div>
                {cartItems.map((item) => (
                  <CartItemRow key={item._id} item={item} />
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="animate-fadeIn">
                <ShippingForm
                  formData={shippingData}
                  onChange={handleShippingChange}
                />
              </div>
            )}

            {step === 3 && (
              <div className="animate-fadeIn">
                <PaymentMethods
                  selected={paymentGateway}
                  onSelect={setPaymentGateway}
                />
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Summary and Actions */}
          <div className="lg:col-span-1 lg:sticky lg:top-6">
            <OrderSummaryCard
              items={cartItems}
              currentStep={step}
              onNext={handleNavigationNext}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      )}
    </main>
  );
}
