import { Pressable, Text, View } from "react-native";
import { styles } from "../constants/styles";
import { Product } from "../types/product";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  function handleCheckout() {
    console.log("Produk dipilih:", product.name);
  }

  return (
    <View style={styles.card}>
      <Text style={styles.productName}>{product.name}</Text>

      <Text style={styles.category}>Kategori: {product.category}</Text>

      <Text style={styles.price}>
        Rp {product.price.toLocaleString("id-ID")}
      </Text>

      <Text style={styles.stock}>
        Stock: {product.stock} {product.unit}
      </Text>

      <Pressable style={styles.button} onPress={handleCheckout}>
        <Text style={styles.buttonText}>Tambah ke Checkout</Text>
      </Pressable>
    </View>
  );
}
