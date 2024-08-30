import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import TutorialScreen from './Tutorial';
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* <Text style={{ color: Colors.error}}>Hello, World!</Text> */}
      <TutorialScreen/>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
