import { View, Text, SafeAreaView, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ImageAssets } from '../../assets'
import { styles } from './personal.style'
import { Avatar, Button, Icon, Modal, Switch, TextInput, Title } from 'react-native-paper'
import { useMMKVString } from 'react-native-mmkv'
import { CONFIG_URL, SCREEN_CONSTANT, STATUS_REPONSE_API } from '../../config/configuration'
import { UserAccountChangePassWord, UserAccountEntity } from '../../model/user-account-entity'
import { Ultility } from '../../common/ultility'
import { InforService } from '../../service/user-account-service'
import { Common } from '../../utils'
import Toast from 'react-native-toast-message'
import { WIDTH } from '../../common/constant'
import RNPickerSelect from "react-native-picker-select";

const Personal = ({ navigation }: any) => {
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
    const [fcmToken, setToken] = useMMKVString('FCM_TOKEN');
    const [visibleModal, setVisibleModal] = useState(false);
    const [visibleChangePasswordModal, setVisibleChangePasswordModal] = useState(false);
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [userData, setUserData] = useState<UserAccountEntity | null>(Ultility.getUserInfo());
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const handleLogout = () => {
        setToken('');
        Common.storage.clearAll();
        navigation.navigate(SCREEN_CONSTANT.HELLO);
    }
    const showModal = async () => {
        await fetchUserData();
        setVisibleModal(true);
    };

    const hideModal = async () => {
        await fetchUserData();
        setVisibleModal(false);
    };

    const showChangePasswordModal = () => setVisibleChangePasswordModal(true);
    const hideChangePasswordModal = () => setVisibleChangePasswordModal(false);
    const userAccountId = Ultility.getUserInfo().id ?? null;

    const handleFullNameChange = (text: any) => {
        setUserData((prevUserData) => ({
            ...prevUserData,
            customer: {
                ...prevUserData?.customer,
                fullName: text,
            },
        }));
    };

    const handleAddressChange = (text: any) => {
        setUserData((prevUserData) => ({
            ...prevUserData,
            customer: {
                ...prevUserData?.customer,
                address: text,
            },
        }));
    };

    const handleBirthChange = (text: any) => {
        setUserData((prevUserData) => ({
            ...prevUserData,
            customer: {
                ...prevUserData?.customer,
                birth: text,
            },
        }));
    };

    useEffect(() => {
        fetchUserData()
    }, []);

    const inforService = new InforService();

    const fetchUserData = async () => {
        try {
            if (userAccountId) {
                const response = await inforService.getInfor(userAccountId);
                if (response?.data?.code === STATUS_REPONSE_API.OK) {
                    const userDataInfor = response.data.data;
                    if (userDataInfor) {
                        setUserData(userDataInfor);
                    } else {
                        console.error('userDataInfor is undefined');
                    }
                }
            } else {
                console.error('acountId is null or undefined');
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    const handleUpdateInfor = async () => {
        try {
            const updatedInfo: UserAccountEntity = {
                id: userData?.customer?.id,
                userAccountId: userAccountId,
                gender: userData?.gender,
                image: userData?.image,
                fullName: userData?.customer?.fullName,
                address: userData?.customer?.address,
                birth: userData?.customer?.birth ? new Date(userData.customer?.birth) : null,
            };
            const response = await inforService.updateInfor(updatedInfo);
            if (response?.data?.code === STATUS_REPONSE_API.OK) {
                Toast.show({
                    type: 'error',
                    text1: 'Thông báo',
                    text2: `Cập nhật thông tin thành công.`
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Thông báo',
                    text2: response?.data.message?.toString()
                });
            }
        } catch (error) {
            console.error('Error updating user profile:', error);
        } finally { setVisibleModal(false) }
    }

    const handleChangePass = async () => {
        try {
            const changePassWord: UserAccountChangePassWord = {
                id: userAccountId,
                oldHashPassword: currentPassword,
                newHashpassword: newPassword,
            };
            const response = await inforService.changePass(changePassWord)
            if (response?.data?.code === STATUS_REPONSE_API.OK) {
                setVisibleChangePasswordModal(false);
                Toast.show({
                    type: 'error',
                    text1: 'Thông báo',
                    text2: `Đổi mật khẩu thành công. Bạn sẽ đăng xuất sau 3 giây để đăng nhập lại.`
                });
                setTimeout(() => {
                    handleLogout();
                }, 3000);
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Thông báo',
                    text2: response?.data.message?.toString()
                });
            }
        } catch (error) {
            console.error('Error :', error);
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <Image source={ImageAssets.Bg_Image} style={styles.bgImage} />
            <View style={styles.containerContent}>
                <Text style={styles.textHeader}>Cá nhân</Text>
                {userData && userData.customer && (
                    <View style={styles.content}>
                        <TouchableOpacity style={{ overflow: 'hidden', borderRadius: 82, borderColor: '#FE2083', borderWidth: 1.5, width: 165, height: 165 }}>
                            <Avatar.Image source={{ uri: CONFIG_URL.URL_UPLOAD + userData.image || '' }} size={164} />
                        </TouchableOpacity>
                        <Text style={[styles.text, { fontWeight: '700', fontSize: 32 }]}>{userData.customer.fullName}</Text>
                        <View style={[styles.row, { marginVertical: 4 }]}>
                            <Icon color='#C2C2C2' source={'map-marker'} size={20} />
                            <Text style={[styles.text, styles.textGmail]}>{userData.customer.address}</Text>
                        </View>
                        <View style={[styles.row, { marginVertical: 4 }]}>
                            <Icon color='#C2C2C2' source={'email'} size={20} />
                            <Text style={[styles.text, styles.textGmail]}>{userData.email}</Text>
                        </View>
                    </View>
                )}
                <Button style={styles.button} onPress={showModal} textColor='#FFFFFF'>Sửa thông tin cá nhân</Button>

                <View style={styles.line} />
                <Text style={[styles.text, { fontWeight: '700', fontSize: 18, marginVertical: 8 }]}>Cài đặt</Text>
                <TouchableOpacity style={[styles.row, { justifyContent: 'space-between', marginVertical: 4 }]} onPress={showChangePasswordModal}>
                    <Text style={[styles.text, { fontSize: 14, fontWeight: '400', alignSelf: 'center' }]}>Đổi mật khẩu</Text>
                    <Icon color='#C2C2C2' source={'lock'} size={20} />
                </TouchableOpacity>

                <View style={styles.line} />

                <View style={[styles.row, { justifyContent: 'space-between', marginVertical: 4 }]}>
                    <Text style={[styles.text, { fontSize: 14, fontWeight: '400', alignSelf: 'center' }]}>Chế độ nền tối</Text>
                    <View>
                        <Switch color='#FE2083' ios_backgroundColor={'#FE2083'} value={isSwitchOn} onValueChange={onToggleSwitch} />
                    </View>
                </View>
                <View style={styles.line} />

                <TouchableOpacity style={[styles.row, { justifyContent: 'space-between', marginVertical: 4 }]} onPress={() => handleLogout()}>
                    <Text style={[styles.text, { fontSize: 14, fontWeight: '400', alignSelf: 'center' }]}>Đăng xuất</Text>
                    <Icon color='#C2C2C2' source={'logout'} size={20} />
                </TouchableOpacity>
            </View>

            <Modal visible={visibleModal} onDismiss={hideModal} contentContainerStyle={styles.modalContent}>
                <Text style={[styles.text, { textAlign: 'center', fontSize: 20, fontWeight: '700', marginBottom: 16 }]}>Sửa thông tin cá nhân</Text>
                <Text style={[styles.text, { fontSize: 14, fontWeight: '500' }]}>Họ và tên</Text>
                <TextInput
                    theme={{ roundness: 23 }}
                    placeholder='Họ và tên'
                    mode='outlined'
                    style={styles.input}
                    value={userData?.customer?.fullName ?? ''}
                    onChangeText={handleFullNameChange}
                />
                <Text style={[styles.text, { fontSize: 14, fontWeight: '500' }]}>Địa chỉ</Text>
                <TextInput
                    theme={{ roundness: 23 }}
                    placeholder='Địa chỉ'
                    mode='outlined'
                    style={styles.input}
                    value={userData?.customer?.address ?? ''}
                    onChangeText={handleAddressChange}
                />
                <Text style={[styles.text, { fontSize: 14, fontWeight: '500' }]}>Ngày sinh</Text>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                    <TextInput
                        placeholder='Ngày sinh'
                        mode='outlined'
                        style={[styles.input, { width: '25%' }]}
                        value={'14'}
                        theme={{ roundness: 23 }}
                        onChangeText={handleBirthChange}
                    />
                    <TextInput
                        placeholder='Tháng sinh'
                        mode='outlined'
                        style={[styles.input, { width: '35%' }]}
                        value={'Tháng 10'}
                        theme={{ roundness: 23 }}
                        onChangeText={handleBirthChange}
                    />
                    <TextInput
                        placeholder='Năm sinh'
                        mode='outlined'
                        style={[styles.input, { width: '30%' }]}
                        value={'2000'}
                        theme={{ roundness: 23 }}
                        onChangeText={handleBirthChange}
                    />
                </View>
                <View style={[styles.row, { justifyContent: 'space-between', marginTop: 16 }]}>
                    <Button style={{ borderColor: '#FE2083', width: '47%' }} textColor='#FE2083' mode='outlined' onPress={hideModal}>Hủy</Button>
                    <Button style={{ backgroundColor: '#FE2083', width: '47%' }} textColor='#FFF' onPress={() => handleUpdateInfor()}>Lưu</Button>
                </View>
            </Modal>
            <Modal visible={visibleChangePasswordModal} onDismiss={hideChangePasswordModal} contentContainerStyle={styles.modalContent}>
                <Text style={[styles.text, { textAlign: 'center', fontSize: 20, fontWeight: '700' }]}>Đổi mật khẩu</Text>
                <Text style={[styles.text, { fontSize: 14, fontWeight: '500' }]}>Mật khẩu hiện tại</Text>
                <TextInput
                    placeholder='Nhập mật khẩu hiện tại'
                    mode='outlined'
                    theme={{ roundness: 23 }}
                    style={styles.input}
                    secureTextEntry={secureTextEntry}
                    value={currentPassword}
                    onChangeText={(text) => setCurrentPassword(text)}
                    right={
                        <TextInput.Icon
                            icon={secureTextEntry ? 'eye-off' : 'eye'}
                            onPress={() => setSecureTextEntry(!secureTextEntry)}
                        />
                    }
                />
                <Text style={[styles.text, { fontSize: 14, fontWeight: '500' }]}>Mật khẩu mới</Text>
                <TextInput
                    placeholder='Nhập mật khẩu mới'
                    mode='outlined'
                    theme={{ roundness: 23 }}
                    style={styles.input}
                    secureTextEntry={secureTextEntry}
                    value={newPassword}
                    onChangeText={(text) => setNewPassword(text)}
                    right={
                        <TextInput.Icon
                            icon={secureTextEntry ? 'eye-off' : 'eye'}
                            onPress={() => setSecureTextEntry(!secureTextEntry)}
                        />
                    }
                />
                <Text style={[styles.text, { fontSize: 14, fontWeight: '500' }]}>Xác nhận mật khẩu</Text>
                <TextInput
                    placeholder='Nhập lại mật khẩu mới'
                    mode='outlined'
                    theme={{ roundness: 23 }}
                    style={styles.input}
                    secureTextEntry={secureTextEntry}
                    value={confirmPassword}
                    onChangeText={(text) => setConfirmPassword(text)}
                    right={
                        <TextInput.Icon
                            icon={secureTextEntry ? 'eye-off' : 'eye'}
                            onPress={() => setSecureTextEntry(!secureTextEntry)}
                        />
                    }
                />
                <View style={[styles.row, { justifyContent: 'space-between', marginTop: 16 }]}>
                    <Button style={{ borderColor: '#FE2083', width: '47%' }} textColor='#FE2083' mode='outlined' onPress={hideChangePasswordModal}>Hủy</Button>
                    <Button style={{ backgroundColor: '#FE2083', width: '47%' }} textColor='#FFF' onPress={() => handleChangePass()}>Lưu</Button>
                </View>
            </Modal>
        </SafeAreaView >
    )
}

export default Personal