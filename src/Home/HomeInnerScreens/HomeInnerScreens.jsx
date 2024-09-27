import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InitialTestScreen from './InitialTestScreen'; // Replace with actual path
import TestScreen from './TestScreen'; // Replace with actual path
import ResultsScreen from './ResultsScreen'; // Replace with actual path
import HomeIndex from '../HomeIndex'; // Replace with the actual path to HomeIndex
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useColorScheme } from 'react-native';
import { useGlobalState } from '../../GlobelStates/States';
import { useNavigationState } from '@react-navigation/native';

const HomeStack = createNativeStackNavigator();

const HomeScreen = () => {
  const { themeColor } = useGlobalState();
  const isDarkMode = useColorScheme() === 'dark';

  // Get the current navigation state
  const currentRouteName = useNavigationState(
    (state) => state.routes[state.index].name
  );

  useEffect(() => {
    // Hide the bottom tab if the user is on an inner screen
    if (['InitialTest', 'Test', 'Results'].includes(currentRouteName)) {
      setHideBottomTab(true);
    } else {
      setHideBottomTab(false); // Show the bottom tab on the Home screen
    }
  }, [currentRouteName]);

  return (
    <HomeStack.Navigator
      screenOptions={{
        presentation: 'card',
        animation: 'slide_from_right',
      }}
    >
      <HomeStack.Screen
        name="Home"
        component={HomeIndex}
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
      <HomeStack.Screen
        name="InitialTest"
        component={InitialTestScreen}
        options={{ headerShown: true }}
      />
      <HomeStack.Screen
        name="Test"
        component={TestScreen}
        options={{ headerShown: true }}
      />
      <HomeStack.Screen
        name="Results"
        component={ResultsScreen}
        options={{ headerShown: true }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeScreen;
