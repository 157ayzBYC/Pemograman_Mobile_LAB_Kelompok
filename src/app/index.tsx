import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

import ProductCard from "../components/ProductCard";
import { styles } from "../constants/styles";
import { products } from "../data/products";

type Screen =
  | "welcome"
  | "adminLogin"
  | "clientLogin"
  | "register"
  | "clientHome"
  | "adminHome"
  | "print"
  | "stock"
  | "photocopy";

export default function Index() {
  const [screen, setScreen] = useState<Screen>("welcome");

  // =========================
  // HALAMAN AWAL
  // =========================

  if (screen === "welcome") {
    return (
      <View style={styles.authContainer}>
        <View style={styles.authBox}>
          <Text style={styles.logo}>🖨️</Text>

          <Text style={styles.authTitle}>Study Suplay</Text>

          <Text style={styles.authSubtitle}>
            Malas ke toko? mending cek sini aja
          </Text>

          <Text style={styles.chooseTitle}>Masuk sebagai</Text>

          <Pressable
            style={styles.button}
            onPress={() => setScreen("adminLogin")}
          >
            <Text style={styles.buttonText}>Admin</Text>
          </Pressable>

          <Pressable
            style={styles.button}
            onPress={() => setScreen("clientLogin")}
          >
            <Text style={styles.buttonText}>Client</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  // =========================
  // LOGIN ADMIN
  // =========================

  if (screen === "adminLogin") {
    return (
      <View style={styles.authContainer}>
        <View style={styles.authBox}>
          <Text style={styles.authTitle}>Login Admin</Text>

          <Text style={styles.authSubtitle}>
            Admin sudah memiliki akun dan tidak perlu melakukan register.
          </Text>

          <TextInput placeholder="Email Admin" style={styles.input} />

          <TextInput
            placeholder="Password"
            secureTextEntry
            style={styles.input}
          />

          <Pressable
            style={styles.button}
            onPress={() => setScreen("adminHome")}
          >
            <Text style={styles.buttonText}>Login Admin</Text>
          </Pressable>

          <Pressable onPress={() => setScreen("welcome")}>
            <Text style={styles.link}>← Kembali</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  // =========================
  // LOGIN CLIENT
  // =========================

  if (screen === "clientLogin") {
    return (
      <View style={styles.authContainer}>
        <View style={styles.authBox}>
          <Text style={styles.authTitle}>Login Client</Text>

          <Text style={styles.authSubtitle}>
            Login menggunakan akun client yang sudah terdaftar.
          </Text>

          <TextInput placeholder="Email" style={styles.input} />

          <TextInput
            placeholder="Password"
            secureTextEntry
            style={styles.input}
          />

          <Pressable
            style={styles.button}
            onPress={() => setScreen("clientHome")}
          >
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>

          <Text style={styles.registerText}>Belum memiliki akun?</Text>

          <Pressable onPress={() => setScreen("register")}>
            <Text style={styles.link}>Register Client</Text>
          </Pressable>

          <Pressable onPress={() => setScreen("welcome")}>
            <Text style={styles.link}>← Kembali</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  // =========================
  // REGISTER CLIENT
  // =========================

  if (screen === "register") {
    return (
      <View style={styles.authContainer}>
        <ScrollView contentContainerStyle={styles.authScroll}>
          <View style={styles.authBox}>
            <Text style={styles.authTitle}>Register Client</Text>

            <Text style={styles.authSubtitle}>
              Buat akun terlebih dahulu sebelum melakukan login.
            </Text>

            <TextInput placeholder="Nama Lengkap" style={styles.input} />

            <TextInput placeholder="Email" style={styles.input} />

            <TextInput placeholder="Nomor Telepon" style={styles.input} />

            <TextInput
              placeholder="Password"
              secureTextEntry
              style={styles.input}
            />

            <TextInput placeholder="Alamat" style={styles.input} />

            <Pressable
              style={styles.button}
              onPress={() => setScreen("clientLogin")}
            >
              <Text style={styles.buttonText}>Buat Akun</Text>
            </Pressable>

            <Pressable onPress={() => setScreen("clientLogin")}>
              <Text style={styles.link}>Sudah punya akun? Login</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    );
  }

  // =========================
  // HOME CLIENT
  // =========================

  if (screen === "clientHome") {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Fotocopy Online</Text>

            <Text style={styles.headerText}>Halo, Client! 👋</Text>

            <Text style={styles.headerText}>Mau melakukan apa hari ini?</Text>
          </View>

          <Text style={styles.sectionTitle}>Layanan</Text>

          <Pressable style={styles.menuCard} onPress={() => setScreen("print")}>
            <Text style={styles.menuIcon}>🖨️</Text>

            <View>
              <Text style={styles.menuTitle}>Print Dokumen</Text>

              <Text style={styles.menuDescription}>
                Pesan layanan print dokumen.
              </Text>
            </View>
          </Pressable>

          <Pressable
            style={styles.menuCard}
            onPress={() => setScreen("photocopy")}
          >
            <Text style={styles.menuIcon}>📄</Text>

            <View>
              <Text style={styles.menuTitle}>Fotocopy</Text>

              <Text style={styles.menuDescription}>
                Pesan layanan fotocopy.
              </Text>
            </View>
          </Pressable>

          <Pressable style={styles.menuCard} onPress={() => setScreen("stock")}>
            <Text style={styles.menuIcon}>📦</Text>

            <View>
              <Text style={styles.menuTitle}>Lihat Stock</Text>

              <Text style={styles.menuDescription}>
                Lihat ketersediaan barang.
              </Text>
            </View>
          </Pressable>

          <View style={styles.serviceBox}>
            <Text style={styles.sectionTitle}>Informasi</Text>

            <Text>
              Kamu dapat melihat stock barang, memilih layanan print atau
              fotocopy, kemudian melakukan pemesanan.
            </Text>
          </View>

          <Pressable
            style={styles.logoutButton}
            onPress={() => setScreen("welcome")}
          >
            <Text style={styles.buttonText}>Logout</Text>
          </Pressable>
        </View>
      </ScrollView>
    );
  }

  // =========================
  // HOME ADMIN
  // =========================

  if (screen === "adminHome") {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.adminHeader}>
            <Text style={styles.headerTitle}>Admin Dashboard</Text>

            <Text style={styles.headerText}>Selamat datang, Admin.</Text>
          </View>

          <Text style={styles.sectionTitle}>Menu Admin</Text>

          <View style={styles.adminCard}>
            <Text style={styles.menuIcon}>📦</Text>

            <Text style={styles.menuTitle}>Kelola Stock</Text>

            <Text style={styles.menuDescription}>
              Melihat dan mengelola data barang.
            </Text>
          </View>

          <View style={styles.adminCard}>
            <Text style={styles.menuIcon}>📋</Text>

            <Text style={styles.menuTitle}>Pesanan Client</Text>

            <Text style={styles.menuDescription}>
              Melihat pesanan yang dilakukan client.
            </Text>
          </View>

          <View style={styles.adminCard}>
            <Text style={styles.menuIcon}>💬</Text>

            <Text style={styles.menuTitle}>Chat Client</Text>

            <Text style={styles.menuDescription}>
              Melayani pertanyaan dari client.
            </Text>
          </View>

          <Pressable
            style={styles.logoutButton}
            onPress={() => setScreen("welcome")}
          >
            <Text style={styles.buttonText}>Logout</Text>
          </Pressable>
        </View>
      </ScrollView>
    );
  }

  // =========================
  // HALAMAN PRINT
  // =========================

  if (screen === "print") {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.pageTitle}>🖨️ Print Dokumen</Text>

          <View style={styles.serviceBox}>
            <Text style={styles.sectionTitle}>Pilih Jenis Print</Text>

            <Pressable style={styles.optionButton}>
              <Text style={styles.optionText}>Print Hitam Putih</Text>
            </Pressable>

            <Pressable style={styles.optionButton}>
              <Text style={styles.optionText}>Print Warna</Text>
            </Pressable>

            <TextInput
              placeholder="Jumlah lembar"
              keyboardType="numeric"
              style={styles.input}
            />

            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Pilih Dokumen</Text>
            </Pressable>

            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Lanjut Checkout</Text>
            </Pressable>
          </View>

          <Pressable
            style={styles.backButton}
            onPress={() => setScreen("clientHome")}
          >
            <Text style={styles.backText}>← Kembali ke Home</Text>
          </Pressable>
        </View>
      </ScrollView>
    );
  }

  // =========================
  // HALAMAN FOTOCOPY
  // =========================

  if (screen === "photocopy") {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.pageTitle}>📄 Fotocopy</Text>

          <View style={styles.serviceBox}>
            <Text style={styles.sectionTitle}>Pilih Jenis Kertas</Text>

            <Pressable style={styles.optionButton}>
              <Text style={styles.optionText}>A4</Text>
            </Pressable>

            <Pressable style={styles.optionButton}>
              <Text style={styles.optionText}>F4</Text>
            </Pressable>

            <Text style={styles.sectionTitle}>Pilih Warna</Text>

            <Pressable style={styles.optionButton}>
              <Text style={styles.optionText}>Hitam Putih</Text>
            </Pressable>

            <Pressable style={styles.optionButton}>
              <Text style={styles.optionText}>Warna</Text>
            </Pressable>

            <TextInput
              placeholder="Jumlah lembar"
              keyboardType="numeric"
              style={styles.input}
            />

            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Pesan Fotocopy</Text>
            </Pressable>
          </View>

          <Pressable
            style={styles.backButton}
            onPress={() => setScreen("clientHome")}
          >
            <Text style={styles.backText}>← Kembali ke Home</Text>
          </Pressable>
        </View>
      </ScrollView>
    );
  }

  // =========================
  // HALAMAN STOCK
  // =========================

  if (screen === "stock") {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.pageTitle}>📦 Stock Barang</Text>

          <TextInput placeholder="Cari barang..." style={styles.input} />

          <Text style={styles.sectionTitle}>Daftar Barang</Text>

          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

          <Pressable
            style={styles.backButton}
            onPress={() => setScreen("clientHome")}
          >
            <Text style={styles.backText}>← Kembali ke Home</Text>
          </Pressable>
        </View>
      </ScrollView>
    );
  }

  return null;
}
