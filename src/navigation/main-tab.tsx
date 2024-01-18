import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native'
const MainTab = () => {
    const { colors } = useTheme();
    return (
        <View style={styles.container}>
            <Text style={{ color: colors.text }}>MainTab</Text>
        </View>
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
