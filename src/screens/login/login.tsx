import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, Platform, Image } from 'react-native';
import { TextInput, Button, Text, Provider as PaperProvider } from 'react-native-paper';
import { ImageAssets } from '../../assets';
import { Common } from '../../utils';
import { useMMKVString } from 'react-native-mmkv';
import axios from 'axios';
import { BaseService } from '../../service/base-service';
import { UserAccountEntity, UserAccountLoginEntity, UserAccountLoginResponseEntity } from '../../model/user-account-entity';
import { APP_CONSTANT, SCREEN_CONSTANT, STATUS_REPONSE_API } from '../../config/configuration';
import { ResponseAPI } from '../../model/response-api';

const LoginScreen = ({ navigation }: any) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [fcmToken] = useMMKVString('FCM_TOKEN');
    const [userNameStore, setUserNameStore] = useMMKVString(APP_CONSTANT.userNameStore);
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const userService = new BaseService<UserAccountLoginEntity, UserAccountLoginResponseEntity>('UserAccount/Login');

    const handleLogin = async () => {
        try {
            const request: UserAccountLoginEntity = {
                userName: userName,
                password: password
            }
            const response = await userService.postAsync(request);
            if (response?.data.status === STATUS_REPONSE_API.OK) {
                const result = response.data.data;
                Common.storage.set('user_info', JSON.stringify(result));
                Common.storage.set('api_secret', result?.token ?? '');
                setUserNameStore(result?.userName ?? '');

                await Common.dismissKeyboard(() => {
                    navigation.navigate(SCREEN_CONSTANT.HOME);
                });
            }
            else {
                console.error('Login failed:', response?.data.message);
                Alert.alert('Login Failed', 'response?.data.message');
            }
        } catch (error) {
            console.error('Error during login:', error);
            Alert.alert('Error', 'An error occurred during login. Please try again later.');
        }
    };
    return (
        <View style={styles.headerContainer}>
            {/* <Image source={ImageAssets.InitLogo} style={styles.logo} /> */}

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
                <Button mode="contained-tonal" icon={'camera'} onPress={handleLogin} style={styles.button}>
                    Log In
                </Button>
                <Text style={styles.text}>
                    No account yet?{' '}
                    <Text onPress={() => { }} style={styles.link}>
                        Forgot Password
                    </Text>
                </Text>
            </View>
            <Text style={styles.versionText}> Version 0.0.1</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    headerContainer: {
        flex: 1,
    },
    input: {
        marginBottom: 16,
        backgroundColor: '#FFF',
    },
    button: {
        marginTop: 8,
        backgroundColor: '#cfcfcf',
    },

    linearGradient: {
        flex: 1,
    },
    versionText: {
        color: '#000',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 16,
    },
    text: {
        marginTop: 16,
        textAlign: 'center',
    },
    link: {
        color: 'blue',
    },
    logo: {
        marginBottom: '-40%',
        resizeMode: 'contain',
        alignSelf: 'center',
        width: '60%',
        top: '5%',
        flex: 0.3,
    },
});

export default LoginScreen;
