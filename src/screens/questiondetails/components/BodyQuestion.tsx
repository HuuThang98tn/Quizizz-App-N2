import { View, Animated, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { data } from '@data/QuizData';
import RenderProgressBar from './RenderProgressBar';
import RenderQuestion from './RenderQuestion';
import RenderOptions from './RenderOptions';
import RenderNextButton from './RenderNextButton';
import ShowModalResult from './ShowModalResult';
import Sound from 'react-native-sound';
import { styles } from '../styleqs';
import { STATUS_BAR_HEIGHT } from '@theme/size/sizeScree';
import FooterAppHeader from '@components/footer/FooterAppHeader';

type Props = {}
const soundMp3: any = new Sound(require("../../../theme/sound/soundButtonClick.mp3"),
    Sound.MAIN_BUNDLE, err => {
        if (err) {
            console.log("failed to load the sound", err);
            return;
        }
    });

const soundMp3Success: any = new Sound(require("../../../theme/sound/soundExactly.mp3"),
    Sound.MAIN_BUNDLE, err => {
        if (err) {
            console.log("failed to load the sound", err);
            return;
        }
    });

const soundMp3Err: any = new Sound(require("../../../theme/sound/soundError.mp3"),
    Sound.MAIN_BUNDLE, err => {
        if (err) {
            console.log("failed to load the sound", err);
            return;
        }
    });
const BodyQuestion = (props: Props) => {

    const allQuestions = data;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
    const [correctOption, setCorrectOption] = useState(null);
    const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
    const [score, setScore] = useState(0)
    const [showNextButton, setShowNextButton] = useState(false)
    const [showScoreModal, setShowScoreModal] = useState(false)
    const [progress, setProgress] = useState(new Animated.Value(0));
    const progressAnim = progress.interpolate({
        inputRange: [0, allQuestions.length],
        outputRange: ['0%', '100%']
    })

    const handleNext = () => {
        soundMp3.play()
        if (currentQuestionIndex == allQuestions.length - 1) {
            // Last Question
            // Show Score Modal
            setShowScoreModal(true)
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
            useNativeDriver: false
        }).start();

    }
    const restartQuiz = () => {
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
            useNativeDriver: false
        }).start();


    }
    useEffect(() => {
        // setTimeout(function () {
        // soundMp3.release();
        // soundMp3Success.release();
        // soundMp3Err.release();


        // }, 1000);
    }, [currentOptionSelected])

    const validateAnswer = (selectedOption: any) => {
        let correct_option: any = allQuestions[currentQuestionIndex]['correct_option'];
        setCurrentOptionSelected(selectedOption);
        setCorrectOption(correct_option);
        setIsOptionsDisabled(true);
        if (selectedOption === correct_option) {
            // Set Score
            setScore(score + 1)
            soundMp3Success.play((success: any, err: any) => {
                if (success) {
                    console.log('successfully finished playing');
                } else {
                    console.log('playback failed due to audio decoding errors');
                }


            });
        } else {
            soundMp3Err.play((res: any, err: any) => {
                console.log("ressss", res);
                console.log("errrrrr", err);

            });
        }
        // Show Next Button
        setShowNextButton(true)
    }

    return (
        <View style={{
            flex: 1,
            marginTop: 24,
            paddingHorizontal: 10,
        }}>
            {/* Introduction */}
            <View style={{
                marginTop: STATUS_BAR_HEIGHT,
                // justifyContent: "flex-end",
                width: "100%",
                marginBottom: 3
            }}>
                <View style={{ marginLeft: 80 }}>
                    <Text
                        style={styles.titleText}
                        numberOfLines={3}>
                        {allQuestions[currentQuestionIndex]?.introduction}
                    </Text>
                </View>

            </View>

            {/* ProgressBar */}
            <RenderProgressBar
                progressAnim={progressAnim}
                currentQuestionIndex={currentQuestionIndex}
                allQuestions={allQuestions} />
            {/* Question */}
            <RenderQuestion question={allQuestions[currentQuestionIndex]?.question} />
            {/* Options */}
            <RenderOptions
                options={allQuestions[currentQuestionIndex]?.options}
                validateAnswer={(option: any) => validateAnswer(option)}
                isOptionsDisabled={isOptionsDisabled}
                correctOption={correctOption}
                currentOptionSelected={currentOptionSelected} />

            {/* Next Button */}
            <RenderNextButton
                showNextButton={showNextButton}
                handleNext={handleNext} />

            {/* Score Modal */}
            <ShowModalResult
                showScoreModal={showScoreModal}
                score={score}
                allQuestions={allQuestions}
                restartQuiz={restartQuiz}
            />
            <View style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
                <FooterAppHeader />
            </View>

        </View>
    )
}

export default BodyQuestion

