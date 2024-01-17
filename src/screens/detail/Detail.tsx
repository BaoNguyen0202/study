import React from 'react';
import { View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from 'react-native-paper';

const DetailsScreen = ({ navigation }: any) => {
    return (
        <LinearGradient colors={['#3498db', '#1abc9c']} style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Details Screen</Text>
                <Button mode="contained" onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
                    Go Back
                </Button>
            </View>
        </LinearGradient>
    );
};

export default DetailsScreen;
