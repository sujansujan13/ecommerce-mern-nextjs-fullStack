const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Helper to reliably extract auth headers on every invocation
const getAuthHeaders = () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  console.log("TOKEN:", token);
  return {
    "content-type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

export const cartApi = {
  async getCart() {
    const res = await fetch(`${API_URL}/api/cart`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!res.ok) {
      throw new Error(`Error Fetching Cart-Items:${res.status}`);
    }
    return res.json();
  },

  async addToCart(productId: string, quantity: number) {
    const res = await fetch(`${API_URL}/api/cart/add`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        productId,
        quantity,
      }),
    });
    if (!res.ok) {
      throw new Error(`Error Adding Cart-Items:${res.status}`);
    }
    return res.json();
  },

  async updataeQuantity(productId: string, quantity: number) {
    const res = await fetch(`${API_URL}/api/cart/update`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        productId,
        quantity,
      }),
    });
    if (!res.ok) {
      throw new Error(`Error Updating the quantity:${res.status}`);
    }
    return res.json();
  },

  async removeFromCart(productId: string) {
    const res = await fetch(`${API_URL}/api/cart/remove/${productId}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!res.ok) {
      throw new Error(`Error removing item from the cart${res.status}`);
    }
    return res.json();
  },
};
