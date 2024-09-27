import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, useColorScheme } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';
import { useGlobalState } from '../../GlobelStates/States';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomText from '../../Helper/MyText';

const ResultScreen = ({ route, navigation }) => {
    const { correctAnswers, totalQuestions } = route.params;
    const incorrectAnswers = totalQuestions - correctAnswers;
    const scorePercentage = correctAnswers / totalQuestions;
    const { themeColor, imgBgColor } = useGlobalState();
    const isDarkMode = useColorScheme() === 'dark';

    // Data for Progress Chart
    const data = {
        labels: ['Correct'],
        data: [scorePercentage],
    };

    // Determine pass or fail message
    const passMessage =
        scorePercentage >= 0.5 ? 'Congratulations! You passed the test!' : 'Not enough score to pass! Try again to pass.';

    return (
        <View style={styles.container}>
            {/* Custom Header */}
            <View style={styles.customHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row' }}>
                    <Ionicons name="arrow-back" size={24} color="#007bff" style={styles.buttonIcon} />
                    <Text style={styles.headerButtonText}>Back</Text>
                </TouchableOpacity>
            </View>

            {/* Test Result Title */}
            <CustomText style={styles.title}>Test Result</CustomText>

            {/* Circular Progress Chart */}
            <View style={styles.chartContainer}>
                <ProgressChart
                    data={data}
                    width={Dimensions.get('window').width - 100}
                    height={220}
                    strokeWidth={16}
                    radius={80}
                    chartConfig={{
                        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter, // Use white or match your app's background
                        backgroundGradientFrom: isDarkMode ? 'transparent' : Colors.lighter,
                        backgroundGradientTo: isDarkMode ? 'transparent' : Colors.lighter,
                        color: (opacity = 1, index) =>
                            index === 0 ? `rgba(34, 139, 34, ${opacity})` : `rgba(255, 0, 0, ${opacity})`, // Green for correct, Red for incorrect
                    }}
                    hideLegend={true}
                    style={styles.chart}
                />


<View style={styles.percentageContainer}>
    <Text style={styles.percentageText}>{`${Math.round(scorePercentage * 100)}%`}</Text>
  </View>
              </View>

            {/* Correct and Incorrect Counts */}
            <View style={styles.resultText}>
                <CustomText style={styles.correctText}>Correct {correctAnswers}</CustomText>
                <CustomText style={styles.incorrectText}>Incorrect {incorrectAnswers}</CustomText>
            </View>

            {/* Pass or Fail Message */}
            <CustomText style={styles.messageText}>{passMessage}</CustomText>

            {/* Retake Test Button */}
            <TouchableOpacity style={[styles.retakeButton, { backgroundColor: imgBgColor }]} onPress={() => navigation.replace('Question')}>
                <Ionicons name="information-circle-outline" size={24} color="#007bff" style={styles.buttonIcon} />

                <Text style={styles.retakeButtonText}>Retake Test</Text>
            </TouchableOpacity>

            {/* Footer Navigation Section */}
            <View style={styles.footer}>
                <TouchableOpacity style={[styles.footerButton, { backgroundColor: imgBgColor }]} onPress={() => navigation.navigate('Home')}>
                    <Ionicons name="car" size={24} color="#007bff" style={styles.buttonIcon} />
                    <Text style={styles.footerButtonText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.footerButton, { backgroundColor: imgBgColor }]} onPress={() => navigation.navigate('Mistakes')}>
                    <Ionicons name="information-circle-outline" size={24} color="#007bff" style={styles.buttonIcon} />
                    <Text style={styles.footerButtonText}>Mistakes</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 20,
        justifyContent: 'space-between',
    },
    customHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    headerButtonText: {
        fontSize: 16,
        color: '#007bff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    chartContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        // marginVertical: 20,
        position: 'relative',

    },
    chart: {
        position: 'relative',
    },
    
    resultText: {
        fontSize: 18,
        textAlign: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'

    },
    correctText: {
        color: 'green',
    },
    incorrectText: {
        color: 'red',
    },
    messageText: {
        fontSize: 18,
        textAlign: 'center',
        marginVertical: 10,
        paddingHorizontal: 60
    },
    retakeButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignSelf: 'center',
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        width: 160
    },
    retakeButtonText: {
        fontSize: 16,
        color: '#007bff'
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingVertical: 10,
    },
    footerButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    footerButtonText: {
        fontSize: 16,
        color: '#007bff',
    },
    buttonIcon: {
        paddingHorizontal: 5
    },
    chartContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      },
      percentageContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
      },
      percentageText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: 'green',
        textAlign: 'center',
      },
      
      
      
      
});

export default ResultScreen;
