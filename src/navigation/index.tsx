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

const Stack = createStackNavigator();

const AppNavigationContainer = () => {
    const darkMode = useSelector((state: RootState) => state.theme.darkMode);
    const theme = darkMode ? DarkTheme : DefaultTheme;

    return (
        <NavigationContainer theme={theme}>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name={SCREEN_CONSTANT.LOG_IN} component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen
                    name={SCREEN_CONSTANT.MAIN_TAB}
                    component={MainTab}
                    options={{ title: 'Main Tab', headerTitleStyle: { color: theme.colors.text } }}
                />
                <Stack.Screen
                    name={SCREEN_CONSTANT.HOME}
                    component={HomeScreen}
                    options={{ title: 'Home', headerTitleStyle: { color: theme.colors.text } }}
                />
                <Stack.Screen
                    name={SCREEN_CONSTANT.DETAIL}
                    component={DetailsScreen}
                    options={{ title: 'Detail', headerTitleStyle: { color: theme.colors.text } }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
export default AppNavigationContainer;
