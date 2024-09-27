import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomText from '../Helper/MyText';
import Ui12 from '../Assets/image/examsSimulation.svg'; // Import the SVG
import { useGlobalState } from '../GlobelStates/States';

const ExamSimulator = () => {
  // Use the hook to get the global state
  const { imgBgColor } = useGlobalState();

  return (
    <View style={styles.examSimulatorContainer}>
      <CustomText style={styles.examSimulatorTitle}>Exam Simulator</CustomText>

      {/* Wrapper around SVG to control size, alignment, and border radius */}
      <View style={[styles.imageWrapper, { backgroundColor: imgBgColor }]}>
        <Ui12 width="100%" height="100%" />
      </View>
      <CustomText style={styles.title}>Exam Simulator</CustomText>
      <CustomText style={styles.examDescription}>30 Questions</CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  examSimulatorContainer: {
    marginVertical: 28,
  },
  examSimulatorTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  imageWrapper: {
    width: '100%', // Make full width
    aspectRatio: 1.5,
    marginBottom: 8,
    borderRadius: 10,
    overflow: 'hidden', // Ensure the SVG is clipped to fit within the rounded corners
    justifyContent: 'center', // Center the content horizontally
    alignItems: 'center', // Center the content vertically
  },
  examDescription: {
    fontSize: 14,
  },
  title: {
    fontSize: 18,
  },
});

export default ExamSimulator;
