import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Title from './src/Components/Title';

export default function App() {
  return (
    <View style={styles.container}>
      <Title />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0E5E5',
    paddingTop:80,
  },
});
