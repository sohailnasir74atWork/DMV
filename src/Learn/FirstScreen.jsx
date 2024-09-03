import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import an icon library
import CustomText from '../Helper/MyText';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useGlobalState } from '../GlobelStates/States';

const flashcardsData = [
  { id: '1', title: 'Driving Manoeuvres and Practices' },
  { id: '2', title: 'Licensing and Driver Responsibility' },
  { id: '3', title: 'Road Situations and Usage' },
  { id: '4', title: 'Traffic Laws and Regulations' },
  { id: '5', title: 'Vehicle Requirements and Safety' },
];

const FirstScreen = () => {
  const {whiteBgColor} = useGlobalState()
  const renderFlashcardItem = ({ item }) => (
    <TouchableOpacity style={styles.flashcardItem}>
      <CustomText style={styles.flashcardTitle}>{item.title}</CustomText>
      <Ionicons name="chevron-forward" size={20} color="#333" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Flashcards Section */}
      <CustomText style={styles.sectionHeader}>FLASHCARDS</CustomText>
      <View style={[styles.flashcardsContainer, {backgroundColor:whiteBgColor}]}>
        <FlatList
          data={flashcardsData}
          renderItem={renderFlashcardItem}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>

      {/* Bookmarked Section */}
      <CustomText style={styles.sectionHeader}>BOOKMARKED</CustomText>
      <View style={[styles.bookmarkedContainer, {backgroundColor:whiteBgColor}]}>
        <Ionicons name="bookmark" size={40} color="#666" />
        <CustomText style={styles.bookmarkedText}>No Bookmarked Questions</CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  flashcardsContainer: {
    // backgroundColor: '#e6f2ff',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  flashcardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  flashcardTitle: {
    // fontSize: 18,
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  bookmarkedContainer: {
    alignItems: 'center',
    // backgroundColor: '#e6f2ff',
    paddingVertical: 36,
    borderRadius: 8,
    
  },
  bookmarkedText: {
    marginTop: 8,
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default FirstScreen;
