import { products } from "../data/products";
import { ProductItem } from "../types/product";

// Fungsi helper delay untuk simulasi jaringan server
const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Fungsi Async dengan Promise, resolve, dan reject (Modul 3)
export const fetchProductsFromApi = async (): Promise<ProductItem[]> => {
  // Mensimulasikan jeda loading server/API selama 1 detik
  await delay(1000);

  const isSuccess = true; // Ubah ke false jika ingin menguji kondisi error (reject)

  return new Promise((resolve, reject) => {
    if (isSuccess) {
      resolve(products); // Berhasil mengembalikan data produk
    } else {
      reject("Gagal mengambil data produk dari server."); // Gagal / Error
    }
  });
};
