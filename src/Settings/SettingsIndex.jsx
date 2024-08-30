import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useGlobalState } from '../GlobelStates/States';

export default function SettingsScreen() {
  const { themeColor, setThemeColor, colorOptions } = useGlobalState(); // Access global state

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Theme Color:</Text>
      <View style={styles.colorOptions}>
        {Object.entries(colorOptions).map(([colorName, colorValue]) => (
          <Button
            key={colorName}
            title={colorName.charAt(0).toUpperCase() + colorName.slice(1)}
            onPress={() => setThemeColor(colorValue)}
            color={colorValue}
          />
        ))}
      </View>
      <Text style={[styles.currentColorText, { color: themeColor }]}>
        Current Theme Color: {themeColor}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  colorOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '80%',
  },
  currentColorText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
