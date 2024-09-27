import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { data } from '../Helper/Data';
import { testData } from '../Helper/Logic/TestData';

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
  const [hideBottomTab, setHideBottomTab] = useState(false); // Example: Authentication state
  const isDarkMode = useColorScheme() === 'dark';
  const imgBgColor = isDarkMode ? Colors.darker : '#EBEBEB';
  const scondaryBgColor = isDarkMode ? '#070F2B' : '#e6f2ff';
  const whiteBgColor = isDarkMode ? Colors.darker : 'white';
  const textColor = isDarkMode ? 'white' : 'black';
  const [started, setStarted] = useState([]);
  ////////////////////////////////////////////////
  const [mode, setMode] = useState('easy'); // Default theme color
console.log(started)
  const [activeTest, setActiveTest] = useState({
    id: 1,
    description: testData[0].description,
    img: testData[0].items[0].image,
    level: testData[0].sectionTitle
  })


  //logics
  const easy = data.filter(
    (question) => question.difficulty === "Easy"
  );
  const medium = data.filter(
    (question) => question.difficulty === "Medium"
  );
  const hard = data.filter(
    (question) => question.difficulty === "Hard"
  );


  // Provide a central place to manage all states
  const value = {
    themeColor,
    isDarkMode,
    imgBgColor,
    scondaryBgColor,
    textColor,
    whiteBgColor,
    setThemeColor,
    hideBottomTab,
    setHideBottomTab,
    colorOptions,
    medium,
    hard,
    activeTest,
    setActiveTest,
    started,
    setStarted
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