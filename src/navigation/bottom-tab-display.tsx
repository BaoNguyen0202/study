import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { SCREEN_CONSTANT } from '../config/configuration';
import { Icon } from 'react-native-paper';

const BottomTabDisplay = ({ state, descriptors, navigation }: any) => {
    const theme = useTheme();

    const icons = ['home-outline', 'newspaper-variant', 'bookmark-minus-outline', 'account-outline'];

    return (
        <View style={styles.container}>
            {state.routes.map((route: any, index: any) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                const icon = icons[index]; // Lấy tên icon tương ứng

                return (
                    <TouchableOpacity
                        key={index}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : undefined}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.tabItem}>
                        <Icon
                            source={icon}
                            size={24}
                            color={isFocused ? '#FE2083' : '#FFF'}
                        />
                        <Text style={{ color: isFocused ? '#FE2083' : '#FFF', marginTop: 5 }}>
                            {label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 58,
        borderTopColor: '#ccc',
        backgroundColor: '#201a2e',
        opacity: 0.95
    },
    tabItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
    },
});

export default BottomTabDisplay;
