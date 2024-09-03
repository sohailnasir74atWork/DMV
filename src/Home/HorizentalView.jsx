import React from 'react';
import { View, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import CustomText from '../Helper/MyText';
import Ui1 from '../Assets/ui1.imageset/ui1.svg'; // Import the SVG
import { useGlobalState } from '../GlobelStates/States';

const { width } = Dimensions.get('window');
// Sample data for sections with dynamic SVG
const data = [
    {
        sectionTitle: 'Easy',
        items: [
            { id: '1', title: 'Warm up', questions: '10 Questions', image: Ui1 },
            { id: '2', title: 'Practice test 1', questions: '25 Questions', image: Ui1 },
            { id: '3', title: 'Practice test 2', questions: '30 Questions', image: Ui1 },
            { id: '4', title: 'Practice test 3', questions: '35 Questions', image: Ui1 },
        ],
    },
    {
        sectionTitle: 'Medium',
        items: [
            { id: '5', title: 'Practice test 4', questions: '20 Questions', image: Ui1 },
            { id: '6', title: 'Practice test 5', questions: '20 Questions', image: Ui1 },
            { id: '7', title: 'Practice test 6', questions: '20 Questions', image: Ui1 },
        ],
    },
    {
        sectionTitle: 'Hard',
        items: [
            { id: '8', title: 'Locked 1', questions: '20 Questions', image: Ui1 },
            { id: '9', title: 'Locked 2', questions: '20 Questions', image: Ui1 },
        ],
    },
];

// Component to render each item
const Item = ({ item }) => {
const { imgBgColor } = useGlobalState()
    return (
        <TouchableOpacity style={styles.itemContainer}>
            {/* Image Wrapper to control size */}
            <View style={[styles.imageWrapper, { backgroundColor: imgBgColor }]}>
                <item.image width="100%" height="100%" />
            </View>
            <CustomText style={styles.itemTitle}>{item.title}</CustomText>
            <CustomText style={styles.itemQuestions}>{item.questions}</CustomText>
        </TouchableOpacity>
    );
}

const HorizentalView = () => {
    return (
        <View style={styles.container}>
            <CustomText style={styles.title}>Tests</CustomText>
            {data.map((section, index) => (
                <View key={index} style={styles.sectionContainer}>
                    <CustomText style={styles.sectionTitle}>{section.sectionTitle}</CustomText>
                    <FlatList
                        data={section.items}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => <Item item={item} />}
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
        fontSize: 24,
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
        alignItems: 'left',
    },
    imageWrapper: {
        width: '100%', // Adjust width to fill container
        // height: width * 0.3, // Adjust height relative to width
        marginBottom: 10, // Spacing between the image and text
        justifyContent: 'center',
        alignItems: 'center',
        aspectRatio: 1.5, // Adjust the aspect ratio as needed
        borderRadius: 10


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
});

export default HorizentalView;
