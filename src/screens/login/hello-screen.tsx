import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Button, Title } from 'react-native-paper'
import { SCREEN_CONSTANT } from '../../config/configuration'
import { useTheme } from '@react-navigation/native'

const HelloScreen = ({ navigation }: any) => {
    const { colors } = useTheme();
    return (
        <View style={styles.container}>
            <Text style={[styles.title, { color: colors.text }]}>PO<Text style={{ color: '#FE2083' }}>D</Text></Text>
            <Text style={[styles.titleCont, { color: colors.text }]}>Chào mừng đến với PO<Text style={{ color: '#FE2083' }}>D</Text></Text>
            <Text style={[styles.titleSub, { color: colors.text }]}>Hãy chia sẻ và học hỏi kiến thức cùng chúng tôi !</Text>
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
        marginTop: 71,
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

    }
})
export default HelloScreen