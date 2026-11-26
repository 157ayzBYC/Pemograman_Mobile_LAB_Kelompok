import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { ShieldCheck } from "lucide-react-native";

import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/supabase";

interface Order {
  id: string;
  user_id: string;
  customer_name: string;
  paper_type: string;
  color_mode: string;
  pages: number;
  total_price: number;
  status: "PENDING" | "PROCESSING" | "COMPLETED";
  created_at: string;
}

export default function AppHome() {
  const router = useRouter();
  const { user, signOut } = useAuth();

  const isAdmin = user?.user_metadata?.role === "admin";

  const displayName =
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "Pengguna";

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [paperType, setPaperType] = useState<"A4" | "F4">("A4");

  const [colorMode, setColorMode] = useState<
    "Hitam Putih" | "Warna"
  >("Hitam Putih");

  const [pages, setPages] = useState("10");

  const pricePerPage = colorMode === "Hitam Putih" ? 500 : 1500;
  const parsedPages = Math.max(
    0,
    parseInt(pages || "0", 10) || 0
  );
  const totalPrice = parsedPages * pricePerPage;

  // Mengambil data pesanan dari Supabase
  const fetchOrders = useCallback(async () => {
    try {
      let query = supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (!isAdmin && user?.id) {
        query = query.eq("user_id", user.id);
      }

      const { data, error } = await query;

      if (error) throw error;

      setOrders((data as Order[]) || []);
    } catch (err: any) {
      Alert.alert(
        "Gagal Memuat Data",
        err.message || "Terjadi kesalahan saat mengambil pesanan."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [isAdmin, user?.id]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Refresh halaman
  const onRefresh = () => {
    setRefreshing(true);
    fetchOrders();
  };

  // Membuat pesanan fotokopi
  const handleCreateOrder = async () => {
    if (parsedPages <= 0) {
      Alert.alert(
        "Input Tidak Valid",
        "Jumlah lembar harus lebih dari 0."
      );
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await supabase.from("orders").insert([
        {
          user_id: user?.id,
          customer_name: displayName,
          paper_type: paperType,
          color_mode: colorMode,
          pages: parsedPages,
          total_price: totalPrice,
          status: "PENDING",
        },
      ]);

      if (error) throw error;

      Alert.alert(
        "Berhasil",
        "Pesanan fotocopy berhasil dikirim."
      );

      setPages("10");
      fetchOrders();
    } catch (err: any) {
      Alert.alert(
        "Gagal Membuat Pesanan",
        err.message || "Periksa koneksi atau tabel Supabase."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Menghapus pesanan
  const handleDeleteOrder = (orderId: string) => {
    Alert.alert(
      "Batalkan Pesanan",
      "Yakin ingin membatalkan dan menghapus pesanan ini?",
      [
        {
          text: "Tidak",
          style: "cancel",
        },
        {
          text: "Ya, Batalkan",
          style: "destructive",
          onPress: async () => {
            try {
              const { error } = await supabase
                .from("orders")
                .delete()
                .eq("id", orderId);

              if (error) throw error;

              fetchOrders();
            } catch (err: any) {
              Alert.alert(
                "Gagal Menghapus",
                err.message
              );
            }
          },
        },
      ]
    );
  };

  // Admin mengubah status pesanan
  const handleUpdateStatus = async (
    orderId: string,
    nextStatus: "PROCESSING" | "COMPLETED"
  ) => {
    try {
      const { error } = await supabase
        .from("orders")
        .update({ status: nextStatus })
        .eq("id", orderId);

      if (error) throw error;

      fetchOrders();
    } catch (err: any) {
      Alert.alert(
        "Gagal Update Status",
        err.message
      );
    }
  };

  // Warna status pesanan
  const getStatusColor = (status: Order["status"]) => {
    if (status === "COMPLETED") return "#22c55e";
    if (status === "PROCESSING") return "#f59e0b";
    return "#38bdf8";
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#38bdf8"
        />
      }
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>
            Halo, {displayName}
          </Text>

          <Text style={styles.roleBadge}>
            Role: {isAdmin ? "ADMIN PANEL" : "CLIENT"}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={signOut}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Tombol Secure Token Demo */}
      <TouchableOpacity
        style={styles.secureTokenButton}
        onPress={() =>
          router.push("/secure-token" as any)
        }
        activeOpacity={0.8}
      >
        <ShieldCheck size={24} color="#ffffff" />

        <View style={{ flex: 1 }}>
          <Text style={styles.secureTokenTitle}>
            Secure Token Demo
          </Text>

          <Text style={styles.secureTokenSubtitle}>
            Demonstrasi penyimpanan token Modul 4
          </Text>
        </View>

        <Text style={styles.secureTokenArrow}>›</Text>
      </TouchableOpacity>

      {/* Form Pemesanan Client */}
      {!isAdmin && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Pesan Fotocopy Baru
          </Text>

          <Text style={styles.label}>
            Jenis Kertas
          </Text>

          <View style={styles.row}>
            {(["A4", "F4"] as const).map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.optionBtn,
                  paperType === item && styles.optionBtnActive,
                ]}
                onPress={() => setPaperType(item)}
              >
                <Text
                  style={[
                    styles.optionText,
                    paperType === item && styles.optionTextActive,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>
            Mode Warna
          </Text>

          <View style={styles.row}>
            {(["Hitam Putih", "Warna"] as const).map((mode) => (
              <TouchableOpacity
                key={mode}
                style={[
                  styles.optionBtn,
                  colorMode === mode && styles.optionBtnActive,
                ]}
                onPress={() => setColorMode(mode)}
              >
                <Text
                  style={[
                    styles.optionText,
                    colorMode === mode && styles.optionTextActive,
                  ]}
                >
                  {mode}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>
            Jumlah Lembar
          </Text>

          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={pages}
            onChangeText={setPages}
            placeholder="Masukkan jumlah lembar"
            placeholderTextColor="#64748b"
          />

          <View style={styles.priceBox}>
            <Text style={styles.priceLabel}>
              Estimasi Total
            </Text>

            <Text style={styles.priceValue}>
              Rp {totalPrice.toLocaleString("id-ID")}
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.primaryBtn,
              submitting && styles.disabledBtn,
            ]}
            onPress={handleCreateOrder}
            disabled={submitting}
          >
            <Text style={styles.primaryBtnText}>
              {submitting ? "Mengirim..." : "Pesan Fotocopy"}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Riwayat Pesanan */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          {isAdmin
            ? "Pesanan Client (Supabase)"
            : "Riwayat Pesanan Saya"}
        </Text>

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#38bdf8"
            style={{ marginVertical: 20 }}
          />
        ) : orders.length === 0 ? (
          <Text style={styles.emptyText}>
            Belum ada data pesanan di Supabase.
          </Text>
        ) : (
          orders.map((order) => (
            <View key={order.id} style={styles.orderItem}>
              <View style={styles.orderHeader}>
                <Text style={styles.orderCustomer}>
                  {order.customer_name}
                </Text>

                <Text
                  style={[
                    styles.statusText,
                    { color: getStatusColor(order.status) },
                  ]}
                >
                  {order.status}
                </Text>
              </View>

              <Text style={styles.orderDetail}>
                Kertas {order.paper_type} • {order.color_mode} •{" "}
                {order.pages} lembar
              </Text>

              <Text style={styles.orderPrice}>
                Total: Rp{" "}
                {Number(order.total_price).toLocaleString("id-ID")}
              </Text>

              {/* Tombol Batalkan untuk Client */}
              {!isAdmin && order.status === "PENDING" && (
                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={() =>
                    handleDeleteOrder(order.id)
                  }
                >
                  <Text style={styles.deleteBtnText}>
                    Batalkan Pesanan
                  </Text>
                </TouchableOpacity>
              )}

              {/* Tombol Admin */}
              {isAdmin && order.status !== "COMPLETED" && (
                <View style={styles.adminActions}>
                  {order.status === "PENDING" && (
                    <TouchableOpacity
                      style={styles.processBtn}
                      onPress={() =>
                        handleUpdateStatus(
                          order.id,
                          "PROCESSING"
                        )
                      }
                    >
                      <Text style={styles.actionBtnText}>
                        Proses Pesanan
                      </Text>
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity
                    style={styles.completeBtn}
                    onPress={() =>
                      handleUpdateStatus(
                        order.id,
                        "COMPLETED"
                      )
                    }
                  >
                    <Text style={styles.actionBtnText}>
                      Tandai Selesai
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },

  content: {
    padding: 20,
    paddingTop: 54,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  greeting: {
    fontSize: 20,
    fontWeight: "700",
    color: "#f8fafc",
  },

  roleBadge: {
    fontSize: 12,
    fontWeight: "600",
    color: "#38bdf8",
    marginTop: 4,
  },

  logoutButton: {
    backgroundColor: "#ef4444",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },

  logoutText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 13,
  },

  // Style Secure Token Demo
  secureTokenButton: {
    backgroundColor: "#075985",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: "#0ea5e9",
  },

  secureTokenTitle: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },

  secureTokenSubtitle: {
    color: "#bae6fd",
    fontSize: 12,
    marginTop: 4,
  },

  secureTokenArrow: {
    color: "#ffffff",
    fontSize: 28,
  },

  card: {
    backgroundColor: "#1e293b",
    borderRadius: 14,
    padding: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#334155",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#f8fafc",
    marginBottom: 14,
  },

  label: {
    color: "#cbd5e1",
    fontSize: 13,
    marginBottom: 6,
    marginTop: 8,
  },

  row: {
    flexDirection: "row",
    gap: 10,
  },

  optionBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#475569",
    alignItems: "center",
    backgroundColor: "#0f172a",
  },

  optionBtnActive: {
    borderColor: "#38bdf8",
    backgroundColor: "#0284c7",
  },

  optionText: {
    color: "#94a3b8",
    fontWeight: "600",
  },

  optionTextActive: {
    color: "#ffffff",
  },

  input: {
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#475569",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#f8fafc",
    fontSize: 15,
  },

  priceBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#334155",
  },

  priceLabel: {
    color: "#94a3b8",
    fontSize: 14,
  },

  priceValue: {
    color: "#38bdf8",
    fontSize: 18,
    fontWeight: "700",
  },

  primaryBtn: {
    backgroundColor: "#38bdf8",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 14,
  },

  disabledBtn: {
    opacity: 0.6,
  },

  primaryBtnText: {
    color: "#0f172a",
    fontWeight: "700",
    fontSize: 15,
  },

  emptyText: {
    color: "#94a3b8",
    textAlign: "center",
    paddingVertical: 16,
  },

  orderItem: {
    backgroundColor: "#0f172a",
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#334155",
  },

  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  orderCustomer: {
    color: "#f8fafc",
    fontWeight: "700",
    fontSize: 14,
  },

  statusText: {
    fontWeight: "700",
    fontSize: 12,
  },

  orderDetail: {
    color: "#cbd5e1",
    fontSize: 13,
  },

  orderPrice: {
    color: "#38bdf8",
    fontWeight: "600",
    fontSize: 13,
    marginTop: 4,
  },

  deleteBtn: {
    marginTop: 10,
    backgroundColor: "#7f1d1d",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },

  deleteBtnText: {
    color: "#fecaca",
    fontWeight: "600",
    fontSize: 12,
  },

  adminActions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
  },

  processBtn: {
    flex: 1,
    backgroundColor: "#d97706",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },

  completeBtn: {
    flex: 1,
    backgroundColor: "#16a34a",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },

  actionBtnText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 12,
  },
});
