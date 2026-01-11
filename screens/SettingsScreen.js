import { View, Text, Button, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme'; 

export default function SettingsScreen() {
  // Hook'tan gelen verileri alıyoruz
  const { theme, toggleTheme } = useTheme();

  // Temaya göre dinamik stil tanımları
  const containerStyle = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme === 'light' ? '#ffffff' : '#333333', // Açıkta beyaz, koyuda gri
  };

  const textStyle = {
    fontSize: 20,
    marginBottom: 20,
    color: theme === 'light' ? '#000000' : '#ffffff', // Açıkta siyah, koyuda beyaz
  };

  return (
    <View style={containerStyle}>
      <Text style={textStyle}>Current Theme: {theme.toUpperCase()}</Text>
      
      <Button 
        title="Change Theme" 
        onPress={toggleTheme} 
      />
    </View>
  );
}

// Sabit stiller için StyleSheet kullanmaya devam edebiliriz
// Ancak renkleri yukarıda dinamik olarak verdik.
const styles = StyleSheet.create({});