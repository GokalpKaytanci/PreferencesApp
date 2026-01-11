import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function HomeScreen({ navigation }) {
  // Context'ten user verisini ve logout fonksiyonunu çek
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout(); 
    navigation.replace('Login'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome, {user ? user.username : 'Guest'}</Text>
      
      <View style={styles.logoutContainer}>
        <Button title="Logout" onPress={handleLogout} color="red" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20, marginBottom: 20 },
  logoutContainer: { marginTop: 20 }
});