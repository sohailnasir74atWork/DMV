import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FirstScreen from './FirstScreen';

export default function LearnScreen() {
  return (
    <View style={styles.container}>
      <FirstScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
});
