import React, { createContext, useState, useContext } from 'react';
import { useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

// Define the colors that are available for theming
const colorOptions = {
  pink: '#FF2D55',
  cyan: '#00C7BE',
  blue: '#007AFF',
  purple: '#5856D6',
  indigo: '#5E5CE6',
  orange: '#FF9500',
  mint: '#00D084',
  teal: '#30B0C7',
};

// Create a context with a default value
const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  // Define all your global states here
  const [themeColor, setThemeColor] = useState(colorOptions.blue); // Default theme color
  const [userName, setUserName] = useState(''); // Example: User's name
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Example: Authentication state
  const isDarkMode = useColorScheme() === 'dark';
  const imgBgColor = isDarkMode ? Colors.darker : '#E0E0E0';
  const scondaryBgColor = isDarkMode ? '#070F2B' : '#e6f2ff';
  const whiteBgColor = isDarkMode ? Colors.darker : 'white';
  const textColor = isDarkMode ? 'white' : 'black';


  // Provide a central place to manage all states
  const value = {
    themeColor,
    isDarkMode,
    imgBgColor,
    scondaryBgColor,
    textColor,
    whiteBgColor,
    setThemeColor,
    colorOptions, // Adding color options to the context
    userName,
    setUserName,
    isLoggedIn,
    setIsLoggedIn,
    // Add more state variables and their setters as needed
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the GlobalContext
export const useGlobalState = () => {
  return useContext(GlobalContext);
};