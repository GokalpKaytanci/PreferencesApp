import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useTheme() {
  const [theme, setTheme] = useState('light');

  // Hook ilk çağrıldığında hafızadaki temayı yükle
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const stored = await AsyncStorage.getItem('theme');
        if (stored) {
          setTheme(stored);
        }
      } catch (e) {
        console.error('Tema yüklenirken hata:', e);
      }
    };
    
    loadTheme();
  }, []);

  // Temayı değiştir ve hafızaya kaydet
  const toggleTheme = async () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next); // UI'ı güncelle
    try {
      await AsyncStorage.setItem('theme', next); // Hafızayı güncelle
    } catch (e) {
      console.error('Tema kaydedilirken hata:', e);
    }
  };

  return { theme, toggleTheme };
}