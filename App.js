import React from 'react';
import { SafeAreaView, StatusBar, useColorScheme, View, StyleSheet } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './src/Home/HomeIndex';
import LearnScreen from './src/Learn/LearnIndex';
import ReviewScreen from './src/Review/ReviewIndex';
import SettingsScreen from './src/Settings/SettingsIndex';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { GlobalProvider, useGlobalState } from './src/GlobelStates/States';

const Tab = createBottomTabNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const { themeColor } = useGlobalState(); // Access global state

  const primaryColor = Colors.primary || '#007AFF'; // Define the primary color

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <SafeAreaView style={[styles.container, backgroundStyle]}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={isDarkMode ? Colors.darker : Colors.lighter}
        />
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
            headerShown:false,
            tabBarActiveTintColor: themeColor, // Apply primary color to active icons and labels
            tabBarStyle: {
              height: 60, // Set the fixed height for the bottom tab bar
              justifyContent: 'center',
              alignItems: 'center',
            },
            tabBarIconStyle: {
              marginTop: 10,
            },
            tabBarLabelStyle: {
              fontSize: 12, // Optional: Adjust font size if needed
              paddingBottom: 10, // Add padding to align the label with the icon
            },
           
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
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
  return (
    <GlobalProvider>
      <App />
    </GlobalProvider>
  );
}
