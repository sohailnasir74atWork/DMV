import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Animated } from 'react-native';
import { useGlobalState } from '../GlobelStates/States';

const WarningDialog = ({ visible, onClose, onReset }) => {
  const slideAnim = React.useRef(new Animated.Value(200)).current; // Initial position off-screen
  const {whiteBgColor} = useGlobalState()

  React.useEffect(() => {
    if (visible) {
      // Slide up animation
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // Slide down animation
      Animated.timing(slideAnim, {
        toValue: 200,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <Animated.View style={[styles.dialog, { transform: [{ translateY: slideAnim }], backgroundColor: whiteBgColor }]}>
          <Text style={styles.dialogText}>Are you sure you want to go back? All your progress will be lost.</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onReset} style={styles.resetButton}>
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dialog: {
    padding: 20,
    paddingBottom: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
  },
  dialogText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight:25
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  resetButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
  },
  resetButtonText: {
    fontSize: 18,
    color: 'coral',
    fontWeight: 'bold',
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
  },
  cancelButtonText: {
    fontSize: 18,
    color: '#007bff',
    fontWeight: 'bold',
  },
});

export default WarningDialog;
