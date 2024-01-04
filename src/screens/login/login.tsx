import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, Platform, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TextInput, Button, Text, Provider as PaperProvider } from 'react-native-paper';

const LoginScreen = ({ navigation }: any) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const handleLogin = () => {
        navigation.navigate('Home');
    };
    return (
        <LinearGradient colors={['#3498db', '#1abc9c']} style={styles.linearGradient}>
            <View style={styles.container}>
                <TextInput label="Name" value={userName} onChangeText={setUserName} style={styles.input} />
                <TextInput
                    label="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={secureTextEntry}
                    style={styles.input}
                    right={
                        <TextInput.Icon
                            icon={secureTextEntry ? 'eye-off' : 'eye'}
                            onPress={() => setSecureTextEntry(!secureTextEntry)}
                        />
                    }
                />
                <Button mode="contained" onPress={handleLogin} style={styles.button}>
                    Log In
                </Button>
            </View>
            <Text style={styles.versionText}>VGM Version 1.0.0</Text>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        marginBottom: 16,
        backgroundColor: '#34cadb',
    },
    button: {
        marginTop: 8,
        backgroundColor: '#1abc9c',
    },

    linearGradient: {
        flex: 1,
    },
    versionText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 16,
    },
});

export default LoginScreen;
