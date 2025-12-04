import type { Product, Category, Inquiry, ElevatorConfig, PlatformConfig } from "@shared/schema";

const API_BASE = "/api";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message || "Request failed");
  }
  return response.json();
}

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE}/products`);
  return handleResponse<Product[]>(response);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE}/products/featured`);
  return handleResponse<Product[]>(response);
}

export async function getProductBySlug(slug: string): Promise<Product> {
  const response = await fetch(`${API_BASE}/products/${slug}`);
  return handleResponse<Product>(response);
}

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${API_BASE}/categories`);
  return handleResponse<Category[]>(response);
}

export async function getCategoryBySlug(slug: string): Promise<Category> {
  const response = await fetch(`${API_BASE}/categories/${slug}`);
  return handleResponse<Category>(response);
}

export async function getProductsByCategory(slug: string): Promise<Product[]> {
  const response = await fetch(`${API_BASE}/categories/${slug}/products`);
  return handleResponse<Product[]>(response);
}

export interface InquiryData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  productId?: string;
}

export async function createInquiry(data: InquiryData): Promise<Inquiry> {
  const response = await fetch(`${API_BASE}/inquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<Inquiry>(response);
}

export interface ElevatorConfigData {
  sessionId: string;
  cabinType?: string;
  capacity?: number;
  floors?: number;
  doorType?: string;
  finishMaterial?: string;
  lighting?: string;
  controlPanel?: string;
  additionalFeatures?: string[];
}

export async function createElevatorConfig(data: ElevatorConfigData): Promise<ElevatorConfig> {
  const response = await fetch(`${API_BASE}/elevator-configurations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<ElevatorConfig>(response);
}

export interface PlatformConfigData {
  sessionId: string;
  platformType?: string;
  capacity?: number;
  travelHeight?: number;
  indoor?: boolean;
  rampType?: string;
  safetyFeatures?: string[];
}

export async function createPlatformConfig(data: PlatformConfigData): Promise<PlatformConfig> {
  const response = await fetch(`${API_BASE}/platform-configurations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<PlatformConfig>(response);
}
