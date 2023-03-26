import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '@theme/colors/colors'

type Props = {
    options?: any
    validateAnswer?: ((option: any) => void) | undefined
    isOptionsDisabled?: any
    correctOption?: any
    currentOptionSelected?: any
}
//allQuestions[currentQuestionIndex]?.options
const RenderOptions = (props: Props) => {

    const { options,
        validateAnswer,
        isOptionsDisabled,
        correctOption,
        currentOptionSelected }: any = props
    console.log("options", options);
    console.log("correctOption", correctOption);

    return (
        <View>
            {
                options.map((option: any, index: any) => (
                    <TouchableOpacity
                        onPress={() => validateAnswer(option)}
                        disabled={isOptionsDisabled}
                        key={option}
                        style={{
                            borderWidth: 1,
                            borderColor: option == correctOption
                                ? colors.colors_darkSlateGray
                                : option == currentOptionSelected
                                    ? colors.colors_orange
                                    : colors.colors_darkCyan + '40',
                            backgroundColor: option == correctOption
                                ? colors.colors_darkSlateGray + '20'
                                : option == currentOptionSelected
                                    ? colors.colors_orange + '20'
                                    : colors.colors_turquoise,
                            height: 58,
                            borderRadius: 6,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingHorizontal: 10,
                            marginVertical: 10
                        }}
                    >
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <View style={{
                                width: 36,
                                height: 36,
                                borderColor: colors.colors_skyblue,
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 6,
                                borderWidth: 1
                            }}>
                                <Text style={{
                                    fontSize: 18,
                                    color: colors.colors_black,
                                    fontWeight: "700"
                                }}>{index + 1} </Text>
                            </View>
                            <Text style={{ fontSize: 20, color: colors.colors_black }}>{option}</Text>

                        </View>


                        {/* Show Check Or Cross Icon based on correct answer*/}
                        {
                            option == correctOption ? (
                                <View style={{
                                    width: 30, height: 30, borderRadius: 30 / 2,
                                    backgroundColor: colors.colors_darkSlateGray,
                                    justifyContent: 'center', alignItems: 'center'
                                }}>
                                    {/* <MaterialCommunityIcons name="check" style={{
                                    color: colors.colors_milky,
                                    fontSize: 20
                                }} /> */}
                                </View>
                            ) : option == currentOptionSelected ? (
                                <View style={{
                                    width: 30, height: 30, borderRadius: 30 / 2,
                                    backgroundColor: colors.colors_orange,
                                    justifyContent: 'center', alignItems: 'center'
                                }}>
                                    {/* <MaterialCommunityIcons name="close" style={{
                                    color: COLORS.white,
                                    fontSize: 20
                                }} /> */}
                                </View>
                            ) : null
                        }

                    </TouchableOpacity>
                ))
            }
        </View>
    )
}

export default RenderOptions

const styles = StyleSheet.create({})