import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '@theme/colors/colors'
import { SCREEN_HEIGHTWINDOW, SCREEN_WIDTHSCREEN } from '@theme/size/sizeScree'

type Props = {
    restartQuiz?: () => void
}

const TouchableOpacityCancelTop = (props: Props) => {
    const { restartQuiz } = props
    return (
        <TouchableOpacity
            onPress={restartQuiz}
            style={styles.stylesTouchableOpacity}>
            <Text style={styles.stylesText}>「いいえ」</Text>
        </TouchableOpacity>
    )
}

export default TouchableOpacityCancelTop

const styles = StyleSheet.create({
    stylesTouchableOpacity: {
        backgroundColor: colors.colors_SandyBrown,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 6,
        paddingHorizontal: 32,
        width: "40%",
        marginHorizontal: 10
    },
    stylesText: {
        paddingVertical: 12,
        textAlign: 'center',
        color: colors.colors_teal,
        fontSize: 16,
        fontWeight: "700"
    }
})