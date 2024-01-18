import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux-store/store';
import { Text } from 'react-native-paper';
import { useTheme } from '@react-navigation/native'

const HomeScreen = ({ navigation }: any) => {
    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <Text style={{ color: colors.text }}>HomeScreen</Text>
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
    darkContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#000',
    },
});

export default HomeScreen;
