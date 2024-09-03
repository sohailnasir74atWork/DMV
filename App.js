import React, { useState } from 'react';
import { SafeAreaView, StatusBar, View, StyleSheet, useColorScheme } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LearnScreen from './src/Learn/LearnIndex';
import ReviewScreen from './src/Review/ReviewIndex';
import SettingsScreen from './src/Settings/SettingsIndex';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { GlobalProvider, useGlobalState } from './src/GlobelStates/States';
import TutorialScreen from './src/Home/Tutorial';
import HomeScreen from './src/Home/HomeInnerScreens/HomeInnerScreens';

const Tab = createBottomTabNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const { themeColor } = useGlobalState();

  // Define a custom theme that dynamically adjusts based on light or dark mode
  const CustomTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: isDarkMode ? Colors.darker : Colors.lighter, // White for light mode background
      text: isDarkMode ? Colors.white : '#000000', // Black text color for light mode
    },
  };

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : CustomTheme}>
      <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? Colors.darker : Colors.lighter }]}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={isDarkMode ? Colors.darker : Colors.lighter}
        />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              switch (route.name) {
                case 'HomeIndex':
                  iconName = 'car-sport';
                  break;
                case 'Learn':
                  iconName = 'book';
                  break;
                case 'Settings':
                  iconName = 'settings';
                  break;
                case 'Review':
                  iconName = 'refresh-circle';
                  break;
                default:
                  iconName = 'alert-circle';
                  break;
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: themeColor,
            tabBarStyle: {
              height: 60,
              justifyContent: 'center',
              alignItems: 'center',
              display: route.name === 'HomeIndex' ? 'flex' : 'none', // Show tab bar only on HomeIndex
            },
            tabBarIconStyle: {
              marginTop: 10,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              paddingBottom: 10,
            },
            headerShown: route.name === 'Learn' || route.name === 'Settings' ? true : false,
            headerStyle: {
              backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
            },
            headerTitleStyle: {
              alignSelf: 'flex-end',
              fontSize: 28,
              fontWeight: 'bold',
            },
            headerTintColor: isDarkMode ? Colors.lighter : Colors.black,
          })}
        >
          <Tab.Screen name="HomeIndex" component={HomeScreen} />
          <Tab.Screen name="Learn" component={LearnScreen} />
          <Tab.Screen name="Review" component={ReviewScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function AppWrapper() {
  const [guide, setGuide] = useState(true);

  return (
    <>
      {guide ? (
        <TutorialScreen setGuide={setGuide} />
      ) : (
        <App />
      )}
    </>
  );
}
