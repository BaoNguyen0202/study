import { View, Text, Alert } from 'react-native'
import React from 'react'
import { Button, Modal } from 'react-native-paper'

const SuccessModal = ({ hideModal, message }: any) => {
    return (
        <View>
            <Text style={[styles.text, { textAlign: 'center', fontSize: 20, fontWeight: '700', marginBottom: 16 }]}>{message ?? ''}</Text>
            <View style={[styles.row, { justifyContent: 'center', marginTop: 16 }]}>
                <Button style={{ borderColor: '#FE2083', width: '47%' }} textColor='#FE2083' mode='outlined' onPress={hideModal}>Đóng</Button>
            </View>
        </View>
    )
}

export default SuccessModal

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    text: {
        color: '#FFF'
    },
    row: {
        flexDirection: 'row'
    },
    modalContent: {
        backgroundColor: '#1A1429',
        marginHorizontal: 24,
        padding: 24,
        borderRadius: 16
    },
});