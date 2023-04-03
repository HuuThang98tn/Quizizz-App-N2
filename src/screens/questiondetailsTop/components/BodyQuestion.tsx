import { View, Animated, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { data_1, data_2 } from '@data/QuizData';
import RenderProgressBar from './RenderProgressBar';
import RenderQuestion from './RenderQuestion';
import RenderOptions from './RenderOptions';
import RenderNextButton from './RenderNextButton';
import ShowModalResult from './ShowModalResult';
import Sound from 'react-native-sound';
import { styles } from '../styleqs';
import { STATUS_BAR_HEIGHT } from '@theme/size/sizeScree';
import FooterAppHeader from '@components/footer/FooterAppHeader';
import { ListQuestionA, ListQuestionB, ListQuestionC } from '@data/alphabet/ListDataAlphabet';
import { ListDataVocabularyA, ListDataVocabularyB, ListDataVocabularyC, ListDataVocabularyD, ListDataVocabularyE, ListDataVocabularyF, ListDataVocabularyG } from '@data/vocabulary/ListDataVocabulary';
import { ListDataGrammarA, ListDataGrammarB, ListDataGrammarC, ListDataGrammarD, ListDataGrammarE, ListDataGrammarF, ListDataGrammarG } from '@data/grammar/ListDataGrammar';
import { useSelector } from 'react-redux';

type Props = {
    navigation?: any
    idQuestion?: number | any
};
const soundMp3: any = new Sound(
    require('../../../theme/sound/soundButtonClick.mp3'),
    Sound.MAIN_BUNDLE,
    err => {
        if (err) {
            console.log('failed to load the sound', err);
            return;
        }
    },
);

const soundMp3Success: any = new Sound(
    require('../../../theme/sound/soundExactly.mp3'),
    Sound.MAIN_BUNDLE,
    err => {
        if (err) {
            console.log('failed to load the sound', err);
            return;
        }
    },
);

const soundMp3Err: any = new Sound(
    require('../../../theme/sound/soundError.mp3'),
    Sound.MAIN_BUNDLE,
    err => {
        if (err) {
            console.log('failed to load the sound', err);
            return;
        }
    },
);
const BodyQuestion = (props: Props) => {
    const { idQuestion } = props;
    const [currentNumber, setCurrentNumber] = useState<number>(idQuestion.id);
    const [allQuestions, setAllQuestions] = useState<any>([])
    const [numberScreens] = useState<number>(idQuestion.screenshot);
    const isSound: any = useSelector((state: any) => state.soundReducer);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
    const [correctOption, setCorrectOption] = useState(null);
    const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
    const [score, setScore] = useState(0);
    const [showNextButton, setShowNextButton] = useState(false);
    const [showScoreModal, setShowScoreModal] = useState(false);
    const [progress] = useState(new Animated.Value(0));
    const [checkNumberQuestion, setCheckNumberQuestion] = useState<boolean | null>(true);
    useEffect(() => {
        if (numberScreens === 1) {
            setAllQuestions(currentNumber === 1 ? ListQuestionA :
                currentNumber === 2 ? ListQuestionB :
                    currentNumber === 3 ? ListQuestionC :
                        currentNumber === 4 ? ListQuestionA :
                            currentNumber === 5 ? ListQuestionA :
                                currentNumber === 6 ? ListQuestionA :
                                    currentNumber === 7 ? ListQuestionA :
                                        currentNumber === 8 ? ListQuestionA :
                                            currentNumber === 9 ? ListQuestionA :
                                                currentNumber === 10 ? ListQuestionA :
                                                    currentNumber === 11 ? ListQuestionA :
                                                        currentNumber === 12 ? ListQuestionA :
                                                            currentNumber === 13 ? ListQuestionA :
                                                                currentNumber === 14 ? ListQuestionA :
                                                                    currentNumber === 15 ? ListQuestionA : null)
        } else if (numberScreens === 2) {
            switch (currentNumber) {
                case 0:
                    setAllQuestions([])
                    break;
                case 1:
                    setAllQuestions(ListDataVocabularyA)
                    break;
                case 2:
                    setAllQuestions(ListDataVocabularyB)
                    break;
                case 3:
                    setAllQuestions(ListDataVocabularyC)
                    break;
                case 4:
                    setAllQuestions(ListDataVocabularyD)
                    break;
                case 5:
                    setAllQuestions(ListDataVocabularyE)
                    break;
                case 6:
                    setAllQuestions(ListDataVocabularyF)
                    break;
                case 7:
                    setAllQuestions(ListDataVocabularyG)
                    break;
                default:
                    break;
            }
        } else if (numberScreens === 3) {
            switch (currentNumber) {
                case 0:
                    setAllQuestions([])
                    break;
                case 1:
                    setAllQuestions(ListDataGrammarA)
                    break;
                case 2:
                    setAllQuestions(ListDataGrammarB)
                    break;
                case 3:
                    setAllQuestions(ListDataGrammarC)
                    break;
                case 4:
                    setAllQuestions(ListDataGrammarD)
                    break;
                case 5:
                    setAllQuestions(ListDataGrammarE)
                    break;
                case 6:
                    setAllQuestions(ListDataGrammarF)
                    break;
                case 7:
                    setAllQuestions(ListDataGrammarG)
                    break;
                default:
                    break;
            }
        }

    }, [currentNumber])



    const progressAnim = progress.interpolate({
        inputRange: [0, allQuestions?.length],
        outputRange: ['0%', '100%'],
    });
    const onPressGoBack = () => {
        props.navigation.goBack();
    }
    const onPressGoHome = () => props.navigation.navigate("HomeScreen" as never);
    const handleNext = () => {
        if (isSound.isSound) soundMp3.play();

        if (currentQuestionIndex == allQuestions.length - 1) {
            // Last Question
            // Show Score Modal
            setShowScoreModal(true);
            if (numberScreens === 1) {
                if (currentNumber >= 15) {
                    setCheckNumberQuestion(false)

                } else {
                    setCheckNumberQuestion(true)
                }
            } else if (numberScreens === 2 || numberScreens === 3) {
                if (currentNumber >= 7) {
                    setCheckNumberQuestion(false)

                } else {
                    setCheckNumberQuestion(true)
                }
            }

        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setCurrentOptionSelected(null);
            setCorrectOption(null);
            setIsOptionsDisabled(false);
            setShowNextButton(false);
        }
        Animated.timing(progress, {
            toValue: currentQuestionIndex + 1,
            duration: 1000,
            useNativeDriver: false,
        }).start();
    };
    const restartQuiz = () => {
        // setCurrentNumber(currentNumber)
        // setShowScoreModal(false);
        // setCurrentQuestionIndex(0);
        // setScore(0);
        // setCurrentOptionSelected(null);
        // setCorrectOption(null);
        // setIsOptionsDisabled(false);
        // setShowNextButton(false);
        // Animated.timing(progress, {
        //     toValue: 0,
        //     duration: 1000,
        //     useNativeDriver: false,
        // }).start();
        props.navigation.navigate("GrammarScreen" as never);

    };
    // useEffect(() => {
    //     // setTimeout(function () {
    //     // soundMp3.release();
    //     // soundMp3Success.release();
    //     // soundMp3Err.release();
    //     // }, 1000);
    // }, [currentOptionSelected]);

    const validateAnswer = (selectedOption: any) => {
        let correct_option: any = allQuestions[currentQuestionIndex].correct_option;
        setCurrentOptionSelected(selectedOption);
        setCorrectOption(correct_option);
        setIsOptionsDisabled(true);
        if (selectedOption === correct_option) {
            // Set Score
            setScore(score + 1);
            if (isSound.isSound) soundMp3Success.play()
        } else {
            if (isSound.isSound) soundMp3Err.play();
        }
        // Show Next Button
        setShowNextButton(true);
    };
    const nextQuiz = () => {
        setCurrentNumber(currentNumber + 1)
        setShowScoreModal(false);

        setCurrentQuestionIndex(0);
        setScore(0);

        setCurrentOptionSelected(null);
        setCorrectOption(null);
        setIsOptionsDisabled(false);
        setShowNextButton(false);
        Animated.timing(progress, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false,
        }).start();
    }

    return (
        <View
            style={{
                flex: 1,
                paddingHorizontal: 10,
            }}>
            {/* Introduction */}
            <View
                style={{
                    flex: 2,
                    marginTop: STATUS_BAR_HEIGHT + 10,
                    width: '100%',
                }}>
                <View style={{ marginLeft: 80 }}>
                    <Text style={styles.titleText} numberOfLines={3}>
                        {allQuestions?.[currentQuestionIndex]?.introduction}
                    </Text>
                </View>
            </View>
            <View style={{ flex: 12 }}>
                <RenderProgressBar
                    progressAnim={progressAnim}
                    currentQuestionIndex={currentQuestionIndex}
                    allQuestions={allQuestions}
                    currentNumber={currentNumber}
                />
                {/* Question */}
                <RenderQuestion question={allQuestions?.[currentQuestionIndex]?.question} />
                {/* Options */}
                <RenderOptions
                    options={allQuestions?.[currentQuestionIndex]?.options}
                    validateAnswer={(option: any) => validateAnswer(option)}
                    isOptionsDisabled={isOptionsDisabled}
                    correctOption={correctOption}
                    currentOptionSelected={currentOptionSelected}
                />

                {/* Score Modal */}
                <ShowModalResult
                    showScoreModal={showScoreModal} //showScoreModal
                    score={score}
                    allQuestions={allQuestions}
                    restartQuiz={restartQuiz}
                    nextQuiz={nextQuiz}
                    checkNumberQuestion={checkNumberQuestion}

                />
            </View>
            {/* ProgressBar */}

            <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
                <FooterAppHeader
                    isVisible={showNextButton}
                    onPressNext={handleNext}
                    onPressGoBack={onPressGoBack}
                    onPressGoHome={onPressGoHome}

                />
            </View>
        </View>
    );
};

export default BodyQuestion;
