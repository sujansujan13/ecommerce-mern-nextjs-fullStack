// const api = axios.create({ baseURL: "/api" });
// with this instead of writing axios.post("/api/auth/login")
// we can write api.post("auth/login") becausebaseURL = "/api" is automatically added.

// api.interceptors.request.use((config) => {
// Request Interceptor -> Interceptor = code that runs BEFORE every request.
//
// if (token) config.headers.Authorization = `Bearer ${token}`;
// Adds: Authorization: Bearer xyz123 to every request.

// api.interceptors.response.use(
// Response Interceptor -> Runs after every response.

// #IMP#
// 1. Create axios instance (/api)

// 2. Before every request: use req interceptors
//    → read token from localStorage
//    → add Authorization header

// 3. After every response: use res interceptors
//    → if TOKEN_EXPIRED
//    → call refresh-token API
//    → save new token
//    → retry failed request

// 4. If refresh fails:
//    → remove token
//    → redirect login

// 5. Expose APIs:
//    → registerUser()
//    → loginUser()
//    → logoutUser()
//    → getMe()
import axios from "axios";

interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
}

interface AuthResponse {
  success: boolean;
  accessToken: string;
  user: User;
}

const api = axios.create({ baseURL: "http://localhost:4000/api" });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res, // Success Case
  async (err) => {
    const original = err.config;
    if (err.response?.data?.code === "TOKEN_EXPIRED" && !original._retry) {
      //Why check _retry? -> To prevent infinite loops ->token expired - refresh - fail refresh fail refresh forever
      original._retry = true; // Now it will only retry once.
      try {
        const { data } = await axios.post<AuthResponse>(
          "http://localhost:4000/api/auth/refreshToken",
          {},
          { withCredentials: true },
        );
        localStorage.setItem("accessToken", data.accessToken);
        original.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(original);
      } catch {
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  },
);

export const registerUser = (data: any) =>
  api.post<AuthResponse>("auth/register", data);
export const loginUser = (data: any) =>
  api.post<AuthResponse>("auth/login", data, { withCredentials: true });
// Why withCredentials: true?
// Allows cookies to be sent/received.
// Without  it:
// refresh token cookie won't be stored and refresh mechanism breaks.
export const logoutUser = () =>
  api.post<{ success: boolean }>("auth/logout", {}, { withCredentials: true });
export const getMe = () => api.get<{ user: User }>("auth/me");

export default api;

// Without this file ❌
// Imagine a profile page.
// Every API call would look like:
// const token = localStorage.getItem("accessToken");
// try {
//   const response = await axios.post(
//     "/api/auth/me",
//     {},
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
// } catch (err: any) {
//   if (err.response?.data?.code === "TOKEN_EXPIRED") {
//     const refreshResponse = await axios.post(
//       "/api/auth/refresh-token",
//       {},
//       {
//         withCredentials: true,
//       }
//     );
//     const newToken =
//       refreshResponse.data.accessToken;
//     localStorage.setItem(
//       "accessToken",
//       newToken
//     );
//     const retryResponse = await axios.post(
//       "/api/auth/me",
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${newToken}`,
//         },
//       }
//     );
//     return retryResponse;
//   }
// }

// Now imagine doing this in:

// Dashboard page
// Profile page
// Orders page
// Settings page
// Notifications page
// Admin page

// You would repeat the same code everywhere.

// without axios interceptors, you would need to manually handle token refresh in each API call, which can lead to code duplication and potential bugs. The interceptor centralizes this logic, ensuring that all API calls automatically attempt to refresh the token when it expires, improving maintainability and user experience.

// authApi.js

// const BASE_URL = "/api";

// // Generic authenticated fetch
// async function authFetch(url, options = {}) {
//   const token = localStorage.getItem("accessToken");

//   const response = await fetch(`${BASE_URL}${url}`, {
//     ...options,
//     credentials: "include",
//     headers: {
//       "Content-Type": "application/json",
//       ...(token && {
//         Authorization: `Bearer ${token}`,
//       }),
//       ...options.headers,
//     },
//   });

//   // Access token expired
//   if (response.status === 401 && !options._retry) {
//     try {
//       const refreshResponse = await fetch(`${BASE_URL}/auth/refresh-token`, {
//         method: "POST",
//         credentials: "include",
//       });

//       if (!refreshResponse.ok) {
//         throw new Error("Refresh failed");
//       }

//       const refreshData = await refreshResponse.json();

//       localStorage.setItem("accessToken", refreshData.accessToken);

//       // Retry original request
//       return authFetch(url, {
//         ...options,
//         _retry: true,
//       });
//     } catch {
//       localStorage.removeItem("accessToken");
//       window.location.href = "/login";
//       throw new Error("Session expired");
//     }
//   }

//   return response;
// }

// -------------------
// Auth APIs
// -------------------

// export async function registerUser(data) {
//   const res = await authFetch("/auth/register", {
//     method: "POST",
//     body: JSON.stringify(data),
//   });

//   return res.json();
// }

// export async function loginUser(data) {
//   const res = await fetch(`${BASE_URL}/auth/login`, {
//     method: "POST",
//     credentials: "include",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });

//   return res.json();
// }

// export async function logoutUser() {
//   const res = await authFetch("/auth/logout", {
//     method: "POST",
//   });

//   return res.json();
// }

// export async function getMe() {
//   const res = await authFetch("/auth/me");

//   return res.json();
// }
