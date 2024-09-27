import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ style, children, ...props }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8} // Slight opacity reduction on press
      style={[styles.button, style]} // Apply default button styles and any custom styles
      {...props}
    >
      <Text>{children}</Text> 
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12, // Vertical padding
    paddingHorizontal: 20, // Horizontal padding
    borderRadius: 8, // Rounded corners
    justifyContent: 'center',
    alignItems: 'center',
  },

});

export default CustomButton;
