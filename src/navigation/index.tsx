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
import HelloScreen from '../screens/login/hello-screen';
import CategoryTypeScreen from '../screens/main/category-type/category-type';
import FavoriteCategoryScreen from '../screens/main/favorite-category/favorite-category';
import CategoryScreen from '../screens/main/category/category';
import RecordPlayerScreen from '../screens/main/record-player/record-player';
import BlogScreen from '../screens/main/blog/blog';
import TrackListScreen from '../screens/main/track-list/track-list';
import PodcastCategoryScreen from '../screens/main/category/podcast-category';
import CreateBlogScreen from '../screens/main/create-blog/create-blog';
import { Portal } from 'react-native-paper';
import Toast from 'react-native-toast-message';

const Stack = createStackNavigator();

const AppNavigationContainer = () => {
    const darkMode = useSelector((state: RootState) => state.theme.darkMode);
    const theme = darkMode ? DarkTheme : DefaultTheme;

    return (
        <Portal>
            <NavigationContainer theme={theme}>
                <Stack.Navigator initialRouteName={SCREEN_CONSTANT.HELLO}>
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
                    <Stack.Screen
                        name={SCREEN_CONSTANT.FAVORITE_CATEGORY}
                        component={FavoriteCategoryScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name={SCREEN_CONSTANT.CATEGORY}
                        component={CategoryScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name={SCREEN_CONSTANT.RECORD_PLAYER}
                        component={RecordPlayerScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name={SCREEN_CONSTANT.BLOG}
                        component={BlogScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name={SCREEN_CONSTANT.TRACK_LIST}
                        component={TrackListScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name={SCREEN_CONSTANT.PODCACST_CATEGORY}
                        component={PodcastCategoryScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name={SCREEN_CONSTANT.CREATE_BLOG}
                        component={CreateBlogScreen}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Portal>
    );
};
export default AppNavigationContainer;
