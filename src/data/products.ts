import { Product } from "../types/product";

export const products: Product[] = [
  {
    id: 1,
    name: "Kertas A4",
    category: "Kertas",
    price: 45000,
    stock: 500,
    unit: "lembar",
  },
  {
    id: 2,
    name: "Kertas F4",
    category: "Kertas",
    price: 50000,
    stock: 300,
    unit: "lembar",
  },
  {
    id: 3,
    name: "Pulpen",
    category: "Alat Tulis",
    price: 3000,
    stock: 35,
    unit: "pcs",
  },
  {
    id: 4,
    name: "Stapler",
    category: "Peralatan",
    price: 15000,
    stock: 10,
    unit: "pcs",
  },
  {
    id: 5,
    name: "Isi Staples",
    category: "Peralatan",
    price: 5000,
    stock: 25,
    unit: "box",
  },
  {
    id: 6,
    name: "Map",
    category: "Perlengkapan",
    price: 2000,
    stock: 50,
    unit: "pcs",
  },
];
