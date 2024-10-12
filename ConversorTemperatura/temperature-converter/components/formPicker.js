import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Form = () => {
  const [temperature, setTemperature] = useState('');
  const [result, setResult] = useState('');
  const [fromUnit, setFromUnit] = useState('Celsius');
  const [toUnit, setToUnit] = useState('Celsius');

  const celsiusToFahrenheit = (temp) => (temp * 9 / 5) + 32;
  const fahrenheitToCelsius = (temp) => (temp - 32) * 5 / 9;
  const celsiusToKelvin = (temp) => temp + 273.15;
  const kelvinToCelsius = (temp) => temp - 273.15;
  const fahrenheitToKelvin = (temp) => (temp - 32) / 1.8 + 273.15;
  const kelvinToFahrenheit = (temp) => (temp - 273.15) * 1.8 + 32;

  useEffect(() => {
    showResult();
  }, [temperature, fromUnit, toUnit]);

  const showResult = () => {
    let convertedTemp;

    const temp = Number.parseFloat(temperature);
    if (isNaN(temp)) {
      setResult('');
      return;
    }

    switch (fromUnit) {
      case 'Celsius':
        if (toUnit === 'Fahrenheit') {
          convertedTemp = celsiusToFahrenheit(temp);
        } else if (toUnit === 'Kelvin') {
          convertedTemp = celsiusToKelvin(temp);
        }
        break;
      case 'Fahrenheit':
        if (toUnit === 'Celsius') {
          convertedTemp = fahrenheitToCelsius(temp);
        } else if (toUnit === 'Kelvin') {
          convertedTemp = fahrenheitToKelvin(temp);
        }
        break;
      case 'Kelvin':
        if (toUnit === 'Celsius') {
          convertedTemp = kelvinToCelsius(temp);
        } else if (toUnit === 'Fahrenheit') {
          convertedTemp = kelvinToFahrenheit(temp);
        }
        break;
      default:
        break;
    }

    setResult(convertedTemp);
  };

  const unitSymbol = {
    Celsius: '°C',
    Fahrenheit: '°F',
    Kelvin: '°K',
  };

  const displayResult = (temperature !== '' && !Number.isNaN(Number.parseFloat(result)))
    ? `${result.toFixed(2)} ${unitSymbol[toUnit]}`
    : '';

  const backgroundColor = displayResult ? "#008000" : "transparent";
  return (
    <View style={styles.container}>
     <View style={styles.div}>
           <Text style={styles.help}>Selecione as unidades de conversão:</Text>
      <Text></Text>
      <Picker
        selectedValue={fromUnit}
        style={styles.picker}
        onValueChange={(itemValue) => setFromUnit(itemValue)}
      >
        <Picker.Item label='Celsius' value='Celsius' />
        <Picker.Item label="Kelvin" value="Kelvin" />
        <Picker.Item label="Fahrenheit" value="Fahrenheit" />
      </Picker>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={temperature}
        placeholder="Temperatura:"
        onChangeText={(text) => setTemperature(text)}
      />

      <Picker
        selectedValue={toUnit}
        style={styles.picker}
        onValueChange={(itemValue) => setToUnit(itemValue)}
      >
        <Picker.Item label='Celsius' value='Celsius' />
        <Picker.Item label="Kelvin" value="Kelvin" />
        <Picker.Item label="Fahrenheit" value="Fahrenheit" />
      </Picker>

      <Text style={[styles.result,{backgroundColor}]}>{displayResult}</Text>

     </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    margin: 15,
    marginVertical: 10,
  },
  help: {
    fontSize: 18,
  },
  label: {
    fontSize: 18,
    marginVertical: 8,
  },
  picker: {
    height: 50,
    width: "100%",
    marginVertical: 8,
    color: "white",
    backgroundColor: "#008000", // Cor de fundo verde
    borderRadius: 20, // Arredondando as bordas
    overflow: 'hidden', // Para garantir que os itens não fiquem cortados
  },
  input: {
    height: 50,
    borderColor: '#008000',
    borderWidth: 2,
    marginVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 10, // Arredondando as bordas do input
  },
  result: {
    height: 40,
    textAlign: "center",
    color: "white",
    fontSize: 24,
    marginTop: 20,
  },
});

export default Form;
