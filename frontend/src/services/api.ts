import { Product } from "@/types/product";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/products`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export async function getProductById(id: string): Promise<Product> {
  const res = await fetch(`${API_URL}/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}

export async function createOrder(orderData: any) {
  const res = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to place order");
  }

  return res.json();
}

/* ADMIN: GET ALL PRODUCTS */
export async function getAdminProducts() {
  const res = await fetch(`${API_URL}/products`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

/* ADMIN: LOGIN */
export async function adminLogin(email: string, password: string) {
  const res = await fetch(`${API_URL}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

/* ADMIN: CREATE PRODUCT */
export async function createProduct(productData: any) {
  const token = localStorage.getItem("adminToken");
  
  // Check if productData is FormData (for image upload)
  const isFormData = productData instanceof FormData;
  
  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (!isFormData) headers["Content-Type"] = "application/json";

  const res = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers,
    body: isFormData ? productData : JSON.stringify(productData),
  });

  if (!res.ok) throw new Error("Failed to create product");
  return res.json();
}

/* ADMIN: DELETE PRODUCT */
export async function deleteProduct(productId: string) {
  const token = localStorage.getItem("adminToken");
  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}/products/${productId}`, {
    method: "DELETE",
    headers,
  });

  if (!res.ok) throw new Error("Failed to delete product");
  return res.json();
}
