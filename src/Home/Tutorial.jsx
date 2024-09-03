import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
  useColorScheme,
} from 'react-native';
import { useGlobalState } from '../GlobelStates/States';
import CustomText from '../Helper/MyText';
import Ui19 from '../Assets/ui19.imageset/ui19.svg'; // Import SVG as a component
import Ui11 from '../Assets/ui11.imageset/12291217_Parking lot security.svg'; // Import SVG as a component
import Ui14 from '../Assets/ui14.imageset/ui14.svg'; // Import SVG as a component
import Ui20 from '../Assets/ui20.imageset/ui21.svg'; // Import SVG as a component
import CustomButton from '../Helper/MyTouchableOpacity';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const { width } = Dimensions.get('window');

const data = [
  {
    key: '1',
    title: 'Gear Up',
    description: 'From learner to driver, in one app.',
    image: Ui19 // Use the imported SVG component
  },
  {
    key: '2',
    title: 'Effective',
    description: '96% of user pass the exam on the first try.',
    image: Ui11 // Use the imported SVG component

  },
  {
    key: '3',
    title: 'Real cases',
    description: 'Database of questions from a real exam and DMV handbook',
    image: Ui14 // Use the imported SVG component

  },
  {
    key: '4',
    title: 'Pass it Fast',
    description: 'Shortcut to your driving license',
    image: Ui20 // Use the imported SVG component

  },
];

const TutorialScreen = ({ navigation, setGuide }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const colorScheme = useColorScheme();
  const { themeColor } = useGlobalState();

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      setGuide(false);
    }
  };

  const handleSkip = () => {
    const lastIndex = data.length - 1;
    flatListRef.current.scrollToIndex({ index: lastIndex, animated: true });
    setCurrentIndex(lastIndex);
  };

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      {typeof item.image === 'function' ? (
        <item.image style={styles.image} />
      ) : (
        <Image source={item.image} style={styles.image} />
      )}
      <CustomText style={styles.title}>{item.title}</CustomText>
      <CustomText style={styles.text}>{item.description}</CustomText>
    </View>
  );

  return (
    <View style={[styles.container, {backgroundColor : colorScheme === 'dark' ? Colors.darker : Colors.lighter}]}>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colorScheme === 'dark' ? Colors.darker : Colors.lighter}
      />
      <CustomButton style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipButtonText}>Skip</Text>
      </CustomButton>
      <FlatList
        data={data}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        onScroll={handleScroll}
        ref={flatListRef}
        scrollEventThrottle={16}
      />
      <View style={styles.footer}>
        <View style={styles.pagination}>
          {data.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                currentIndex === i && styles.activeDot,
                currentIndex === i && styles.activeDot && { backgroundColor: themeColor }
              ]}
            />
          ))}
        </View>
        <CustomButton style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {currentIndex === data.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </CustomButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '60%',
    resizeMode: 'contain',
    backgroundColor:'transparent'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  skipButton: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingTop: 40,
    paddingRight: 20,
  },
  skipButtonText: {
    fontSize: 20,
  },
  footer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  pagination: {
    flexDirection: 'row',
    paddingBottom: 40,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 6,
    backgroundColor: '#888',
  },
  activeDot: {
    width: 25,
    height: 12,
    borderRadius: 6,
  },
  nextButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: '95%',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default TutorialScreen;
