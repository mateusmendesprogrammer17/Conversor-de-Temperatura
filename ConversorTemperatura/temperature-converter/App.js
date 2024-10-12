import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import FormTemperature from './components/formPicker';
import { useState } from 'react';

export default function App() {


  return (
    <View style={styles.container}>
 
      <StatusBar style="auto" />

     <FormTemperature/>
    </View>
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

