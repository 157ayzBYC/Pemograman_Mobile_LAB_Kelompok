// types/product.ts

export interface ProductItem {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

// TAMBAHKAN INI:
// Interface untuk membungkus respons dari API
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}