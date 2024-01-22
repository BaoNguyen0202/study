import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import { SCREEN_CONSTANT } from '../../config/configuration'
import { ImageAssets } from '../../assets'

const HelloScreen = ({ navigation }: any) => {
    return (
        <View style={styles.container}>
            <Image source={ImageAssets.Bg_Image} style={styles.bgImage} />
            <Image source={ImageAssets.Bg_Image2} style={styles.bgImage2} />

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

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        marginTop: 51,
        marginLeft: 24,
        fontSize: 77,
        fontWeight: '800',
        color: '#FFFFFF',
        fontFamily: 'PlusJakartaSans-Regular'
    },
    titleCont: {
        marginHorizontal: 24,
        fontSize: 36,
        fontWeight: '700',
        color: '#FFFFFF',
        fontFamily: 'Plus Jakarta Sans'
    },
    titleSub: {
        marginHorizontal: 24,
        fontSize: 14,
        fontWeight: '500',
        fontFamily: 'Plus Jakarta Sans',
        color: '#FFFFFF',
        marginVertical: 12
    },
    btn: {
        backgroundColor: '#FE2083',
        height: 48,
        marginHorizontal: 24,
        borderRadius: 100,
        gap: 10,
        marginVertical: 12
    },
    btn2: {
        height: 48,
        marginHorizontal: 24,
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
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: -999
    },
    bgImage3: {
        width: '55%',
        height: '50%',
        alignSelf: 'flex-end',
        marginTop: -46
    }
})
export default HelloScreen