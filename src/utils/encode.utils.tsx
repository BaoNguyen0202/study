import RNFS from 'react-native-fs';

export const convertAudioToBase64 = async (audioFilePath: any) => {
    try {
        const audioContent = await RNFS.readFile(audioFilePath, 'base64');
        const base64Data = `data:audio/mpeg;base64,${audioContent}`;
        return base64Data;
    } catch (error) {
        console.error('Error converting audio to base64:', error);
        throw error;
    }
};
export const getFileSize = async (filePath: any) => {
    try {
        const fileInfo = await RNFS.stat(filePath);
        const fileSizeInBytes = fileInfo.size;
        const fileSizeInMB = fileSizeInBytes / (1024 * 1024);
        return fileSizeInMB;
    } catch (error) {
        console.error('Error getting file size:', error);
        return null;
    }
};
