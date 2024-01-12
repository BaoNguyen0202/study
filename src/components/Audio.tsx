import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { Audio, EnCode } from '../utils';
import RNFS from 'react-native-fs';

interface AudioState {
    audioStatus?: string;
    recordTime?: number;
    playTime?: number;
    audioFilePath?: string;
}

const AudioScreen = () => {
    const [state, setState] = useState<AudioState>({});

    const handleStartRecording = async () => {
        try {
            await Audio.startRecording(setState);
        } catch (error) {
            console.error('Error starting recording:', error);
        }
    };

    const handleStopRecording = async () => {
        try {
            const { audioFileURL } = await Audio.stopRecording(setState);
            setState((prev) => ({ ...prev, audioFilePath: audioFileURL }));
        } catch (error) {
            console.error('Error stopping recording:', error);
        }
    };

    const handleStartPlaying = async () => {
        try {
            await Audio.startPlaying(setState);
        } catch (error) {
            console.error('Error starting playback:', error);
        }
    };

    const handleStopPlaying = async () => {
        try {
            await Audio.stopPlaying();
        } catch (error) {
            console.error('Error stopping playback:', error);
        }
    };

    const handlePausePlaying = async () => {
        try {
            await Audio.pausePlaying();
        } catch (error) {
            console.error('Error pausing playback:', error);
        }
    };

    const handleReadRecording = async () => {
        try {
            if (!state.audioFilePath) {
                console.warn('No recorded audio available.');
                return;
            }
            const base64Audio = await EnCode.convertAudioToBase64(state.audioFilePath);
            console.log('Audio Content Base64:', base64Audio);

            // const audioContent = await RNFS.readFile(state.audioFilePath, 'base64');
            // console.log('Audio Content Base64:', audioContent);
        } catch (error) {
            console.error('Error reading recording:', error);
        }
    };

    return (
        <View>
            <Card>
                <Card.Content>
                    <Title>Audio Status</Title>
                    <Paragraph>{state && state.audioStatus}</Paragraph>
                </Card.Content>
            </Card>

            <Card>
                <Card.Content>
                    <Title>Recording Time</Title>
                    <Paragraph>{state && state.recordTime}</Paragraph>
                </Card.Content>
            </Card>

            <Card>
                <Card.Content>
                    <Title>Playback Time</Title>
                    <Paragraph>{state && state.playTime}</Paragraph>
                </Card.Content>
            </Card>

            <Card>
                <Card.Content>
                    <Button mode="contained" style={{ marginBottom: 8 }} onPress={handleStartRecording}>
                        Start Recording
                    </Button>
                    <Button mode="contained" style={{ marginBottom: 8 }} onPress={handleStopRecording}>
                        Stop Recording
                    </Button>
                    <Button mode="contained" style={{ marginBottom: 8 }} onPress={handleStartPlaying}>
                        Start Playing
                    </Button>
                    <Button mode="contained" style={{ marginBottom: 8 }} onPress={handleStopPlaying}>
                        Stop Playing
                    </Button>
                    <Button mode="contained" style={{ marginBottom: 8 }} onPress={handlePausePlaying}>
                        Pause Playing
                    </Button>
                    <Button mode="contained" style={{ marginBottom: 8 }} onPress={handleReadRecording}>
                        Read Recording
                    </Button>
                </Card.Content>
            </Card>
        </View>
    );
};

export default AudioScreen;
