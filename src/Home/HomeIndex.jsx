import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { ScrollView, GestureHandlerRootView } from 'react-native-gesture-handler';
import JourneyComponent from './WramUp';
import HorizentalView from './HorizentalView';
import StudyMaterial from './Studymaterial';
import ExamSimulator from './ExamsSamulator';
import LoadingScreen from '../Helper/Loader';

export default function HomeIndex() {
  const [isLoading, setIsLoading] = useState(true); // State to track loading status

  useEffect(() => {
    // Simulate a delay for content loading
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Adjust the delay time as needed

    return () => clearTimeout(timeout); // Clean up timeout on unmount
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      {isLoading ? (
       <ActivityIndicator style={{flex:1, justifyContent:'center', alignItems:'center'}}/>
      ) : (
        // Render the actual content once loading is done
        <ScrollView showsVerticalScrollIndicator={false}>
          <JourneyComponent />
          <HorizentalView />
          <StudyMaterial />
          <ExamSimulator />
        </ScrollView>
      )}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
});
