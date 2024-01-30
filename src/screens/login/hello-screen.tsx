import { View, Text, StyleSheet, Image, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { Button, Icon } from 'react-native-paper'
import { APP_CONSTANT, SCREEN_CONSTANT, STATUS_REPONSE_API } from '../../config/configuration'
import { ImageAssets } from '../../assets'
import { useMMKVString } from 'react-native-mmkv'

const HelloScreen = ({ navigation }: any) => {
    const [fcmToken, setToken] = useMMKVString('FCM_TOKEN');

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (fcmToken) {
                navigation.navigate(SCREEN_CONSTANT.CATEGORY_TYPE);
            }
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [fcmToken]);


    return (
        <View style={styles.container}>
            <Image source={ImageAssets.Bg_Image} style={styles.bgImage} />
            <Image source={ImageAssets.Bg_Image2} style={styles.bgImage2} />
            <View style={styles.containerContent}>
                <Text style={styles.title}>PO<Text style={{ color: '#FE2083' }}>D</Text></Text>
                <Image source={ImageAssets.Bg_Image3} style={styles.bgImage3} />

                <Text style={styles.titleCont}>Chào mừng đến với PO<Text style={{ color: '#FE2083' }}>D</Text></Text>
                <Text style={styles.titleSub}>Hãy chia sẻ và học hỏi kiến thức cùng chúng tôi !</Text>
                <Button onPress={() => { navigation.navigate(SCREEN_CONSTANT.LOG_IN) }} mode='contained' style={styles.btn}>
                    Bắt đầu
                </Button>
                <Button textColor="#FE2083" mode='outlined' style={styles.btn2}>
                    Đăng ký
                </Button>
            </View>
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerContent: {
        flex: 1,
        marginTop: 51,
        marginHorizontal: 24,
    },
    title: {
        fontSize: 77,
        fontWeight: '800',
        color: '#FFFFFF',
        fontFamily: 'PlusJakartaSans-Regular'
    },
    titleCont: {
        fontSize: 36,
        fontWeight: '700',
        color: '#FFFFFF',
        fontFamily: 'Plus Jakarta Sans'
    },
    titleSub: {
        fontSize: 14,
        fontWeight: '500',
        fontFamily: 'Plus Jakarta Sans',
        color: '#FFFFFF',
        marginVertical: 12
    },
    btn: {
        backgroundColor: '#FE2083',
        borderRadius: 100,
        gap: 10,
        marginVertical: 12
    },
    btn2: {
        height: 48,
        borderRadius: 100,
        gap: 10,
        borderColor: '#FE2083',

    },
    bgImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: -9999
    },
    bgImage2: {
        top: 71,
        right: 0,
        width: '65%',
        height: '75%',
        position: 'absolute',
        zIndex: -999
    },
    bgImage3: {
        width: '60%',
        height: '55%',
        alignSelf: 'flex-end',
        marginTop: -46,
        marginRight: -24
    }
})
export default HelloScreen