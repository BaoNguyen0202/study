import RNFS from 'react-native-fs';

const convertAudioToBase64 = async (audioFilePath: any) => {
    try {
        const audioContent = await RNFS.readFile(audioFilePath, 'base64');
        const base64Data = `data:audio/mpeg;base64,${audioContent}`;
        return base64Data;
    } catch (error) {
        console.error('Error converting audio to base64:', error);
        throw error;
    }
};
