import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';

const LoadingScreen = () => {
  // Create a new Animated.Value to control the scale of the icon and position of the loading bar
  const scale = useRef(new Animated.Value(1)).current;
  const loadingProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Define a loop for the pulsing animation
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.2, // Scale up to 1.2x
          duration: 1000, // Duration for scale up
          useNativeDriver: true, // Use native driver for better performance
        }),
        Animated.timing(scale, {
          toValue: 1, // Scale back down to original size
          duration: 1000, // Duration for scale down
          useNativeDriver: true,
        }),
      ])
    );

    // Define a loop for the loading bar animation
    const loading = Animated.loop(
      Animated.sequence([
        Animated.timing(loadingProgress, {
          toValue: 1, // Slide to the end
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(loadingProgress, {
          toValue: 0, // Slide back to the start
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );

    // Start both animations
    pulse.start();
    loading.start();

    // Clean up animations on unmount
    return () => {
      pulse.stop();
      loading.stop();
    };
  }, [scale, loadingProgress]);

  // Convert the progress to a translateX value
  const loadingBarTranslateX = loadingProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 100], // Numeric range for translation
  });

  return (
    <View style={styles.container}>
      {/* Pulsing Icon */}
      <Animated.Image
        source={require('../Assets/UI/logo.png')} // Replace with your icon path
        style={[styles.icon, { transform: [{ scale }] }]} // Apply scale animation
      />

      {/* Loading Bar */}
      <View style={styles.loadingBarContainer}>
        <Animated.View
          style={[
            styles.loadingBar,
            { transform: [{ translateX: loadingBarTranslateX }] },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Background color
  },
  icon: {
    width: 100, // Adjust size as needed
    height: 100,
    marginBottom: 30, // Margin to separate from loading bar
  },
  loadingBarContainer: {
    width: '80%', // Adjust width as needed
    height: 4, // Adjust height for thickness
    backgroundColor: '#e0e0e0', // Background color of the loading bar container
    overflow: 'hidden',
    borderRadius: 2, // Rounded corners for the loading bar
  },
  loadingBar: {
    width: '100%',
    height: '100%',
    backgroundColor: '#007AFF', // Color of the loading bar
    borderRadius: 2, // Rounded corners for the loading bar
  },
});

export default LoadingScreen;
