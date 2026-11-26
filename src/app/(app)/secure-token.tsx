
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";

import {
  saveAuthToken,
  getAuthToken,
  deleteAuthToken,
} from "../../utils/SecureToken";

export default function SecureTokenScreen() {
  const router = useRouter();

  const [token, setToken] = useState("STUDY-SUPLAY-DEMO-2026");
  const [savedToken, setSavedToken] = useState("");
  const [status, setStatus] = useState("Belum ada aktivitas token.");

  const maskToken = (value: string) => {
    if (!value) return "Tidak ada token";
    return value.substring(0, 5) + "********";
  };

  const handleSaveToken = async () => {
    if (Platform.OS === "web") {
      setStatus("Uji SecureStore melalui Expo Go Android.");
      return;
    }

    try {
      await saveAuthToken(token);
      setStatus("Token berhasil disimpan secara aman!");
    } catch (error) {
      setStatus("Gagal menyimpan token.");
      console.log(error);
    }
  };

  const handleGetToken = async () => {
    if (Platform.OS === "web") {
      setStatus("Uji SecureStore melalui Expo Go Android.");
      return;
    }

    try {
      const result = await getAuthToken();

      if (result) {
        setSavedToken(maskToken(result));
        setStatus("Token berhasil ditemukan!");
      } else {
        setSavedToken("");
        setStatus("Belum ada token yang tersimpan.");
      }
    } catch (error) {
      setStatus("Gagal mengambil token.");
      console.log(error);
    }
  };

  const handleDeleteToken = async () => {
    if (Platform.OS === "web") {
      setStatus("Uji SecureStore melalui Expo Go Android.");
      return;
    }

    try {
      await deleteAuthToken();
      setSavedToken("");
      setStatus("Token berhasil dihapus!");
    } catch (error) {
      setStatus("Gagal menghapus token.");
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.back}>← Kembali ke Dashboard</Text>
        </Pressable>

        <Text style={styles.title}>🔐 Secure Token Storage</Text>
        <Text style={styles.subtitle}>
          Study Suplay - Demonstrasi Modul 4
        </Text>

        <View style={styles.card}>
          <Text style={styles.heading}>Penyimpanan Token</Text>

          <Text style={styles.label}>Token Demo</Text>
          <TextInput
            style={styles.input}
            value={token}
            onChangeText={setToken}
            placeholder="Masukkan token demo"
            placeholderTextColor="#94a3b8"
            autoCapitalize="none"
          />

          <Pressable style={styles.saveButton} onPress={handleSaveToken}>
            <Text style={styles.buttonText}>Save Token</Text>
          </Pressable>

          <Pressable style={styles.getButton} onPress={handleGetToken}>
            <Text style={styles.buttonText}>Get Token</Text>
          </Pressable>

          <Pressable style={styles.deleteButton} onPress={handleDeleteToken}>
            <Text style={styles.buttonText}>Delete Token</Text>
          </Pressable>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>Hasil Pemeriksaan</Text>

          <Text style={styles.label}>Token Tersimpan:</Text>
          <Text style={styles.token}>{savedToken || "Belum diperiksa"}</Text>

          <Text style={styles.label}>Status:</Text>
          <Text style={styles.status}>{status}</Text>
        </View>

        {Platform.OS === "web" && (
          <Text style={styles.warning}>
            Halaman dapat dibuka di browser, tetapi fungsi SecureStore
            perlu diuji menggunakan Expo Go di Android.
          </Text>
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
    paddingTop: 45,
    paddingBottom: 40,
  },
  back: {
    color: "#38bdf8",
    fontSize: 14,
    marginBottom: 25,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
  },
  subtitle: {
    color: "#38bdf8",
    marginBottom: 25,
  },
  card: {
    backgroundColor: "#1e293b",
    padding: 20,
    borderRadius: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#334155",
  },
  heading: {
    color: "#ffffff",
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 15,
  },
  label: {
    color: "#cbd5e1",
    marginTop: 10,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#0f172a",
    color: "#ffffff",
    borderWidth: 1,
    borderColor: "#475569",
    borderRadius: 9,
    padding: 13,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: "#0284c7",
    padding: 15,
    borderRadius: 9,
    alignItems: "center",
    marginBottom: 10,
  },
  getButton: {
    backgroundColor: "#16a34a",
    padding: 15,
    borderRadius: 9,
    alignItems: "center",
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: "#dc2626",
    padding: 15,
    borderRadius: 9,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 15,
  },
  token: {
    color: "#38bdf8",
    fontWeight: "bold",
  },
  status: {
    color: "#4ade80",
    marginTop: 5,
  },
  warning: {
    color: "#facc15",
    lineHeight: 21,
  },
});
