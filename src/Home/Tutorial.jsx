// TutorialComponent.js
import React from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

// Screens Data
const screens = [
  {
    id: '1',
    title: 'Effective',
    description: '96% of users pass the exam on the first try',
    // image: require('./assets/tutorial1.png'), // Replace with your image path
  },
  {
    id: '2',
    title: 'Convenient',
    description: 'Learn at your own pace from anywhere',
    // image: require('./assets/tutorial2.png'), // Replace with your image path
  },
  {
    id: '3',
    title: 'Comprehensive',
    description: 'All the materials you need to succeed',
    // image: require('./assets/tutorial3.png'), // Replace with your image path
  },
  {
    id: '4',
    title: 'Certified',
    description: 'Get certified with our trusted courses',
    // image: require('./assets/tutorial4.png'), // Replace with your image path
  },
];

// Tutorial Screen Component
const TutorialScreen = ({ navigation, route }) => {
  const { screen } = route.params;

  const handleNext = () => {
    const nextScreenIndex = screens.findIndex((s) => s.id === screen.id) + 1;
    if (nextScreenIndex < screens.length) {
      navigation.navigate('TutorialSlide', { screen: screens[nextScreenIndex] });
    } else {
      alert('Tutorial Finished');
    }
  };

  const handleSkip = () => {
    alert('Skipped'); // Handle skip logic
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Skip button */}
      <View style={styles.skipContainer}>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.slide}>
        <Image source={screen.image} style={styles.image} />
        <Text style={styles.title}>{screen.title}</Text>
        <Text style={styles.description}>{screen.description}</Text>
      </View>

      {/* Next button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Stack Navigator for Tutorial
const Stack = createStackNavigator();

const TutorialNavigator = () => (
  <Stack.Navigator
    initialRouteName="TutorialSlide"
    screenOptions={{ ...TransitionPresets.SlideFromRightIOS, headerShown: false }}
  >
    {screens.map((screen) => (
      <Stack.Screen
        key={screen.id}
        name="TutorialSlide"
        component={TutorialScreen}
        initialParams={{ screen }}
      />
    ))}
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  skipContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  skipText: {
    fontSize: 16,
    color: '#007AFF',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '70%',
    height: '40%',
    resizeMode: 'contain',
    marginVertical: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default TutorialNavigator;
