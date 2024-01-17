import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import LoginScreen from '../screens/login/login';
import HomeScreen from '../screens/home/home';
import DetailsScreen from '../screens/detail/detail';
import AudioScreen from '../components/audio';
import MainTab from './main-tab';
import { SCREEN_CONSTANT } from '../config/configuration';

const Stack = createStackNavigator();

const AppNavigationContainer = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name={SCREEN_CONSTANT.LOG_IN} component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name={SCREEN_CONSTANT.MAIN_TAB} component={MainTab} />
                <Stack.Screen name={SCREEN_CONSTANT.HOME} component={HomeScreen} />
                <Stack.Screen name={SCREEN_CONSTANT.DETAIL} component={DetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigationContainer;
