
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';

import { styles } from '../constants/styles';

export default function PrintScreen() {
  const router = useRouter();

  const [jenisPrint, setJenisPrint] = useState('Hitam Putih');
  const [jumlah, setJumlah] = useState('');
  const [status, setStatus] = useState('Menyiapkan halaman...');

  useEffect(() => {
    setStatus('Halaman Print Dokumen siap digunakan.');

    return () => {
      console.log('Halaman Print Dokumen ditinggalkan.');
    };
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.pageTitle}>
          🖨️ Print Dokumen
        </Text>

        <Text>{status}</Text>

        <View style={styles.serviceBox}>
          <Text style={styles.sectionTitle}>
            Pilih Jenis Print
          </Text>

          <Pressable
            style={styles.optionButton}
            onPress={() => setJenisPrint('Hitam Putih')}
          >
            <Text style={styles.optionText}>
              {jenisPrint === 'Hitam Putih' ? '✓ ' : ''}
              Print Hitam Putih
            </Text>
          </Pressable>

          <Pressable
            style={styles.optionButton}
            onPress={() => setJenisPrint('Warna')}
          >
            <Text style={styles.optionText}>
              {jenisPrint === 'Warna' ? '✓ ' : ''}
              Print Warna
            </Text>
          </Pressable>

          <Text style={styles.sectionTitle}>
            Jumlah Lembar
          </Text>

          <TextInput
            placeholder="Jumlah lembar"
            keyboardType="numeric"
            style={styles.input}
            value={jumlah}
            onChangeText={setJumlah}
          />

          <Text>Jenis print: {jenisPrint}</Text>
          <Text>
            Jumlah lembar: {jumlah || 'Belum diisi'}
          </Text>
        </View>

        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backText}>
            ← Kembali
          </Text>
        </Pressable>

        <Pressable
          style={styles.backButton}
          onPress={() => router.replace('/')}
        >
          <Text style={styles.backText}>
            Selesai — Ke Halaman Utama
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
