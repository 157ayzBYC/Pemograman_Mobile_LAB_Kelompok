import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // =========================
  // UMUM
  // =========================

  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  // =========================
  // LOGIN / REGISTER
  // =========================

  authContainer: {
    flex: 1,
    backgroundColor: "#2563eb",
    justifyContent: "center",
    padding: 20,
  },

  authScroll: {
    flexGrow: 1,
    justifyContent: "center",
  },

  authBox: {
    backgroundColor: "white",
    padding: 25,
    borderRadius: 20,
  },

  logo: {
    fontSize: 50,
    textAlign: "center",
    marginBottom: 10,
  },

  authTitle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },

  authSubtitle: {
    textAlign: "center",
    color: "#666",
    marginTop: 10,
    marginBottom: 20,
    lineHeight: 20,
  },

  chooseTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  registerText: {
    textAlign: "center",
    marginTop: 20,
    color: "#555",
  },

  link: {
    textAlign: "center",
    color: "#2563eb",
    fontWeight: "bold",
    marginTop: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    padding: 12,
    marginTop: 10,
    backgroundColor: "white",
  },

  // =========================
  // BUTTON
  // =========================

  button: {
    backgroundColor: "#2563eb",
    padding: 13,
    borderRadius: 10,
    marginTop: 15,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },

  logoutButton: {
    backgroundColor: "#dc2626",
    padding: 13,
    borderRadius: 10,
    marginTop: 25,
  },

  backButton: {
    padding: 15,
    marginTop: 10,
  },

  backText: {
    color: "#2563eb",
    textAlign: "center",
    fontWeight: "bold",
  },

  // =========================
  // HEADER
  // =========================

  header: {
    backgroundColor: "#2563eb",
    padding: 20,
    borderRadius: 18,
    marginBottom: 20,
  },

  adminHeader: {
    backgroundColor: "#111827",
    padding: 20,
    borderRadius: 18,
    marginBottom: 20,
  },

  headerTitle: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },

  headerText: {
    color: "white",
    marginTop: 8,
    fontSize: 15,
  },

  // =========================
  // MENU CLIENT
  // =========================

  menuCard: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 15,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },

  menuIcon: {
    fontSize: 35,
    marginRight: 15,
  },

  menuTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },

  menuDescription: {
    color: "#666",
    marginTop: 5,
  },

  // =========================
  // ADMIN
  // =========================

  adminCard: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 2,
  },

  // =========================
  // SERVICE
  // =========================

  serviceBox: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 15,
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    marginTop: 5,
  },

  pageTitle: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 15,
  },

  optionButton: {
    borderWidth: 1,
    borderColor: "#2563eb",
    borderRadius: 10,
    padding: 13,
    marginTop: 10,
  },

  optionText: {
    color: "#2563eb",
    textAlign: "center",
    fontWeight: "bold",
  },

  // =========================
  // PRODUCT
  // =========================

  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
  },

  productName: {
    fontSize: 18,
    fontWeight: "bold",
  },

  category: {
    color: "#666",
    marginTop: 5,
  },

  price: {
    color: "#2563eb",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },

  stock: {
    color: "#333",
    marginTop: 5,
  },
});
