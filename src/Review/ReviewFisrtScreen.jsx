import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // For using Ionicons if needed
import CustomText from '../Helper/MyText'; // Assuming you have a custom text component
import { useGlobalState } from '../GlobelStates/States';

const ReviewFirstScreen = () => {
    const {themeColor} = useGlobalState()
  return (
    <View style={styles.container}>
      {/* Title */}
      <CustomText style={styles.title}>Unmastered Questions</CustomText>

      {/* Center content: Icon and Messages */}
      <View style={styles.centerContent}>
        <Ionicons name="school" size={140} color={themeColor} />
        <CustomText style={styles.message}>Nothing here yet 👏</CustomText>
        <CustomText style={styles.subMessage}>
          As you take the tests, questions you could not get right will show up here.
        </CustomText>
      </View>

      {/* Practice More Button */}
      <TouchableOpacity style={[styles.button, {    backgroundColor: themeColor,
}]}>
        <Text style={styles.buttonText}>Practice More</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
    position: 'absolute',
    top: 50, // Adjust top as needed
    left: 0,
    right: 0,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  message: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  subMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  button: {
    position: 'absolute',
    bottom: 30, // Adjust bottom as needed
    left: 20,
    right: 20,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default ReviewFirstScreen;
