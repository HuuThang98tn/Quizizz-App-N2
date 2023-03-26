import { StatusBar, BackHandler, Platform, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react'
import Toast from 'react-native-simple-toast';
import LocalizationContext from './contex/LocalizationContext';
import MyStatusBar from '@components/forms/MyStatusBar';
import store, { persistor } from './reduxs/index';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

type Props = {}
let backAction: any = null;

const App = (props: Props) => {

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', onBackHandle);

        return () => {
            BackHandler.removeEventListener('hardwareBackPress', onBackHandle);
        };
    })

    const onBackHandle = () => {
        if (backAction + 2000 > new Date().getTime()) {
            BackHandler.exitApp();
        }
        backAction = new Date().getTime();
        Toast.show('Bấm thêm lần nữa để thoát!', Toast.SHORT);
        return true;
    };
    return (
        <Provider {...{ store }}>
            <PersistGate loading={null} persistor={persistor}>
                <MyStatusBar />
                <LocalizationContext />
            </PersistGate>
        </Provider>
    )
}
export default App
