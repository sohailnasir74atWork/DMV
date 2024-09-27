import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, useColorScheme } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LearnScreen from './src/Learn/LearnIndex';
import ReviewScreen from './src/Review/ReviewIndex';
import SettingsScreen from './src/Settings/SettingsIndex';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useGlobalState } from './src/GlobelStates/States';
import TutorialScreen from './src/Home/Tutorial';
import HomeIndex from './src/Home/HomeIndex';
import InitialTestScreen from './src/Home/HomeInnerScreens/InitialTestScreen';
import TestScreen from './src/Home/HomeInnerScreens/TestScreen';
import ResultsScreen from './src/Home/HomeInnerScreens/ResultsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Create the Bottom Tab Navigator
const BottomTabNavigator = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const { themeColor } = useGlobalState();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Home':
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
        tabBarStyle:{height:70},
        tabBarLabelStyle:{marginBottom:20},
        tabBarIconStyle:{marginTop:10}
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeIndex}
        options={{
          headerShown: true,
          headerStyle:{backgroundColor:isDarkMode ? Colors.black : Colors.lighter, height:80},
          headerTitleStyle: {
            fontSize: 24,
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
                onPress={() => alert('Car Icon Pressed!')}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen name="Learn" component={LearnScreen} />
      <Tab.Screen name="Review" component={ReviewScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

// Main App Stack Navigator
const AppStackNavigator = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const { themeColor } = useGlobalState();

  return (
    <Stack.Navigator
      screenOptions={{
        presentation: 'card',
        animation: 'slide_from_right',
        headerStyle: {
          backgroundColor: isDarkMode ? Colors.black : Colors.lighter,
        },
        headerTitleStyle: {
          fontSize: 28,
          fontWeight: 'bold',
          color: isDarkMode ? Colors.lighter : Colors.black,
        },
      }}
    >
      {/* Main Bottom Tab Navigator */}
      <Stack.Screen
        name="MainTabs"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      {/* Nested Screens that will hide the Bottom Tab */}
      <Stack.Screen
        name="Warm Up"
        component={InitialTestScreen}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Test"
        component={TestScreen}
        options={{ headerShown: false }}

      />
      <Stack.Screen
        name="Results"
        component={ResultsScreen}
        options={{ headerShown: false }}

      />
    </Stack.Navigator>
  );
};

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const { themeColor } = useGlobalState();

  // Define a custom theme that dynamically adjusts based on light or dark mode
  const CustomTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: isDarkMode ? Colors.darker : Colors.lighter,
      text: isDarkMode ? Colors.white : '#000000',
    },
  };

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : CustomTheme}>
      <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? Colors.darker : Colors.lighter }]}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={isDarkMode ? Colors.black : Colors.lighter}
        />
        <AppStackNavigator />
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
