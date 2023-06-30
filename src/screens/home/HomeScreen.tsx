import { View, ImageBackground, Platform, ScrollView, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './styleHome';
import { REQUIREIMG } from '@theme/require/RequireImage';
import HeaderHome from './components/HeaderHome';
import TitleHome from './components/TitleHome';
import ButtonHome from './components/ButtonHome';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setSound } from "../../reduxs/actions/soundActions";
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppOpenAd, TestIds, AdEventType, InterstitialAd } from 'react-native-google-mobile-ads';
const adUnitId = __DEV__ ? TestIds.APP_OPEN : Platform.OS === "android"
    ? "ca-app-pub-4654653142461000/5038351832"
    : "ca-app-pub-4654653142461000/2943026751";
type Props = {}
const HomeScreen = (props: Props) => {
    const [sound, setSounds] = useState<boolean>(true);
    const navigation: any = useNavigation();
    const dispatch = useDispatch();
    const onPressGrammar = () => navigation.navigate("GrammarScreen");
    const onPressVocabulary = () => navigation.navigate("VocabularyScreen");

    useEffect(() => {
        setTimeout(() => {
            let interstitial = InterstitialAd.createForAdRequest(adUnitId, {

                requestNonPersonalizedAdsOnly: true,
                keywords: ['fashion', 'clothing'],
            });
            let interstitialListener: any = interstitial.addAdEventListener(AdEventType.LOADED, () => {
                interstitial.show();
            });
            interstitial.load();
            return () => {
                interstitialListener = null;
            };

        }, 2000)

    }, [])
    const onPressSound = () => {
        setSounds(!sound)
        dispatch<any>(setSound(!sound))
    }
    return (
        <SafeAreaView style={styles.styleContainer}>

            <ImageBackground
                source={REQUIREIMG.img_background}
                resizeMode='cover'
                style={styles.styleImgBGR}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
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


                    </View>
                </ScrollView>
            </ImageBackground >
        </SafeAreaView >
    )
}

export default HomeScreen

