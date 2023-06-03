import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connectToDatabase } from './database';

function LoginPage() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    try {
      // Membuat koneksi ke database MongoDB
      const database = await connectToDatabase();

      // Memilih koleksi pengguna
      const usersCollection = database.collection('users');

      // Mencari pengguna berdasarkan username dan password
      const query = { username, password };
      const user = await usersCollection.findOne(query);

      if (user) {
        // Login berhasil
        Alert.alert('Login Berhasil');
        navigation.navigate('Home');
      } else {
        // Login gagal
        Alert.alert('Login Gagal', 'Username atau password salah');
      }
    } catch (error) {
      console.error('Terjadi kesalahan saat login:', error);
      Alert.alert('Terjadi Kesalahan', 'Gagal melakukan login');
    }
  }

  return (
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

export default LoginPage;
