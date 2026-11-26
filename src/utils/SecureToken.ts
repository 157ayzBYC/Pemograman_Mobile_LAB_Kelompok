
import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "study_suplay_user_token";

// 1. Menyimpan token secara terenkripsi
export async function saveAuthToken(token: string): Promise<void> {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
}

// 2. Mengambil token ketika aplikasi dibuka
export async function getAuthToken(): Promise<string | null> {
  return await SecureStore.getItemAsync(TOKEN_KEY);
}

// 3. Menghapus token ketika logout
export async function deleteAuthToken(): Promise<void> {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}
