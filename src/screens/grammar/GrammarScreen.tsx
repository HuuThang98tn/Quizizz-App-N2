import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import FooterAppHeader from '@components/footer/FooterAppHeader';
import BodyGrammar from './components/BodyGrammar';
import { useNavigation } from '@react-navigation/native'

type Props = {}

const GrammarScreen = (props: Props) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const navigation = useNavigation()

    const onPressGoBack = () => {
        navigation.goBack();
    }
    const onPressNext = () => { }
    const onPressGoHome = () => {
        navigation.navigate("HomeScreen" as never)
    }

    return (
        <SafeAreaView style={styles.stylesContainer}>
            <View style={styles.styleBody}>
                <BodyGrammar />
            </View>
            <View style={styles.styleFooter}>
                <FooterAppHeader
                    onPressGoBack={onPressGoBack}
                    onPressNext={onPressNext}
                    onPressGoHome={onPressGoHome}
                    isVisible={isVisible}
                />
            </View>
        </SafeAreaView>
    )
}

export default GrammarScreen

