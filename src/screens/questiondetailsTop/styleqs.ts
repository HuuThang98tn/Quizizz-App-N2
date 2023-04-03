import colors from '@theme/colors/colors';
import { SCREEN_WIDTHWINDOW, STATUS_BAR_HEIGHT } from '@theme/size/sizeScree';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    stylesContainer: {
        flex: 1,
        backgroundColor: colors.colors_milky
    },
    styleImgBGR: {
        width: SCREEN_WIDTHWINDOW,
        height: "100%"
    },
    styleBody: {
        flex: 1,
        backgroundColor: colors.colors_milky
    },
    styleFooter: {
        backgroundColor: colors.colors_milky,
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0
    },
    titleText: {
        fontSize: 16,
        paddingLeft: 24,
        marginHorizontal: 22,
        fontWeight: "600",
        color: colors.colors_darkCyan
    }
})