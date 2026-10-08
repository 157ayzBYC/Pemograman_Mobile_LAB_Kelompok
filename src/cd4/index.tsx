import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Ionicons name="information-circle" size={40} color="#2563eb" />

        <Text style={styles.title}>Hello World</Text>

        <TextInput placeholder="Type here..." style={styles.input} />

        <View style={styles.button}>
          <Ionicons name="hand-left" size={20} color="white" />

          <Text style={styles.buttonText}>Click Me</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0f2fe",
    justifyContent: "center",
    padding: 20,
  },

  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "red",
    marginBottom: 20,
  },

  input: {
    width: "100%",
    borderWidth: 2,
    borderColor: "blue",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },

  button: {
    width: "100%",
    backgroundColor: "#2563eb",
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
