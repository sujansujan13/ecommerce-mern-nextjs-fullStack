const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const productApi = {
  async getProducts(params: {
    category: string;
    search?: string;
    sort?: string;
    page?: number;
  }) {
    const query = new URLSearchParams();

    if (params?.category) {
      query.append("category", params.category);
    }
    if (params?.search) {
      query.append("search", params.search);
    }
    if (params?.sort) {
      query.append("sort", params.sort);
    }
    // if (params?.page) {
    //   query.append("page", params.page.toString());
    // }
    const queryString = query.toString(); // Convert query parameters to string

    const url = queryString
      ? `${API_URL}/api/products?${queryString}`
      : `${API_URL}/api/products`;

    console.log("Fetching:", url);

    const res = await fetch(url);

    if (!res.ok) {
      const errorData = await res.text();
      console.error(errorData);
      throw new Error(`Request failed: ${res.status}`);
    }

    return res.json();
  },

  async getProductBySlug(category: string, slug: string) {
    const res = await fetch(`${API_URL}/api/products/${category}/${slug}`);

    if (!res.ok) {
      const errorData = await res.text();
      console.error(errorData);
      throw new Error(`Request failed: ${res.status}`);
    }
    return res.json();
  },
};

// Using axios (optional, but often cleaner for complex APIs)
// src / lib / axios.ts;
// import axios from "axios";

// export const api = axios.create({
//   baseURL: "http://localhost:4000/api",
//   withCredentials: true, // if using cookies/auth later
// });

// in productApi.ts
// import { api } from "./axios";

// export const productApi = {
//   async getProducts(params: {
//     category?: string;
//     search?: string;
//     sort?: string;
//     page?: number;
//   }) {
//     const res = await api.get("/products", {
//       params, // 👈 Axios auto builds query string
//     });

//     return res.data;
//   },

//   async getProductBySlug(category: string, slug: string) {
//     const res = await api.get(`/products/${category}/${slug}`);
//     return res.data;
//   },
// };
