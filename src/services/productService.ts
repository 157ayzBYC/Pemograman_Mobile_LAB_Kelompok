import { products } from "../data/products";
import { ProductItem } from "../types/product";

// Fungsi helper delay untuk simulasi jaringan
const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

// Fungsi Asynchronous menggunakan Promise, resolve, dan reject (Poin Rubrik Modul 3)
export const fetchProductsFromApi = (): Promise<ProductItem[]> => {
  // Simulasi proses fetching data server selama 1 detik
  return delay(1000).then(() => {
    const isSuccess = true; // Ubah ke false jika ingin menguji kondisi error/reject

    return new Promise((resolve, reject) => {
      if (isSuccess) {
        resolve(products); // Berhasil mengembalikan data sesuai Interface ProductItem
      } else {
        reject("Gagal terhubung ke server API Fotocopy & ATK."); // Gagal / Error
      }
    });
  });
};
