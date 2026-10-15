import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { fetchCategories, fetchProduct, fetchProducts } from '../api/products';

export function useProducts(q: string, category: string | null) {
  return useInfiniteQuery({
    queryKey: ['products', { q, category }],
    queryFn: ({ pageParam }) => fetchProducts({ q, category, skip: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (last) =>
      last.skip + last.limit < last.total ? last.skip + last.limit : undefined,
  });
}

export const useCategories = () =>
  useQuery({ queryKey: ['categories'], queryFn: fetchCategories });

export const useProduct = (id: number) =>
  useQuery({ queryKey: ['product', id], queryFn: () => fetchProduct(id) });