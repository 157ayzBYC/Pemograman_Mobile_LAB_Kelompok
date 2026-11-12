
import { ProductItem } from "../types/product";

export const fetchProductsFromApi = (): Promise<ProductItem[]> => {
  return new Promise((resolve, reject) => {
    // Simulasi loading jaringan selama 1 detik 
    setTimeout(() => {
      
      fetch('https://dummyjson.com/products')
        .then((response) => {
          if (!response.ok) {
            throw new Error("Gagal mengambil data dari server");
          }
          return response.json();
        })
        .then((json) => {
          const mappedProducts: ProductItem[] = json.products.map((item: any) => ({
            id: item.id,
            name: item.title, 
            category: item.category,
            price: item.price,
            stock: item.stock
          }));

        
          resolve(mappedProducts);
        })
        .catch((error) => {

          reject(error.message || "Gagal terhubung ke server API.");
        });

    }, 1000);
  });
};