import { createContext, useContext, useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // 3. Görev: Yükleme Durumunu Yönetin (Başlangıçta true)
  const [loading, setLoading] = useState(true);

  // 1. Görev: Uygulama Başlangıcında Kullanıcıyı Yükleyin
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (e) {
        console.error("Kullanıcı yüklenirken hata:", e);
      } finally {
        // İşlem bittiğinde (başarılı veya hatalı) yüklemeyi durdur
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // 2. Görev: Değişiklikte Kullanıcıyı Kaydedin
  useEffect(() => {
    // Eğer uygulama henüz ilk yükleme aşamasındaysa, bu effect çalışmamalı.
    // Aksi takdirde, user henüz null iken AsyncStorage'ı silmeye çalışabilir.
    if (loading) return;

    const saveUser = async () => {
      try {
        if (user) {
          await AsyncStorage.setItem('user', JSON.stringify(user));
        } else {
          await AsyncStorage.removeItem('user');
        }
      } catch (e) {
        console.error("Kullanıcı kaydedilirken hata:", e);
      }
    };

    saveUser();
  }, [user, loading]);

  const login = (username) => setUser({ username });
  const logout = () => setUser(null);

  // 3. Görev Devamı: Depolama yüklenmeden önce loading ekranı göster
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});