import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useGlobalState } from '../GlobelStates/States';
import CustomText from '../Helper/MyText';
import Ui1 from "../Assets/ui1.imageset/ui1.svg"; // Correctly import SVG
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const JourneyComponent = () => {
  const [progress, setProgress] = useState(0.2);
  const { themeColor, imgBgColor, scondaryBgColor } = useGlobalState();
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <CustomText style={{ fontWeight: 'bold' }}>Start your journey here</CustomText>

      {/* Image Container with borderRadius */}
      <TouchableOpacity 
        style={styles.imageWrapper} 
        onPress={() => navigation.navigate('Test')} // Correctly handle navigation
      >
        <Ui1 style={[styles.image, {backgroundColor: imgBgColor}]} />
      </TouchableOpacity>

      <CustomText style={styles.subtitle}>Warm up</CustomText>
      <CustomText style={styles.description}>Warm up by taking a short test</CustomText>

      <CustomText style={styles.gaugeTitle}>Exam Success Gauge</CustomText>

      <View style={[styles.gaugeContainer, {backgroundColor:scondaryBgColor}]}>
        <CustomText style={styles.readinessText}>
          Your Readiness: {Math.round(progress * 100)}%
        </CustomText>
        <View style={styles.progressWrapper}>
          <View style={styles.trackBackground}>
            <View style={[styles.filledTrack, { width: `${progress * 100}%`, backgroundColor: '#34C759' }]} />
          </View>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            value={progress}
            onValueChange={(value) => setProgress(value)}
            minimumTrackTintColor="transparent"
            maximumTrackTintColor="transparent"
            thumbTintColor="transparent"
            disabled
          />
          <FontAwesome5
            name="car-side"
            size={22}
            color={themeColor}
            style={[styles.carIcon, { left: `${progress * 97}%` }]}
          />
        </View>
        <CustomText style={styles.progressDescription}>
          Welcome! Start practicing to begin your journey towards passing the test.
        </CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  imageWrapper: {
    width: '100%',
    aspectRatio: 1.5,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  description: {
    marginBottom: 14,
  },
  gaugeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  gaugeContainer: {
    width: '100%',
    paddingHorizontal: 4,
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  readinessText: {
    fontSize: 16,
    marginVertical: 10,
  },
  progressWrapper: {
    width: '90%',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 10,
  },
  slider: {
    width: '100%',
    height: 10,
    position: 'absolute',
    top: -2,
  },
  trackBackground: {
    width: '100%',
    height: 10,
    backgroundColor: '#CFD8DC',
    borderRadius: 10,
    overflow: 'hidden',
  },
  filledTrack: {
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  carIcon: {
    position: 'absolute',
    zIndex: 1,
    top: -8,
  },
  progressDescription: {
    fontSize: 18,
    textAlign: 'left',
    lineHeight: 30,
  },
});

export default JourneyComponent;
