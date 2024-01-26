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
const Tab = createBottomTabNavigator();

const MainTab = () => {
    return (
        <Tab.Navigator initialRouteName="home" screenOptions={{ headerShown: false }} >
            <Tab.Screen name='home'
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Trang chủ',
                }} />
            <Tab.Screen name='discover'
                component={Discover}
                options={{
                    tabBarLabel: 'Khám phá',
                }} />
            <Tab.Screen name='saved'
                component={Save}
                options={{
                    tabBarLabel: 'Đã lưu',
                }} />
            <Tab.Screen name='personal'
                component={Personal}
                options={{
                    tabBarLabel: 'Cá nhân',
                }} />
        </Tab.Navigator>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
});

export default MainTab;
