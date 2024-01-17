import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';

const HomeScreen = ({ navigation }: any) => {
    // Sử dụng useSelector để lấy giá trị state từ Redux store
    const count = useSelector((state: any) => state);

    // Sử dụng useDispatch để gửi các action đến Redux store
    const dispatch = useDispatch();

    const handleAdd = () => {
        // Dispatch action 'add' khi nút Add được nhấn
        dispatch({ type: 'add' });
    };

    const handleMinus = () => {
        // Dispatch action 'minus' khi nút Minus được nhấn
        dispatch({ type: 'minus' });
    };

    return (
        <LinearGradient colors={['#3498db', '#1abc9c']} style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.text}>Home Screen</Text>
                <Text style={styles.text}>Count: {count}</Text>
                <Button mode="contained" onPress={handleAdd} style={styles.button}>
                    Add 10
                </Button>
                <Button mode="contained" onPress={handleMinus} style={styles.button}>
                    Minus 10
                </Button>
                <Button mode="contained" onPress={() => navigation.navigate('Audio')} style={{ marginTop: 20 }}>
                    Go Audio
                </Button>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        color: 'white',
        marginBottom: 20,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#1abc9c',
    },
});

export default HomeScreen;
