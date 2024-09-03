import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import SettingFirstScreen from './SettingFirstScreen';

export default function SettingsScreen() {

  return (
    <View style={styles.container}>
      <SettingFirstScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,   
  },
});
