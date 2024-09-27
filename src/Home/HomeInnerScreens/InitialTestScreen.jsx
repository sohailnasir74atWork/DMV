import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useGlobalState } from '../../GlobelStates/States';
import CustomText from '../../Helper/MyText';
import CustomButton from '../../Helper/MyTouchableOpacity';
import { useNavigation } from '@react-navigation/native'

const { width } = Dimensions.get('window');



const InitialTestScreen = () => {
    const { imgBgColor, whiteBgColor, activeTest, setStarted } = useGlobalState();
    console.log(activeTest.img)
    const navigation = useNavigation();
    const ImageComponent = activeTest.img;

    const handleNext = () => {
        setStarted(prevStarted => {
            if (!prevStarted.includes(activeTest.id)) {
                return [...prevStarted, activeTest.id];
            }
            return prevStarted;
        });
    
        navigation.navigate('Test', { id: activeTest.id });
    };
    

    return (

        <View style={styles.container}>


            <View style={styles.header}>
                <CustomText style={styles.headerText}>Total questions 10 • 80% to pass</CustomText>
                <View style={[styles.imageContainer, { backgroundColor: imgBgColor }]}>
                    {ImageComponent && <ImageComponent width="100%" height="100%" />}
                </View>
            </View>
            <View style={styles.aboutContainer}>
                <CustomText style={styles.aboutTitle}>About</CustomText>
                <View style={[styles.card, { backgroundColor: whiteBgColor }]}>
                <ScrollView>
                    <CustomText style={styles.cardTitle}>Description</CustomText>
                    <CustomText style={styles.cardText}>{activeTest.description}</CustomText>
                </ScrollView>
                </View>
            </View>
        <CustomButton style={styles.continueButton} onPress={handleNext}>
                <View style={styles.buttonContent}>
                    <Ionicons name="arrow-forward-circle" size={24} color="#fff" style={styles.buttonIcon} />
                    <Text style={styles.buttonText}>Continue</Text>
                </View>
            </CustomButton>
            </View>

        

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 24,
    },
    header: {
        marginBottom: 20,
    },
    headerText: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 10,
    },
    imageContainer: {
        width: '100%',
        aspectRatio: 1.5,
        marginBottom: 20,
    },
    aboutContainer: {
        marginBottom: 100,
    },
    aboutTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    card: {
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 1,
        maxHeight:350,
        marginBottom: 50,


    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    cardText: {
        fontSize: 20,
        lineHeight: 40,
        textAlign:'left',
        display:'flex',
        justifyContent:'flex-start',
    },
    continueButton: {
        backgroundColor: '#007bff',
        position: 'absolute',
        bottom: 20,
        right: 16,
        left: 16,
        paddingVertical: 12,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonIcon: {
        marginRight: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '500',
    },
});

export default InitialTestScreen;
