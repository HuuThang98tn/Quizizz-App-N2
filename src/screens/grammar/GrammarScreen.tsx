import { StyleSheet, ImageBackground, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import FooterAppHeader from '@components/footer/FooterAppHeader';
import BodyGrammar from './components/BodyGrammar';
import { useNavigation } from '@react-navigation/native'
import { REQUIREIMG } from '@theme/require/RequireImage';
import { SCREEN_HEIGHTSCREEN, SCREEN_WIDTHSCREEN } from '@theme/size/sizeScree';

type Props = {}

const GrammarScreen = (props: Props) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const navigation: any = useNavigation()

    const onPressGoBack = () => {
        navigation.goBack();
    }
    const onPressNext = () => { }
    const onPressGoHome = () => {
        navigation.navigate("HomeScreen" as never)
    }

    const onPressStarScreen = (value: string) => {
        navigation.push("GrammarDetailsScreen", value)
    }




    return (
        <SafeAreaView style={styles.stylesContainer}>
            <ImageBackground
                source={REQUIREIMG.ic_hs_25}
                style={{
                    width: SCREEN_WIDTHSCREEN,
                    height: SCREEN_HEIGHTSCREEN,
                    flex: 1
                }}
                resizeMode='cover'
            >
                <View style={styles.styleBody}>
                    <BodyGrammar
                        onPressStarOne={() => onPressStarScreen("alphabet")}
                        onPressStarTwo={() => onPressStarScreen("vocabulary")}
                        onPressStarThree={() => onPressStarScreen("grammar")}
                    />
                </View>
                <View style={styles.styleFooter}>
                    <FooterAppHeader
                        onPressGoBack={onPressGoBack}
                        onPressNext={onPressNext}
                        onPressGoHome={onPressGoHome}
                        isVisible={isVisible}
                    />
                </View>
            </ImageBackground>

        </SafeAreaView>
    )
}

export default GrammarScreen

