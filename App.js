const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './components/HomeScreen';
import BiodataScreen from './components/BiodataScreen';
import MahasiswaScreen from './components/MahasiswaScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Menu Utama' }}
        />
        <Stack.Screen name="Biodata" component={BiodataScreen} />
        <Stack.Screen name="Mahasiswa" component={MahasiswaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Untuk menerima req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect('mongodb://127.0.0.1:27017/siakad');


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Koneksi Gagal:')); 
db.once('open', function() { 
  console.log('Koneksi Sukses'); 
});

app.listen(port, () => {
  console.log(`Server berjalan pada port ${port}`);
});


