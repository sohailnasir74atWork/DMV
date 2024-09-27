import React from 'react';
import { View, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import CustomText from '../Helper/MyText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useGlobalState } from '../GlobelStates/States';
import { useNavigation } from '@react-navigation/native';
import { testData } from '../Helper/Logic/TestData';

const { width } = Dimensions.get('window');

const Item = ({ item, isLocked, navigation, sectionDescription, sectionLevel }) => {
  const { imgBgColor, setActiveTest, started } = useGlobalState();

  // Check if the item is started
  const isStarted = started.includes(item.id);

  const handlePress = () => {
    if (!isLocked) {
      navigation.navigate('Warm Up');
      setActiveTest({
        id: item.id,
        description: sectionDescription,
        img: item.image,
        level: sectionLevel
      });
    }
  };

  const ImageComponent = item.image;

  return (
    <TouchableOpacity
      style={[styles.itemContainer, isLocked && styles.disabledItem]}
      onPress={handlePress}
      disabled={isLocked}
    >
      <View
        style={
          !isLocked
            ? [styles.imageWrapper, { backgroundColor: imgBgColor }]
            : [styles.imageWrapperLocked, { backgroundColor: 'white' }]
        }
      >
        {isLocked && (
          <>
            <View style={styles.imageOverlay} />
            <Ionicons name="lock-closed" size={32} color={'#111'} style={styles.lockIcon} />
          </>
        )}

        {/* Check if the item is started and show the overlay */}
        {isStarted && !isLocked && (
          <View style={styles.startedOverlay}>
            <CustomText style={styles.startedText}>Countinue</CustomText>
          </View>
        )}

        <ImageComponent width="100%" height="100%" />
      </View>
      <CustomText style={styles.itemTitle}>{item.title}</CustomText>
      <CustomText style={styles.itemQuestions}>{item.questions}</CustomText>
    </TouchableOpacity>
  );
};

const HorizentalView = () => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <CustomText style={styles.title}>Tests</CustomText>
      {testData.map((section, index) => (
        <View key={index} style={styles.sectionContainer}>
          <CustomText style={styles.sectionTitle}>{section.sectionTitle}</CustomText>
          <FlatList
            data={section.items}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Item
                item={item}
                isLocked={item.locked}
                navigation={navigation}
                sectionDescription={section.description}
                sectionLevel={section.sectionTitle}
              />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listContainer: {
    paddingHorizontal: 4,
  },
  itemContainer: {
    width: width * 0.5,
    borderRadius: 10,
    paddingRight: 10,
    alignItems: 'flex-start',
  },
  imageWrapper: {
    width: '100%',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1.5,
    borderRadius: 10,
    position: 'relative',
  },
  imageWrapperLocked: {
    width: '100%',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
    borderRadius: 10,
    position: 'relative',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 10,
    zIndex: 1,
  },
  lockIcon: {
    position: 'absolute',
    zIndex: 2,
    padding: 12,
    backgroundColor: 'lightgreen',
    borderRadius: 32,
  },
  startedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // semi-transparent green overlay
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  startedText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    backgroundColor:'#007AFF',
    paddingHorizontal:15,
    paddingVertical:10,
    borderRadius:20
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  itemQuestions: {
    fontSize: 14,
    color: '#555',
  },
  disabledItem: {},
});

export default HorizentalView;
