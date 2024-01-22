import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, Platform, Image } from 'react-native';
import { TextInput, Button, Text, Provider as PaperProvider, Icon } from 'react-native-paper';
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
import { ImageAssets } from '../../assets';

const LoginScreen = ({ navigation }: any) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [fcmToken] = useMMKVString('FCM_TOKEN');
    const [userNameStore, setUserNameStore] = useMMKVString(APP_CONSTANT.userNameStore);
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const userService = new BaseService<UserAccountLoginEntity, UserAccountLoginResponseEntity>('UserAccount/login');
    const { colors, } = useTheme();
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
            <Image source={ImageAssets.Bg_Image} style={styles.bgImage} />

            <View style={styles.containerContent}>
                <View style={styles.iconheader}>
                    <Icon source={'chevron-left'} color="#FFF" size={24} />
                </View>
                <View style={{ marginVertical: 16 }}>
                    <Text style={styles.text}>Chào mừng đã trở lại!</Text>
                    <Text style={styles.text}>Hãy đăng nhập để sử dụng ứng dụng</Text>
                </View>
                <TextInput mode='outlined' label="Tên đăng nhập" value={userName} onChangeText={setUserName} style={styles.input} />
                <TextInput
                    mode='outlined'
                    label="Mật khẩu"
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
                <Text style={styles.textForgotpass}>Quên mật khẩu?</Text>
                <Button mode="contained" onPress={handleLogin} style={styles.button}>
                    Bắt đầu
                </Button>
                <View style={{ marginVertical: 16, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.line} />
                    <Text style={{ color: '#FFF', marginHorizontal: 8 }}>Hoặc đăng nhập với</Text>
                    <View style={styles.line} />
                </View>
                <View style={{ marginVertical: 16, flexDirection: 'row', alignItems: 'center' }}>

                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerContent: {
        flex: 1,
        marginHorizontal: 24,
        marginTop: 51
    },
    headerContainer: {
        flex: 1,
    },
    input: {
        marginBottom: 16,
        backgroundColor: '#FFF',

    },
    button: {
        backgroundColor: '#FE2083',
        borderRadius: 100,
        gap: 10,
        marginVertical: 12
    },
    text: {
        color: '#FFF',
        fontWeight: '700',
        fontSize: 24
    },
    link: {
        color: '#4284f5',
    },
    textForgotpass: {
        color: '#FE2083',
        fontWeight: '600',
        alignSelf: 'flex-end',
        marginRight: 24
    },
    bgImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: -9999
    },
    iconheader: {
        backgroundColor: '#666565',
        width: 36,
        height: 36,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#FFF',
    },
});

export default LoginScreen;
