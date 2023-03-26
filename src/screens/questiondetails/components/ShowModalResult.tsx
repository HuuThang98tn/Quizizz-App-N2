import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '@theme/colors/colors'

type Props = {
    showScoreModal?: boolean
    score?: number | any | null
    allQuestions?: any | null
    restartQuiz?: () => void
}

const ShowModalResult = (props: Props) => {
    const { showScoreModal, score, allQuestions, restartQuiz } = props
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={showScoreModal}
        >
            <View style={{
                flex: 1,
                backgroundColor: "#252c4a",
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <View style={{
                    backgroundColor: colors.colors_milky,
                    width: '90%',
                    borderRadius: 20,
                    padding: 20,
                    alignItems: 'center'
                }}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{score > (allQuestions.length / 2) ? 'Congratulations!' : 'Oops!'}</Text>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        marginVertical: 20
                    }}>
                        <Text style={{
                            fontSize: 30,
                            color: score > (allQuestions.length / 2) ? colors.colors_darkSlateGray : colors.colors_orange
                        }}>{score}</Text>
                        <Text style={{
                            fontSize: 20, color: colors.colors_black
                        }}>/ {allQuestions.length}</Text>
                    </View>
                    {/* Retry Quiz button */}
                    <TouchableOpacity
                        onPress={restartQuiz}
                        style={{
                            backgroundColor: "#3498db",
                            padding: 20, width: '100%', borderRadius: 20
                        }}>
                        <Text style={{
                            textAlign: 'center', color: colors.colors_milky, fontSize: 20
                        }}>Retry Quiz</Text>
                    </TouchableOpacity>

                </View>

            </View>
        </Modal>
    )
}

export default ShowModalResult

const styles = StyleSheet.create({})