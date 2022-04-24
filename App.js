import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
export default function App() {
  return (
    <NavigationContainer>
    <View style={styles.container}>
      <Text>Hola mundsdasdaso!</Text>
      <Text>Hola mundsdasdaso!</Text>
      <Text>Hola mundsdasdaso!</Text>
      <Text>Hola mundsdasdaso!</Text>
      <Text>Hola mundsdasdaso!</Text>
      <Text>Hola mundsdasdaso!</Text>
      <StatusBar style="auto" />
    </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
