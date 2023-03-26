import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import colors from '@theme/colors/colors';
import { REQUIREIMG } from '@theme/require/RequireImage';

type Props = {
    onPressStarOne?: () => void;
    onPressStarTwo?: () => void;
    onPressStarThree?: () => void;

}

const BodyGrammar = (props: Props) => {
    return (
        <View style={styles.stylesContainer}>
            <Text style={styles.styleTitle}>JLPT N2</Text>
            <TouchableOpacity
                style={[styles.stylesButton, { backgroundColor: colors.colors_darkSlateGray }]}
            >
                <Image
                    source={REQUIREIMG.img_star}
                    style={styles.styleImg}
                    resizeMode='contain'
                />

                <Text style={styles.styleTextButton}>文字</Text>

            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.stylesButton, { backgroundColor: colors.colors_DarkSeaGreen2 }]}
            >
                <View style={{ flexDirection: "row", }} >
                    <Image
                        source={REQUIREIMG.img_star}
                        style={styles.styleImg}
                        resizeMode='contain'
                    />
                    <Image
                        source={REQUIREIMG.img_star}
                        style={styles.styleImg}
                        resizeMode='contain'
                    />
                </View>
                <Text style={styles.styleTextButton}>語彙</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.stylesButton, { backgroundColor: colors.colors_khaki }]}
            >
                <View style={{ flexDirection: "row", }} >
                    <Image
                        source={REQUIREIMG.img_star}
                        style={styles.styleImg}
                        resizeMode='contain'
                    />
                    <Image
                        source={REQUIREIMG.img_star}
                        style={styles.styleImg}
                        resizeMode='contain'
                    />
                    <Image
                        source={REQUIREIMG.img_star}
                        style={styles.styleImg}
                        resizeMode='contain'
                    />
                </View>
                <Text style={styles.styleTextButton}>文法</Text>
            </TouchableOpacity>


        </View>
    )
}

export default BodyGrammar

const styles = StyleSheet.create({
    styleTitle: {
        fontWeight: "900",
        fontSize: 56,
        color: colors.colors_darkCyan,
        marginBottom: 20
    },
    stylesContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: -32
    },
    stylesButton: {
        width: 250,
        height: 120,
        marginVertical: 12,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: "center"
    },
    styleTextButton: {
        fontSize: 36,
        fontWeight: '700',
        color: colors.colors_black,
        lineHeight: 68
    },
    styleImg: {
        width: 32,
        height: 32,
        marginHorizontal: 3
    }
})