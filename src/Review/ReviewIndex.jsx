import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ReviewFirstScreen from './ReviewFisrtScreen';

export default function ReviewScreen() {
  return (
    <View style={styles.container}>
      <ReviewFirstScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
});
