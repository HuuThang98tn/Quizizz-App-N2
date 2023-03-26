import { StyleSheet, Text, View } from 'react-native'
import React, { Component, useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackScreens } from '@navigations/StackScreens';
import SplashScreen from '@screens/splash/SplashScreen';
import LoadingModal from '@components/modal/LoadingModal';
import Sound from 'react-native-sound';
import { useSelector, useDispatch } from 'react-redux';
type Props = {}
const Stack = createNativeStackNavigator();

// const soundMp3: any = new Sound(require("../theme/sound/test.mp3"),
//     Sound.MAIN_BUNDLE, err => {
//         if (err) {
//             console.log("failed to load the sound", err);
//             return;
//         }
//     });
const LocalizationContext = (props: Props) => {
    const [isSplash, isLoading] = useState<boolean>(false);
    // const is = useSelector((state: any) => state.soundReducer);
    const isSplashLoad: any = useSelector((state: any) => state.isLoadingReducer);

    console.log(isSplashLoad.isloading);

    const SplashScreens = {
        Splash: SplashScreen,
    };

    // useEffect(() => {
    //     setTimeout(() => {
    //         if (is.isSound) {
    //             console.log("isSoundisSoundisSound", is.isSound);

    //             soundMp3.play(({ success, err }: any) => {
    //                 if (success) {
    //                     console.log('Sound played successfully!', success);
    //                 } else {
    //                     console.log('Error playing sound', err);
    //                 }
    //             });
    //         } else {
    //             console.log("===========>", is.isSound);

    //             soundMp3.stop((success: any) => {
    //                 console.log("===========>", success);

    //             })


    //         }

    //     }, 1000)

    // }, [is.isSound])


    return (
        <NavigationContainer>
            <Stack.Navigator>
                {Object.entries({
                    ...(isSplashLoad.isloading === true && SplashScreens), ...StackScreens,
                }).map(([name, component]) => (
                    < Stack.Screen
                        name={name}
                        component={component}
                        key={name}
                        options={{ headerShown: false }}
                    />
                ))}
            </Stack.Navigator>
            <LoadingModal
                isLoading={isSplash}
            />
        </NavigationContainer>
    )
}

export default LocalizationContext

