import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/home';
import Discover from '../screens/discover/discover';
import Save from '../screens/saved/saved';
import Personal from '../screens/personal/personal';
import { Icon } from 'react-native-paper';
import BottomTabDisplay from './bottom-tab-display';
import { SCREEN_CONSTANT } from '../config/configuration';
const Tab = createBottomTabNavigator();

const MainTab = () => {
    return (
        <Tab.Navigator initialRouteName="home" screenOptions={{ headerShown: false }} tabBar={props => <BottomTabDisplay {...props} />} >
            <Tab.Screen name={SCREEN_CONSTANT.HOME}
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Trang chủ',
                }} />
            <Tab.Screen name={SCREEN_CONSTANT.DISCOVER}
                component={Discover}
                options={{
                    tabBarLabel: 'Khám phá',
                }} />
            <Tab.Screen name={SCREEN_CONSTANT.SAVE}
                component={Save}
                options={{
                    tabBarLabel: 'Đã lưu',
                }} />
            <Tab.Screen name={SCREEN_CONSTANT.PERSONAL}
                component={Personal}
                options={{
                    tabBarLabel: 'Cá nhân',
                }} />
        </Tab.Navigator>
    );
};

export default MainTab;
