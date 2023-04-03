import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styleHome';
import { REQUIREIMG } from '@theme/require/RequireImage';
import MyStatusBar from '@components/forms/MyStatusBar';
import { STATUS_BAR_HEIGHT } from '@theme/size/sizeScree';
import HeaderHome from './components/HeaderHome';
import TitleHome from './components/TitleHome';
import ButtonHome from './components/ButtonHome';
import { useNavigation } from '@react-navigation/native';
import FooterAppHeader from '../../components/footer/FooterAppHeader';
import { useSelector, useDispatch } from 'react-redux';
import { setSound } from "../../reduxs/actions/soundActions"
type Props = {}
const HomeScreen = (props: Props) => {
    const [sound, setSounds] = useState<boolean>(true);
    const navigation: any = useNavigation();
    const dispatch = useDispatch();
    const onPressGrammar = () => navigation.navigate("GrammarScreen")
    const onPressVocabulary = () => navigation.navigate("VocabularyScreen")

    const onPressSound = () => {
        setSounds(!sound)
        dispatch<any>(setSound(!sound))
    }
    return (
        <View style={styles.styleContainer}>
            <ImageBackground
                source={REQUIREIMG.img_background}
                resizeMode='cover'
                style={styles.styleImgBGR}>
                <View style={styles.styleBody}>
                    <HeaderHome
                        onPressSound={onPressSound}
                        soundUnmute={sound}
                    />
                    <View style={styles.styleTitleHome}>
                        <TitleHome />
                    </View>
                    <View style={styles.styleButton}>
                        <ButtonHome
                            onPressVocabulary={onPressVocabulary}
                            onPressGrammar={onPressGrammar}
                        />
                    </View>
                    {/* <View style={styles.styleFooter}>
                        <FooterAppHeader />
                    </View> */}
                </View>
            </ImageBackground >
        </View >
    )
}

export default HomeScreen

