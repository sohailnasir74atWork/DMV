import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const TestScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Initial Test Screen</Text>
      <Text style={styles.description}>This is a placeholder for the Initial Test Screen.</Text>
      
      {/* Button to navigate to the next screen */}
      <Button
        title="Start Test"
        onPress={() => navigation.navigate('Results')}
        color="#007BFF"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 30,
    textAlign: 'center',
  },
});

export default TestScreen;
