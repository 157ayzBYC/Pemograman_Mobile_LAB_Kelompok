
export interface ProductItem {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}


export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}