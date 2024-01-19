import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, Platform, Image } from 'react-native';
import { TextInput, Button, Text, Provider as PaperProvider } from 'react-native-paper';
import { Common } from '../../utils';
import { useMMKVString } from 'react-native-mmkv';
import { BaseService } from '../../service/base-service';
import {
    UserAccountEntity,
    UserAccountLoginEntity,
    UserAccountLoginResponseEntity,
} from '../../model/user-account-entity';
import { APP_CONSTANT, SCREEN_CONSTANT, STATUS_REPONSE_API } from '../../config/configuration';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux-store/store';
import { useTheme } from '@react-navigation/native'

const LoginScreen = ({ navigation }: any) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [fcmToken] = useMMKVString('FCM_TOKEN');
    const [userNameStore, setUserNameStore] = useMMKVString(APP_CONSTANT.userNameStore);
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const userService = new BaseService<UserAccountLoginEntity, UserAccountLoginResponseEntity>('UserAccount/login');
    const { colors } = useTheme();
    const dispatch = useDispatch();
    const darkMode = useSelector((state: RootState) => state.theme.darkMode);

    const handleToggleMode = () => {
        dispatch({ type: 'TOGGLE_DARK_MODE' });
    };

    const handleLogin = async () => {
        try {
            const request: UserAccountLoginEntity = {
                userName: userName,
                password: password,
            };
            const response = await userService.postAsync(request);

            if (response?.data?.code === STATUS_REPONSE_API.OK) {
                const result = response.data.data;
                Common.storage.set('user_info', JSON.stringify(result));
                Common.storage.set('api_secret', result?.token ?? '');
                setUserNameStore(result?.userName ?? '');

                await Common.dismissKeyboard(() => {
                    navigation.navigate(SCREEN_CONSTANT.CATEGORY_TYPE);
                });
            } else {
                console.error('Login failed:', response?.data.message);
                Alert.alert('Login Failed', 'response?.data.message');
            }
        } catch (error) {
            console.error('Error during login:', error);
            Alert.alert('Error', 'An error occurred during login. Please try again later.');
        }
    };
    return (
        <View style={styles.container}>
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
                <Button onPress={handleToggleMode} mode="contained-tonal" style={{ marginVertical: 18, width: '100%', backgroundColor: '#FFF' }}>
                    {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                </Button>
                <Text style={[styles.text, { color: colors.text }]}>
                    No account yet?{' '}
                    <Text onPress={() => { }} style={styles.link}>
                        Forgot Password
                    </Text>
                </Text>
            </View>
            <Text style={[styles.versionText, { color: colors.text }]}> Version 0.0.1</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    darkContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#000',
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
        backgroundColor: '#FFF',
    },

    versionText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 16,
    },
    text: {
        marginTop: 16,
        textAlign: 'center',
    },
    link: {
        color: '#4284f5',
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
