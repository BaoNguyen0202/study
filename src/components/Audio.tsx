import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { Audio } from '../utils';

interface AudioState {
    audioStatus?: string;
    recordTime?: number;
    playTime?: number;
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
            await Audio.stopRecording(setState);
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
                </Card.Content>
            </Card>
        </View>
    );
};

export default AudioScreen;
