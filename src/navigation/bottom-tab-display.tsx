import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Icon, Text } from 'react-native-paper';

const CustomBottomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
    const { colors } = useTheme();

    return (
        <View style={styles.tabBar}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
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

                return (
                    <View key={route.key} style={styles.tabItem}>
                        <Icon
                            source={options.tabBarIcon?.({ focused: isFocused, color: colors.primary, size: 24 })}
                            size={24}
                            color={isFocused ? colors.primary : colors.text}
                        />
                        <Text style={{ color: isFocused ? colors.primary : colors.text }}>{route.name}</Text>
                    </View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#2B233E',
        opacity: 0.6,
        height: 58,
        borderRadius: 40,
        paddingHorizontal: 14,
        marginHorizontal: 8,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 8,
        gap: 8,
    },
});

export default CustomBottomTabBar;