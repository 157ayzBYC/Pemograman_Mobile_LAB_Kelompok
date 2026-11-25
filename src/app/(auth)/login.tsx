import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { supabase } from "../../lib/supabase";

export default function LoginScreen() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"client" | "admin">("client");
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    const cleanEmail = email.trim();
    const cleanName = name.trim();

    if (!cleanEmail || !password) {
      Alert.alert("Validasi", "Email dan password wajib diisi.");
      return;
    }

    setLoading(true);
    try {
      if (isRegistering) {
        if (!cleanName) {
          Alert.alert("Validasi", "Nama lengkap wajib diisi saat pendaftaran.");
          setLoading(false);
          return;
        }
        const { error } = await supabase.auth.signUp({
          email: cleanEmail,
          password,
          options: {
            data: {
              full_name: cleanName,
              role,
            },
          },
        });
        if (error) throw error;
        Alert.alert("Berhasil", "Akun berhasil didaftarkan!");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });
        if (error) throw error;
      }
    } catch (err: any) {
      Alert.alert("Autentikasi Gagal", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.badge}>STUDY SUPLAY</Text>
        <Text style={styles.title}>
          {isRegistering ? "Daftar Akun Baru" : "Masuk ke Layanan"}
        </Text>

        {isRegistering && (
          <>
            <Text style={styles.label}>NAMA LENGKAP</Text>
            <TextInput
              style={styles.input}
              placeholder="Contoh: Rifadz Maulana"
              placeholderTextColor="#64748b"
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.label}>PILIH PERAN (ROLE)</Text>
            <View style={styles.roleRow}>
              {(["client", "admin"] as const).map((item) => (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.roleBtn,
                    role === item && styles.roleBtnActive,
                  ]}
                  onPress={() => setRole(item)}
                >
                  <Text
                    style={[
                      styles.roleText,
                      role === item && styles.roleTextActive,
                    ]}
                  >
                    {item.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        <Text style={styles.label}>EMAIL</Text>
        <TextInput
          style={styles.input}
          placeholder="nama@email.com"
          placeholderTextColor="#64748b"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>PASSWORD</Text>
        <TextInput
          style={styles.input}
          placeholder="Minimal 6 karakter"
          placeholderTextColor="#64748b"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={styles.submitBtn}
          onPress={handleAuth}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#0f172a" />
          ) : (
            <Text style={styles.submitText}>
              {isRegistering ? "Daftar Sekarang" : "Masuk"}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setIsRegistering(!isRegistering)}
          style={styles.switchBtn}
        >
          <Text style={styles.switchText}>
            {isRegistering
              ? "Sudah punya akun? Masuk di sini"
              : "Belum punya akun? Daftar di sini"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#1e293b",
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#334155",
  },
  badge: {
    color: "#38bdf8",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  title: {
    color: "#f8fafc",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
  },
  label: {
    color: "#94a3b8",
    fontSize: 11,
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    backgroundColor: "#0f172a",
    color: "#f8fafc",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#334155",
  },
  roleRow: { flexDirection: "row", gap: 10, marginBottom: 4 },
  roleBtn: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#334155",
    alignItems: "center",
  },
  roleBtnActive: { backgroundColor: "#38bdf8", borderColor: "#38bdf8" },
  roleText: { color: "#94a3b8", fontWeight: "700", fontSize: 12 },
  roleTextActive: { color: "#0f172a" },
  submitBtn: {
    backgroundColor: "#38bdf8",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  submitText: { color: "#0f172a", fontWeight: "700", fontSize: 15 },
  switchBtn: { marginTop: 16, alignItems: "center" },
  switchText: { color: "#94a3b8", fontSize: 13 },
});
