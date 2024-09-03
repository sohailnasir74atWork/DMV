// CustomText.js
import React from 'react';
import { Text, StyleSheet, useColorScheme } from 'react-native';

// Custom Text component that applies default styles
const CustomText = ({ style, children, ...props }) => {
  const isDarkMode = useColorScheme() === 'dark'; // Detect system color scheme
  return (
    <Text
      style={[
        styles.defaultText, // Apply default styles
        isDarkMode ? styles.textDark : styles.textLight, // Apply dynamic color based on theme
        style, // Merge additional styles passed as props
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  defaultText: {
    fontSize: 14, // Set default font size
  },
  textLight: {
    color: '#000000', // Black text color for light mode
  },
  textDark: {
    color: '#FFFFFF', // White text color for dark mode
  },
});

export default CustomText;
