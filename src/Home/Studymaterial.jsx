import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useGlobalState } from '../GlobelStates/States';
import CustomText from '../Helper/MyText';

const studyMaterialData = [
  { id: '1', title: "Driver's Handbook", icon: 'lock-open' },
  { id: '2', title: 'Traffic Signs - DMV Practice Test California', icon: 'lock' },
  { id: '3', title: 'Cheat Sheet - Top 150 Questions', icon: 'lock' },
];

const StudyMaterialItem = ({ item }) => {
    const { themeColor, whiteBgColor } = useGlobalState();
    return (
        <View style={[styles.studyMaterialItem, { backgroundColor: whiteBgColor }]}>
            <FontAwesome5 name={item.icon} size={20} color={themeColor} style={styles.itemIcon} />
            <CustomText style={styles.itemText}>{item.title}</CustomText>
            <FontAwesome5 name="chevron-right" size={16} color={themeColor} style={styles.chevronIcon} />
        </View>
    );
};

const StudyMaterial = () => (
    <View style={styles.sectionContainer}>
        <CustomText style={styles.sectionTitle}>Study Material</CustomText>
        <FlatList
            data={studyMaterialData}
            renderItem={({ item }) => <StudyMaterialItem item={item} />}
            keyExtractor={(item) => item.id}
        />
    </View>
);

const styles = StyleSheet.create({
    sectionContainer: {
        marginVertical: 24,
    },
    sectionTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    studyMaterialItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        borderRadius: 10,
    },
    itemIcon: {
        marginRight: 12,
    },
    itemText: {
        flex: 1,
        fontSize: 16,
        overflow: 'hidden', // Ensure overflow is hidden
        textOverflow: 'ellipsis', // Add ellipsis for overflowed text
        whiteSpace: 'nowrap', // Prevent text from wrapping
    },
    chevronIcon: {
        marginLeft: 12,
    },
});

export default StudyMaterial;
