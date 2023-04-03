import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '@theme/colors/colors'
import { SCREEN_WIDTHSCREEN } from '@theme/size/sizeScree'

type Props = {
    nextQuiz?: () => void
}

const TouchableOpacityConfirmTop = (props: Props) => {
    const { nextQuiz } = props
    return (
        <TouchableOpacity
            onPress={nextQuiz}
            style={styles.stylesTouchableOpacity}>
            <Text
                numberOfLines={3}
                style={styles.stylesText}>はい</Text>
        </TouchableOpacity>
    )
}

export default TouchableOpacityConfirmTop

const styles = StyleSheet.create({
    stylesTouchableOpacity: {
        backgroundColor: colors.colors_DarkSlateGray3,
        paddingHorizontal: 32,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 6,
        width: "40%",
        marginHorizontal: 10
    },
    stylesText: {
        paddingVertical: 12,
        paddingHorizontal: 6,
        textAlign: 'center',
        color: colors.colors_teal,
        fontSize: 16,
        fontWeight: "700"
    }
})