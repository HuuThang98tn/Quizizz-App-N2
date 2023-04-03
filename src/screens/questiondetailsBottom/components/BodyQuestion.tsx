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
import {
    ListDataLesson01,
    ListDataLesson02,
    ListDataLesson03,
    ListDataLesson04,
    ListDataLesson05,
    ListDataLesson06,
    ListDataLesson07,
    ListDataLesson08,
    ListDataLesson09,
    ListDataLesson10,
    ListDataLesson11,
    ListDataLesson12,
    ListDataLesson13,
    ListDataLesson14,
    ListDataLesson15
} from '@data/lesson/ListDataLesson';
import { useSelector } from 'react-redux';
import colors from '@theme/colors/colors';
import ShowModalTimer from './ShowModalTimer';

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
    const isSound: any = useSelector((state: any) => state.soundReducer);
    const [counter, setCounter] = useState<any>(25 * 60);
    const [currentNumber, setCurrentNumber] = useState<number>(idQuestion.id);
    const [allQuestions, setAllQuestions] = useState<any>([])
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
    const [correctOption, setCorrectOption] = useState(null);
    const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
    const [score, setScore] = useState(0);
    const [showNextButton, setShowNextButton] = useState(false);
    const [showScoreModal, setShowScoreModal] = useState(false);
    const [progress] = useState(new Animated.Value(0));
    const [checkNumberQuestion, setCheckNumberQuestion] = useState<boolean | null>(true);
    const [showScoreModalTimer, setShowScoreModalTimer] = useState<boolean>(false)
    useEffect(() => {
        setAllQuestions(currentNumber === 1 ? ListDataLesson01 :
            currentNumber === 2 ? ListDataLesson02 :
                currentNumber === 3 ? ListDataLesson03 :
                    currentNumber === 4 ? ListDataLesson04 :
                        currentNumber === 5 ? ListDataLesson05 :
                            currentNumber === 6 ? ListDataLesson06 :
                                currentNumber === 7 ? ListDataLesson07 :
                                    currentNumber === 8 ? ListDataLesson08 :
                                        currentNumber === 9 ? ListDataLesson09 :
                                            currentNumber === 10 ? ListDataLesson10 :
                                                currentNumber === 11 ? ListDataLesson11 :
                                                    currentNumber === 12 ? ListDataLesson12 :
                                                        currentNumber === 13 ? ListDataLesson13 :
                                                            currentNumber === 14 ? ListDataLesson14 :
                                                                currentNumber === 15 ? ListDataLesson15 : null)
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
            if (currentNumber >= 15) {
                setCheckNumberQuestion(false)
            } else {
                setCheckNumberQuestion(true)
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
        setCounter(25 * 60)
        setShowScoreModalTimer(false)
        setCurrentNumber(currentNumber)
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
    };
    // useEffect(() => {
    //     // setTimeout(function () {
    //     // soundMp3.release();
    //     // soundMp3Success.release();
    //     // soundMp3Err.release();
    //     // }, 1000);
    // }, [currentOptionSelected]);
    useEffect(() => {
        if (counter === 0) {
            setShowScoreModalTimer(true)
        }
        const timer: any = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);

        return () => clearInterval(timer);
    }, [counter]);

    const formatTime = (time: any) => {
        const minutes = Math.floor(time / 60)
            .toString()
            .padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };


    const validateAnswer = (selectedOption: any) => {
        let correct_option: any = allQuestions[currentQuestionIndex].correct_option;
        setCurrentOptionSelected(selectedOption);
        setCorrectOption(correct_option);
        setIsOptionsDisabled(true);
        if (selectedOption === correct_option) {
            // Set Score
            setScore(score + 1);
            if (isSound.isSound) soundMp3Success.play();
        } else {
            if (isSound.isSound) soundMp3Err.play();
        }
        // Show Next Button
        setShowNextButton(true);
    };
    const nextQuiz = () => {
        setCounter(25 * 60)
        setShowScoreModalTimer(false)
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
                <View style={{ marginLeft: 80, }}>
                    <Text style={styles.titleText} numberOfLines={3}>
                        {allQuestions?.[currentQuestionIndex]?.introduction}
                    </Text>

                </View>

            </View>
            <View style={{
                flex: .7,
                flexDirection: "row",
                alignItems: "center"
            }}>
                <Text style={{
                    color: colors.colors_orange,
                    fontSize: 22,
                    fontWeight: "700"
                }}>タスク時 間 : </Text>
                <Text style={{
                    color: colors.colors_orange,
                    fontSize: 22,
                    fontWeight: "700"
                }}>
                    {formatTime(counter)}
                </Text>
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
                    showScoreModal={showScoreModal}
                    score={score}
                    allQuestions={allQuestions}
                    restartQuiz={restartQuiz}
                    nextQuiz={nextQuiz}
                    checkNumberQuestion={checkNumberQuestion}
                />
                <ShowModalTimer
                    showScoreModalTimer={showScoreModalTimer}
                    restartQuizTimer={restartQuiz}
                    nextQuizTimer={nextQuiz}
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
