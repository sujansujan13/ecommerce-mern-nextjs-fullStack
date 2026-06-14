"use client";
import { cartApi } from "@/api/cartApi";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "../context/AuthProvider"; // ADDED: read auth state

export interface productType {
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  currency: string;
  stockCount?: number;
  // images: [string];
  images: string[];
  _id: string;
  inStock: boolean;
}

export interface cartItemsProps {
  productId: productType | null | string;
  quantity: number;
  _id: string;
}

interface cartContextProps {
  cartItems: cartItemsProps[];
  isLoading: boolean;
  fetchCart: () => Promise<void>;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  updateQuantity: (productId: string, newQty: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
}

const CartContext = createContext<cartContextProps | undefined>(undefined);

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setisLoading] = useState(false);
  const [cartItems, setCartItems] = useState<cartItemsProps[]>([]);

  // ADDED: read user + loading from AuthContext
  // user = null means not logged in
  // loading = true means auth check is still in progress
  const { user, loading: authLoading } = useAuth();

  // Wrapped in useCallback to prevent infinite render loops if injected into useEffect deps elsewhere
  const fetchCart = useCallback(async () => {
    try {
      setisLoading(true);
      const data = await cartApi.getCart();
      if (data.success && data.cart) {
        setCartItems(data.cart.items || []);
      }
    } catch (error) {
      console.error("Error Fetching CartItems", error);
    } finally {
      setisLoading(false);
    }
  }, []);

  const addToCart = async (productId: string, quantity: number) => {
    try {
      // esma setLoading ko code lekhnu pardaina kina vane yo page load huda render hune haina, baru context bata pass garera cart page ma use garna sakkinxa
      const data = await cartApi.addToCart(productId, quantity);
      if (data.success) {
        await fetchCart(); // Re-sync local state with latest population variables
      }
    } catch (error) {
      console.error("Error running addToCart sync", error);
    }
  };

  const updateQuantity = async (productId: string, newQty: number) => {
    // 🧠 OPTIMISTIC UI: Mutate state immediately so inputs feel super fast
    setCartItems((prev) =>
      prev.map((item) => {
        // 🚀 Extract the target ID safely whether it's a string or a populated object
        const currentId =
          typeof item.productId === "object" && item.productId !== null
            ? item.productId._id
            : item.productId; // it's already a string reference

        return currentId === productId ? { ...item, quantity: newQty } : item;
      }),
    );

    try {
      const data = await cartApi.updataeQuantity(productId, newQty);
      if (!data.success) fetchCart(); // Rollback on error
    } catch (error) {
      console.error("Error running updateQuantity sync:", error);
      await fetchCart(); // Rollback if network drops
    }
  };

  const removeFromCart = async (productId: string) => {
    // 🧠 OPTIMISTIC UI: Filter away the item instantly
    setCartItems((prev) =>
      prev.filter((item) => {
        // 🚀 Extract the target ID safely whether it's a string or a populated object
        const currentId =
          typeof item.productId === "object" && item.productId !== null
            ? item.productId._id
            : item.productId; // It's already a string reference

        // Keep the item ONLY if its ID does NOT match the one we want to delete
        return currentId !== productId;
      }),
    );

    try {
      const data = await cartApi.removeFromCart(productId);
      if (!data.success) fetchCart();
    } catch (error) {
      console.error(`Error removing the items from the cart`, error);
      await fetchCart(); // Rollback if network drops
    }
  };

  useEffect(() => {
    // ADDED: three conditions before fetching cart:
    // 1. authLoading is false — auth check is complete
    // 2. user exists — someone is actually logged in
    // 3. Without this guard, CartProvider fetches with no token → 401
    if (!authLoading && user) {
      fetchCart();
    }
    // ADDED: if user logs out, clear cart from UI immediately
    if (!authLoading && !user) {
      setCartItems([]);
    }
  }, [authLoading, user, fetchCart]); // CHANGED: depends on auth state

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isLoading,
        addToCart,
        fetchCart,
        updateQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be inside a cartProvider");
  return context;
};
