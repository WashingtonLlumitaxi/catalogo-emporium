import { Category, Product, ProductsResponse } from '../types/product';

const BASE_URL = 'https://dummyjson.com';
export const PAGE_SIZE = 20;

async function request<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error(`Error ${res.status}`);
  return res.json() as Promise<T>;
}

interface ListParams {
  q?: string;
  category?: string | null;
  skip?: number;
}

export function fetchProducts({ q, category, skip = 0 }: ListParams) {
  const paging = `limit=${PAGE_SIZE}&skip=${skip}`;
  if (q) return request<ProductsResponse>(`/products/search?q=${encodeURIComponent(q)}&${paging}`);
  if (category) return request<ProductsResponse>(`/products/category/${category}?${paging}`);
  return request<ProductsResponse>(`/products?${paging}`);
}

export const fetchCategories = () => request<Category[]>('/products/categories');
export const fetchProduct = (id: number) => request<Product>(`/products/${id}`);