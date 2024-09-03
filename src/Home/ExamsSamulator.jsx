import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomText from '../Helper/MyText';
import Ui12 from '../Assets/ui12.imageset/ui12.svg'; // Import the SVG

const ExamSimulator = () => (
  <View style={styles.examSimulatorContainer}>
    <CustomText style={styles.examSimulatorTitle}>Exam Simulator</CustomText>

    {/* Wrapper around SVG to control size and alignment */}
    <View style={styles.imageWrapper}>
      <Ui12 width="100%" height="100%"/>
    </View>
    <CustomText style={styles.title}>Exam Simulator</CustomText>
    <CustomText style={styles.examDescription}>30 Questions</CustomText>
  </View>
);

const styles = StyleSheet.create({
  examSimulatorContainer: {
    marginVertical: 24,
  },
  examSimulatorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  imageWrapper: {
    width: '100%', // Make full width
    aspectRatio:1.5,
    marginBottom: 8,
    borderRadius:10,
    justifyContent: 'center', // Center the content horizontally
    alignItems: 'center', // Center the content vertically
    backgroundColor:'#F5F5F5'
  },
  examDescription: {
    fontSize: 14,
  },
  title: {
    fontSize: 16,
  },
});

export default ExamSimulator;
