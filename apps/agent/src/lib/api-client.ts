import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1",
  headers: { "Content-Type": "application/json" },
});

let cachedToken: string | null = null;
let tokenExpiry = 0;

async function getApiToken(): Promise<string | null> {
  if (cachedToken && Date.now() < tokenExpiry) return cachedToken;
  try {
    const res = await fetch("/api/get-token");
    if (!res.ok) return null;
    const data = await res.json();
    cachedToken = data.token;
    tokenExpiry = Date.now() + 7 * 60 * 60 * 1000;
    return cachedToken;
  } catch {
    return null;
  }
}

apiClient.interceptors.request.use(async (config) => {
  const token = await getApiToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
