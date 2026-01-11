import { View, Text } from 'react-native';
export default function HomeScreen({ route }) {
const { username } = route.params;
return <Text>Welcome, {username}</Text>;
}