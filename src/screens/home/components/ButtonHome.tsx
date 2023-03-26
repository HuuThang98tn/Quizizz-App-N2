import { StyleSheet, TouchableOpacity, View, Image, Text, ImageBackground } from 'react-native'
import React from 'react'
import { REQUIREIMG } from '@theme/require/RequireImage'
import { SCREEN_HEIGHTWINDOW, SCREEN_WIDTHWINDOW } from '@theme/size/sizeScree'
import colors from '@theme/colors/colors'

type Props = {
    onPressGrammar?: () => void;
    onPressVocabulary?: () => void;
}

const ButtonHome = (props: Props) => {
    const { onPressGrammar, onPressVocabulary } = props
    return (
        <View style={styles.styleContainer}>
            <View style={styles.styleViewColumn}>
                <TouchableOpacity
                    onPress={onPressGrammar}
                >
                    <ImageBackground
                        source={REQUIREIMG.img_hs_03}
                        resizeMode='contain'
                        style={styles.styleImg}>
                        <Text style={styles.styleTextTitle}>
                            練習
                        </Text>
                    </ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={onPressVocabulary}
                >

                    <ImageBackground
                        source={REQUIREIMG.img_hs_02}
                        resizeMode='contain'
                        style={styles.styleImg}>
                        <Text style={styles.styleTextTitle}>
                            テスト
                        </Text>
                    </ImageBackground>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default ButtonHome

const styles = StyleSheet.create({
    styleContainer: {
        width: SCREEN_WIDTHWINDOW,
    },
    styleViewColumn: {
        padding: 16,
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
    },
    styleImg: {
        width: 220,
        height: 150,
        marginVertical: 24,
        justifyContent: "center"
    },
    styleTextTitle: {
        textAlign: "center",
        fontSize: 48,
        color: colors.colors_black
    }
})