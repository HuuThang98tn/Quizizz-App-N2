import { StyleSheet, Text, View, Animated } from 'react-native'
import React from 'react'
import colors from '@theme/colors/colors'

type Props = {
    progressAnim?: number | any
    currentQuestionIndex?: any
    allQuestions?: any
}

const RenderProgressBar = (props: Props) => {
    const { progressAnim, currentQuestionIndex, allQuestions } = props
    return (

        <View style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            // marginHorizontal: 10,

        }}>
            <Text style={{
                fontSize: 22,
                color: colors.colors_orange,
                fontWeight: "700"
            }}
            >Lesson 01</Text>
            <View style={{
                width: '60%',
                height: 16,
                borderRadius: 16,
                backgroundColor: colors.colors_Aquamarine1,
                marginHorizontal: 6

            }}>
                <Animated.View style={[{
                    height: 16,
                    borderRadius: 16,
                    backgroundColor: colors.colors_DarkSeaGreen2
                }, {
                    width: progressAnim
                }]}>

                </Animated.View>

            </View>
            {/* Question Counter */}
            <View style={{
                flexDirection: 'row',
                alignItems: 'flex-end'
            }}>
                <Text style={{
                    color: colors.colors_black,
                    fontSize: 18,
                    fontWeight: "700"
                }}>{currentQuestionIndex + 1}</Text>
                <Text style={{
                    color: colors.colors_black,
                    fontSize: 18,
                    fontWeight: "700"
                }}> / {allQuestions.length}</Text>
            </View>
        </View>


    )
}

export default RenderProgressBar

const styles = StyleSheet.create({})