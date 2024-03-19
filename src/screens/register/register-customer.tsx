import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native';

interface UserAccount {
    userName?: string | null;
    password?: string | null
}

const RegisterCustomerScreen = ({ navigation }: any) => {
    const route = useRoute();
    const [data, setData] = useState<UserAccount | null | undefined>(route.params);
    return (
        <View>
            <Text>{data?.userName}</Text>
        </View>
    )
}

export default RegisterCustomerScreen