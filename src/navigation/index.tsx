import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import LoginScreen from '../screens/login/login';
import HomeScreen from '../screens/home/home';
import DetailsScreen from '../screens/detail/detail';
import MainTab from './main-tab';
import { SCREEN_CONSTANT } from '../config/configuration';
import { RootState } from '../redux-store/store';
import { StyleSheet } from 'react-native';
import HelloScreen from '../screens/login/hello-screen';

import CategoryTypeScreen from '../screens/main/category-type/category-type';

const Stack = createStackNavigator();

const AppNavigationContainer = () => {
    const darkMode = useSelector((state: RootState) => state.theme.darkMode);
    const theme = darkMode ? DarkTheme : DefaultTheme;

    return (
        <NavigationContainer theme={theme}>
            <Stack.Navigator initialRouteName="main-tab">
                <Stack.Screen name={SCREEN_CONSTANT.HELLO} component={HelloScreen} options={{ headerShown: false }} />
                <Stack.Screen name={SCREEN_CONSTANT.LOG_IN} component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen
                    name={SCREEN_CONSTANT.HOME}
                    component={HomeScreen}
                    options={{ title: 'Home', headerTitleStyle: { color: theme.colors.text }, headerShown: false }}

                />
                <Stack.Screen
                    name={SCREEN_CONSTANT.MAIN_TAB}
                    component={MainTab}
                    options={{ title: 'MainTab', headerTitleStyle: { color: theme.colors.text }, headerShown: false }}
                />

                <Stack.Screen
                    name={SCREEN_CONSTANT.DETAIL}
                    component={DetailsScreen}
                    options={{ title: 'Detail', headerTitleStyle: { color: theme.colors.text }, headerShown: false }}
                />
                <Stack.Screen
                    name={SCREEN_CONSTANT.CATEGORY_TYPE}
                    component={CategoryTypeScreen}
                    options={{ title: 'CategoryType', headerTitleStyle: { color: theme.colors.text }, headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
export default AppNavigationContainer;
