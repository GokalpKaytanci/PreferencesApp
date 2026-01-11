import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
export default function LoginScreen({ navigation }) {
const [username, setUsername] = useState('');
const handleLogin = () => {
if (!username.trim()) return;
navigation.replace('Home', { username });
};
return (
<View style={styles.container}>
<Text style={styles.title}>Login</Text>
<TextInput
placeholder="Enter username"
value={username}
onChangeText={setUsername}
style={styles.input}
/>
<Pressable style={styles.button} onPress={handleLogin}>
<Text style={styles.buttonText}>Login</Text>
</Pressable>
</View>
);
}