import { View, Text, Alert } from 'react-native'
import React from 'react'
import { Button, Modal } from 'react-native-paper'
import { deleteModalStyles } from './delete-modal.style'
import { BaseService } from '../../../service/base-service'
import { STATUS_REPONSE_API } from '../../../config/configuration'

const DeleteModal = ({ request, url, hideModal }: any) => {
    const baseService = new BaseService<any, boolean>(url);

    const confirm = async () => {
        try {
            const response = await baseService.postAsync(request);
            if (response?.data?.code === STATUS_REPONSE_API.OK) {
                Alert.alert(response.data.message ?? '');
                hideModal();
            } else {
                console.error('failed:', response?.data.message);
            }
        } catch (error) {
            console.error('Error during:', error);
        }
    };

    return (
        <View>
            <Text style={[deleteModalStyles.text, { textAlign: 'center', fontSize: 20, fontWeight: '700', marginBottom: 16 }]}>Bạn có chắc muốn xóa ?</Text>
            <View style={[deleteModalStyles.row, { justifyContent: 'space-between', marginTop: 16 }]}>
                <Button style={{ borderColor: '#FE2083', width: '47%' }} textColor='#FE2083' mode='outlined' onPress={hideModal}>Hủy</Button>
                <Button style={{ backgroundColor: '#FE2083', width: '47%' }} textColor='#FFF' onPress={() => confirm()}>Xác nhận</Button>
            </View>
        </View>
    )
}

export default DeleteModal