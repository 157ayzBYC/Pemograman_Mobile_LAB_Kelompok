
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Study Suplay',
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="print"
        options={{
          title: 'Print Dokumen',
        }}
      />

      <Stack.Screen
        name="explore"
        options={{
          title: 'Explore',
        }}
      />
    </Stack>
  );
}
