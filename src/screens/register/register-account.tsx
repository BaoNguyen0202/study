import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import registerStyles from './register.style'
import { ImageAssets } from '../../assets'
import { favoriteCategoryStyles } from '../main/favorite-category/favorite-category.style'
import { Appbar, Button, Icon, Modal, TextInput } from 'react-native-paper'
import { HEIGHT } from '../../common/constant'
import { SCREEN_CONSTANT, STATUS_REPONSE_API } from '../../config/configuration'
import { Common } from '../../utils'
import { UserAccountRegisterEntity } from '../../model/user-account-entity'
import { InforService } from '../../service/user-account-service'
import SuccessModal from '../modal/success-modal/success-modal'
import DropDownPicker from 'react-native-dropdown-picker';

const RegisterAccountScreen = ({ navigation }: any) => {
    const [openGender, setOpenGender] = useState(false);
    const [openDay, setOpenDay] = useState(false);
    const [openMonth, setOpenMonth] = useState(false);
    const [openYear, setOpenYear] = useState(false);

    const [valueGender, setValueGender] = useState(null);
    const [itemsGender, setItemsGender] = useState([
        { label: 'Nam', value: 1 },
        { label: 'Nữ', value: 0 },
        { label: 'Khác', value: 2 }
    ]);

    let daysArray = [];
    for (let day = 1; day <= 31; day++) {
        daysArray.push(
            { label: 'Ngày ' + day.toString(), value: day },
        );
    }
    const [valueDay, setValueDay] = useState(null);
    const [itemsDay, setItemsDay] = useState(daysArray);

    const [valueMonth, setValueMonth] = useState(null);
    const [itemsMonth, setItemsMonth] = useState([
        { label: 'Tháng 1', value: 1 },
        { label: 'Tháng 2', value: 2 },
        { label: 'Tháng 3', value: 3 },
        { label: 'Tháng 4', value: 4 },
        { label: 'Tháng 5', value: 5 },
        { label: 'Tháng 6', value: 6 },
        { label: 'Tháng 7', value: 7 },
        { label: 'Tháng 8', value: 8 },
        { label: 'Tháng 8', value: 9 },
        { label: 'Tháng 10', value: 10 },
        { label: 'Tháng 11', value: 11 },
        { label: 'Tháng 12', value: 12 },
    ]);

    let yearsArray = [];
    for (let year = (new Date()).getFullYear() - 80; year <= (new Date()).getFullYear(); year++) {
        yearsArray.push(
            { label: year.toString(), value: year },
        );
    }

    const [valueYear, setValueYear] = useState(null);
    const [itemsYear, setItemsYear] = useState(yearsArray);

    const [visibleModal, setVisibleModal] = useState(false);
    const [messageSuccess, setMessageSuccess] = useState<string>('');
    const hideModal = async () => {
        setVisibleModal(false);
        await Common.dismissKeyboard(() => {
            navigation.navigate(SCREEN_CONSTANT.HELLO);
        });
    };
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [birthDay, setBirthDay] = useState('');
    const [birthMonth, setBirthMonth] = useState('');
    const [birthYear, setBirthYear] = useState('');
    const [email, setEmail] = useState('');
    const [step1, setStep1] = useState(true);
    const [step2, setStep2] = useState(false);
    const nextStep = async () => {
        setStep1(false);
        setStep2(true);
    }
    const userAccountService = new InforService();
    const register = async () => {
        let req: UserAccountRegisterEntity = {
            userName: userName,
            email: email,
            hashPassword: password,
            fullName: fullName,
            address: address,
            birth: new Date(`${birthYear + ''}/${birthMonth + ''}/${birthDay + ''}`)
        }
        console.log(req);
        setMessageSuccess('Đăng ký thành công');
        setVisibleModal(true);
        // const response = await userAccountService.register(req);
        // if (response?.data?.code === STATUS_REPONSE_API.OK) {
        //     setMessageSuccess('Đăng ký thành công');
        //     setVisibleModal(true);
        // } else {
        //     setMessageSuccess(response?.data.message ?? '');
        // }
    }

    return (
        <View style={registerStyles.container}>
            <Image source={ImageAssets.Bg_Image} style={registerStyles.bgImage} />
            <View style={[favoriteCategoryStyles.section, { padding: 16 }]}>
                <Appbar.Header style={favoriteCategoryStyles.header}>
                    <View style={favoriteCategoryStyles.titleContainer}>
                        <TouchableOpacity style={favoriteCategoryStyles.iconheader} onPress={() => {
                            if (step1) {
                                navigation.goBack()
                            }
                            else {
                                setStep2(false)
                                setStep1(true);
                            }
                        }}>
                            <Icon source={'chevron-left'} color="#FFF" size={24} />
                        </TouchableOpacity>
                    </View>
                </Appbar.Header>
            </View>
            <View style={registerStyles.containerContent}>
                <Text style={registerStyles.titleCont}>Đăng ký trải nghiệm PO<Text style={{ color: '#FE2083' }}>D</Text></Text>
                {step1 && (
                    <View>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#FFF', marginTop: 20 }}>Tên đăng nhập của bạn</Text>
                        <TextInput theme={{ roundness: 23 }} mode='outlined' label="Tên đăng nhập" value={userName} onChangeText={setUserName} style={registerStyles.input} />
                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#FFF' }}>Mật khẩu của bạn</Text>
                        <TextInput
                            theme={{ roundness: 23 }}
                            mode='outlined'
                            label="Mật khẩu"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={secureTextEntry}
                            style={registerStyles.input}
                            right={
                                <TextInput.Icon
                                    icon={secureTextEntry ? 'eye-off' : 'eye'}
                                    onPress={() => setSecureTextEntry(!secureTextEntry)}
                                />
                            }
                        />
                        <Button
                            style={registerStyles.bottomButtonContainer} mode="contained" onPress={() => nextStep()}>
                            <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Tiếp theo</Text>
                        </Button>
                    </View>
                )}
                {step2 && (
                    <View>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#FFF', marginTop: 20 }}>Họ tên của bạn</Text>
                        <TextInput theme={{ roundness: 23 }} mode='outlined' label="Họ và tên" value={fullName} onChangeText={setFullName} style={registerStyles.input} />
                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#FFF' }}>Địa chỉ của bạn</Text>
                        <TextInput theme={{ roundness: 23 }} mode='outlined' label="Địa chỉ" value={address} onChangeText={setAddress} style={registerStyles.input} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ width: '50%' }}>
                                <Text style={{ fontSize: 14, fontWeight: '500', color: '#FFF' }}>Email của bạn</Text>
                                <TextInput theme={{ roundness: 23 }} mode='outlined' label="Email" value={email} onChangeText={setEmail} style={registerStyles.input} />
                            </View>
                            <View style={{ width: '45%' }}>
                                <Text style={{ fontSize: 14, fontWeight: '500', color: '#FFF', marginBottom: 5 }}>Giới tính</Text>
                                <View style={registerStyles.dropdown}>
                                    <DropDownPicker
                                        placeholder='Giới tính'
                                        zIndex={99999}
                                        open={openGender}
                                        value={valueGender}
                                        items={itemsGender}
                                        setOpen={setOpenGender}
                                        setValue={setValueGender}
                                        setItems={setItemsGender}
                                        onChangeValue={(value) => {
                                            console.log(value);
                                        }}
                                        onSelectItem={(item) => {
                                            console.log(item);
                                        }}
                                        autoScroll={true}
                                        maxHeight={200}
                                        style={{ borderRadius: 20, width: '100%' }}
                                    />
                                </View>
                            </View>
                        </View>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#FFF', marginBottom: 10 }}>Ngày sinh của bạn</Text>
                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                            <View style={{ width: '30%' }}>
                                <View style={registerStyles.dropdown}>
                                    <DropDownPicker
                                        placeholder='Ngày'
                                        zIndex={99999}
                                        open={openDay}
                                        value={valueDay}
                                        items={itemsDay}
                                        setOpen={setOpenDay}
                                        setValue={setValueDay}
                                        setItems={setItemsDay}
                                        onChangeValue={(value) => {
                                            console.log(value);
                                        }}
                                        onSelectItem={(item) => {
                                            console.log(item);
                                        }}
                                        autoScroll={true}
                                        maxHeight={200}
                                        style={{ borderRadius: 20, width: '100%' }}
                                    />
                                </View>
                            </View>
                            <View style={{ width: '30%' }}>
                                <View style={registerStyles.dropdown}>
                                    <DropDownPicker
                                        placeholder='Tháng'
                                        zIndex={99999}
                                        open={openMonth}
                                        value={valueMonth}
                                        items={itemsMonth}
                                        setOpen={setOpenMonth}
                                        setValue={setValueMonth}
                                        setItems={setItemsMonth}
                                        onChangeValue={(value) => {
                                            console.log(value);
                                        }}
                                        onSelectItem={(item) => {
                                            console.log(item);
                                        }}
                                        autoScroll={true}
                                        maxHeight={200}
                                        style={{ borderRadius: 20, width: '100%' }}
                                    />
                                </View>
                            </View>
                            <View style={{ width: '30%' }}>
                                <View style={registerStyles.dropdown}>
                                    <DropDownPicker
                                        placeholder='Năm'
                                        zIndex={99999}
                                        open={openYear}
                                        value={valueYear}
                                        items={itemsYear}
                                        setOpen={setOpenYear}
                                        setValue={setValueYear}
                                        setItems={setItemsYear}
                                        onChangeValue={(value) => {
                                            console.log(value);
                                        }}
                                        onSelectItem={(item) => {
                                            console.log(item);
                                        }}
                                        autoScroll={true}
                                        maxHeight={200}
                                        style={{ borderRadius: 20, width: '100%' }}
                                    />
                                </View>
                            </View>
                        </View>
                        <Button
                            style={registerStyles.bottomButtonContainer} mode="contained" onPress={() => register()}>
                            <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Đăng ký</Text>
                        </Button>
                    </View>
                )}
            </View>
            <Modal visible={visibleModal} onDismiss={hideModal} contentContainerStyle={registerStyles.modalContent}>
                <SuccessModal message={messageSuccess} hideModal={hideModal} />
            </Modal>
        </View>
    )
}

export default RegisterAccountScreen