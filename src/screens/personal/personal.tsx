import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { ImageAssets } from '../../assets'
import { styles } from './personal.style'
import { Avatar, Button, Icon, Switch, Title } from 'react-native-paper'
import { useMMKVString } from 'react-native-mmkv'
import { SCREEN_CONSTANT } from '../../config/configuration'

const Personal = ({ navigation }: any) => {
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
    const [fcmToken, setToken] = useMMKVString('FCM_TOKEN');

    const handleLogout = () => {
        setToken('')
        navigation.navigate(SCREEN_CONSTANT.LOG_IN);

    }
    return (
        <SafeAreaView style={styles.container}>
            <Image source={ImageAssets.Bg_Image} style={styles.bgImage} />
            <View style={styles.containerContent}>
                <Text style={styles.textHeader}>Cá nhân</Text>
                <View style={styles.content}>
                    <Avatar.Image source={ImageAssets.avatar} size={164} />
                    <Text style={[styles.text, { fontWeight: '700', fontSize: 32 }]}>Tiến tử lạc</Text>
                    <View style={[styles.row, { marginVertical: 4 }]}>
                        <Icon color='#C2C2C2' source={'map-marker'} size={20} />
                        <Text style={[styles.text, styles.textGmail]}>Đến từ hải dương</Text>
                    </View>
                    <View style={[styles.row, { marginVertical: 4 }]}>
                        <Icon color='#C2C2C2' source={'email'} size={20} />
                        <Text style={[styles.text, styles.textGmail]}>tientula@gmail.com</Text>
                    </View>
                </View>
                <Button style={styles.button} textColor='#FFFFFF'>Sửa thông tin cá nhân</Button>
                <View style={styles.line} />
                <Text style={[styles.text, { fontWeight: '700', fontSize: 18, marginVertical: 8 }]}>Cài đặt</Text>
                <TouchableOpacity style={[styles.row, { justifyContent: 'space-between', marginVertical: 4 }]}>
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
        </SafeAreaView >
    )
}

export default Personal