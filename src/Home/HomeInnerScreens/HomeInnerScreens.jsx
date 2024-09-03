import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InitialTestScreen from './InitialTestScreen'; // Replace with actual path
import TestScreen from './TestScreen'; // Replace with actual path
import ResultsScreen from './ResultsScreen'; // Replace with actual path
import HomeIndex from '../HomeIndex'; // Replace with the actual path to HomeIndex
import { Colors } from 'react-native/Libraries/NewAppScreen'; // Import Colors if needed
import { useColorScheme } from 'react-native';
import { useGlobalState } from '../../GlobelStates/States';

const HomeStack = createNativeStackNavigator();

const HomeScreen = () => {
  const { themeColor } = useGlobalState();
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <HomeStack.Navigator
      screenOptions={{
        presentation: 'card', // Use 'card' for standard screen transitions
        animation: 'slide_from_right', // Customize animation style if needed
      }}
    >
      {/* Main Home Screen */}
      <HomeStack.Screen 
        name="Home" 
        component={HomeIndex} 
        options={{
          headerShown: true, // Show header for Home screen
          headerStyle: {
            backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
          },
          headerTitleStyle: {
            fontSize: 28,
            fontWeight: 'bold',
            color: isDarkMode ? Colors.lighter : Colors.black,
          },
          headerRight: () => (
            <View
              style={{
                width: 34,
                height: 34,
                borderRadius: 17,
                backgroundColor: themeColor,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10,
              }}
            >
              <Ionicons
                name="car-sport"
                size={24}
                color={isDarkMode ? Colors.darker : Colors.white}
                onPress={() => alert('Icon Pressed!')}
              />
            </View>
          ),
        }}
      />

      {/* Nested Screens */}
      <HomeStack.Screen 
        name="InitialTest" 
        component={InitialTestScreen} 
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
          },
          headerTitleStyle: {
            fontSize: 28,
            fontWeight: 'bold',
            color: isDarkMode ? Colors.lighter : Colors.black,
          },
        }} 
      />
      <HomeStack.Screen 
        name="Test" 
        component={TestScreen} 
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
          },
          headerTitleStyle: {
            fontSize: 28,
            fontWeight: 'bold',
            color: isDarkMode ? Colors.lighter : Colors.black,
          },
        }} 
      />
      <HomeStack.Screen 
        name="Results" 
        component={ResultsScreen} 
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
          },
          headerTitleStyle: {
            fontSize: 28,
            fontWeight: 'bold',
            color: isDarkMode ? Colors.lighter : Colors.black,
          },
        }} 
      />
    </HomeStack.Navigator>
  );
};

export default HomeScreen;
