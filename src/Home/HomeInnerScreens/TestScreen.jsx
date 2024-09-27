import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useGlobalState } from '../../GlobelStates/States';
import CustomText from '../../Helper/MyText';
import WarningDialog from '../../Helper/Dialog';

const QuestionScreen = ({ navigation }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [warningVisible, setWarningVisible] = useState(false); // State to control the visibility of the warning dialog
    const [progress, setProgress] = useState({ correct: 0, incorrect: 0 });
    const [attemptedQuestions, setAttemptedQuestions] = useState({});
    const { themeColor, imgBgColor } = useGlobalState();

  const questions = [
    {
      id: 1,
      imageName: null,
      questionStatement: 'What color is the sky on a clear day?',
      opt1: 'Blue',
      opt2: 'Green',
      opt3: 'Red',
      answer: 'a',
      explanation: 'On a clear day, the sky appears blue due to the scattering of sunlight by the atmosphere.',
      category: 'General Knowledge',
      difficulty: 'Easy',
      licenseType: 'Regular',
    },
    {
      id: 2,
      imageName: null,
      questionStatement: 'What is 2 + 2?',
      opt1: '3',
      opt2: '4',
      opt3: '5',
      answer: 'b',
      explanation: '2 + 2 equals 4, which is the correct sum.',
      category: 'Mathematics',
      difficulty: 'Easy',
      licenseType: 'Regular',
    },
    {
      id: 3,
      imageName: null,
      questionStatement: 'Which animal is known as the King of the Jungle?',
      opt1: 'Elephant',
      opt2: 'Lion',
      opt3: 'Tiger',
      answer: 'b',
      explanation: 'The lion is commonly referred to as the King of the Jungle.',
      category: 'Animals',
      difficulty: 'Easy',
      licenseType: 'Regular',
    },
  ];

  const handleOptionSelect = (option) => {
    if (attemptedQuestions[currentQuestionIndex]) return; // Prevent further selection if already answered

    setSelectedOption(option);

    const correctAnswer = questions[currentQuestionIndex].answer;

    if (option === correctAnswer) {
      setProgress((prev) => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      setProgress((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }));
    }

    setAttemptedQuestions({ ...attemptedQuestions, [currentQuestionIndex]: true });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      const correctAnswers = progress.correct; // Get the number of correct answers
      const totalQuestions = questions.length;
  
      // Navigate to the Results screen with parameters
      navigation.navigate('Results', { correctAnswers, totalQuestions });
    }
  };
  

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(null);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setProgress({ correct: 0, incorrect: 0 });
    setAttemptedQuestions({});
  };

  const currentQuestion = questions[currentQuestionIndex];
  const correctOptionKey = currentQuestion.answer;

  // Determine button states
  const isNextButtonDisabled =
  !attemptedQuestions[currentQuestionIndex] && selectedOption === null;

const isPreviousButtonDisabled = currentQuestionIndex === 0;
const handleBackPress = () => {
    setWarningVisible(true); // Show the warning dialog
  };

  const handleWarningClose = () => {
    setWarningVisible(false); // Close the warning dialog
  };

  const handleWarningReset = () => {
    handleRestart(); // Perform the reset
    setWarningVisible(false); // Close the warning dialog
    navigation.navigate('Home'); // Navigate back to the home screen
  };

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <View style={styles.customHeader}>
        <TouchableOpacity onPress={handleBackPress} style={{flexDirection:'row'}}>
        <Ionicons name="arrow-back" size={24} color="#007bff" style={{marginRight:10}} />

          <Text style={styles.headerButtonText}>Back</Text>
        </TouchableOpacity>
        {/* <Text style={styles.headerTitle}>Quiz</Text> */}
        <TouchableOpacity onPress={handleRestart}>
          <Text style={styles.headerButtonText}>Restart</Text>
        </TouchableOpacity>
      </View>

      {/* Progress Bar Section */}
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressSegment, { flex: progress.correct, backgroundColor: 'green' }]} />
        <View style={[styles.progressSegment, { flex: progress.incorrect, backgroundColor: 'red' }]} />
        <View style={[styles.progressSegment, { flex: questions.length - (progress.correct + progress.incorrect), backgroundColor: '#ddd' }]} />
      </View>

      {/* Question Section */}
      <CustomText style={styles.questionText}>{currentQuestion.questionStatement}</CustomText>

      {/* Options Section */}
      {['a', 'b', 'c'].map((optionKey) => {
        const optionText = currentQuestion[`opt${optionKey === 'a' ? 1 : optionKey === 'b' ? 2 : 3}`];
        const isCorrect = optionKey === correctOptionKey;
        const isSelected = selectedOption === optionKey;

        return (
          <TouchableOpacity
            key={optionKey}
            style={[
              styles.optionContainer, {backgroundColor:imgBgColor}
            //   attemptedQuestions[currentQuestionIndex] && isCorrect && styles.correctOption,
            //   attemptedQuestions[currentQuestionIndex] && isSelected && !isCorrect && styles.incorrectOption,
            ]}
            onPress={() => handleOptionSelect(optionKey)}
            disabled={attemptedQuestions[currentQuestionIndex]} // Disable after selection
          >
            <View style={styles.optionRow}>
              <Ionicons
                name={
                  isSelected || (attemptedQuestions[currentQuestionIndex] && isCorrect)
                    ? isCorrect
                      ? 'checkmark-circle'
                      : 'close-circle'
                    : 'ellipse-outline'
                }
                size={24}
                color={
                  isSelected || (attemptedQuestions[currentQuestionIndex] && isCorrect)
                    ? isCorrect
                      ? '#00D084'
                      : '#FF2D55'
                    : '#777'
                }
                style={styles.optionIcon}
              />
              <CustomText
                style={[
                  styles.optionText,
                  attemptedQuestions[currentQuestionIndex] && isCorrect && { color: '#00D084' },
                  attemptedQuestions[currentQuestionIndex] && isSelected && !isCorrect && { color: '#FF2D55' },
                ]}
              >
                {optionText}
              </CustomText>
            </View>
            {/* Always show explanation with the correct answer */}
            {attemptedQuestions[currentQuestionIndex] && isCorrect && (
              <CustomText style={styles.explanationText}>{currentQuestion.explanation}</CustomText>
            )}
          </TouchableOpacity>
        );
      })}
      <WarningDialog visible={warningVisible} onClose={handleWarningClose} onReset={handleWarningReset} />

      {/* Footer Navigation Section */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.footerButton, isPreviousButtonDisabled ? styles.footerButtonDisabled : '']}
          onPress={handlePreviousQuestion}
          disabled={isPreviousButtonDisabled}
        >
          <Text style={isPreviousButtonDisabled ? styles.footerButtonTextDisabled : styles.footerButtonText}>Previous</Text>
        </TouchableOpacity>
        <CustomText style={styles.footerCounter}>{`${currentQuestionIndex + 1}/${questions.length}`}</CustomText>
        <TouchableOpacity>
          <Ionicons name="bookmark-outline" size={24} color={themeColor} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.footerButton, isNextButtonDisabled ? styles.footerButtonDisabled : '']}
          onPress={handleNextQuestion}
          disabled={isNextButtonDisabled}
        >
          <Text style={isNextButtonDisabled ? styles.footerButtonTextDisabled : styles.footerButtonText}>Next</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  customHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerButtonText: {
    fontSize: 16,
    color: '#007bff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  progressBarContainer: {
    flexDirection: 'row',
    height: 5,
    marginVertical: 16,
  },
  progressSegment: {
    height: '100%',
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop:70,
  },
  optionContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom:5
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    marginRight: 8,
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  correctOption: {
    backgroundColor: 'lightgreen',
  },
  incorrectOption: {
    backgroundColor: '#FF2D55',
  },
  explanationText: {
    fontSize: 18,
    marginTop: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
    paddingHorizontal: 10,
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
  },
  footerButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor:'#007bff',
    width:120,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:8
  },
  footerButtonText: {
    fontSize: 16,
    color: 'white',
  },
  footerButtonTextDisabled: {
    fontSize: 16,
    color: 'white',

  },
  footerButtonDisabled:{
    opacity:.5
  },
  footerCounter: {
    fontSize: 16,
  },
});

export default QuestionScreen;
