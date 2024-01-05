import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Button, Card, Divider, Title } from 'react-native-paper';
import AudioRecorderPlayer, {
    AVEncoderAudioQualityIOSType,
    AVEncodingOption,
    AudioEncoderAndroidType,
    AudioSet,
    AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';

const AudioScreen = ({ navigation }: any) => {
    const [recordSecs, setRecordSecs] = useState(0);
    const [recordTime, setRecordTime] = useState('00:00:00');
    const [currentPositionSec, setCurrentPositionSec] = useState(0);
    const [currentDurationSec, setCurrentDurationSec] = useState(0);
    const [playTime, setPlayTime] = useState('00:00:00');
    const [duration, setDuration] = useState('00:00:00');

    const audioRecorderPlayer = new AudioRecorderPlayer();
    audioRecorderPlayer.setSubscriptionDuration(0.09);

    const onStartRecord = async () => {
        const path = 'hello.m4a';
        const audioSet: AudioSet = {
            AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
            AudioSourceAndroid: AudioSourceAndroidType.MIC,
            AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
            AVNumberOfChannelsKeyIOS: 2,
            AVFormatIDKeyIOS: AVEncodingOption.aac,
        };

        const uri = await audioRecorderPlayer.startRecorder(path, audioSet);
        audioRecorderPlayer.addRecordBackListener((e) => {
            setRecordSecs(e.currentPosition);
            setRecordTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
        });
        console.log(`bat dau ghi am: ${uri}`);
    };

    const onStopRecord = async () => {
        const result = await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();
        setRecordSecs(0);
        console.log('da dung ghi am ', result);
    };

    const onStartPlay = async () => {
        const path = 'hello.m4a';
        const msg = await audioRecorderPlayer.startPlayer(path);
        audioRecorderPlayer.setVolume(1.0);
        console.log(msg);
        audioRecorderPlayer.addPlayBackListener((e) => {
            if (e.currentPosition === e.duration) {
                console.log('bat dau chay ');
                audioRecorderPlayer.stopPlayer();
            }
            setCurrentPositionSec(e.currentPosition);
            setCurrentDurationSec(e.duration);
            setPlayTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
            setDuration(audioRecorderPlayer.mmssss(Math.floor(e.duration)));
        });
    };

    const onPausePlay = async () => {
        await audioRecorderPlayer.pausePlayer();
    };

    const onStopPlay = () => {
        console.log('dung ghi am ');
        audioRecorderPlayer.stopPlayer();
        audioRecorderPlayer.removePlayBackListener();
    };

    return (
        <LinearGradient colors={['#3498db', '#1abc9c']} style={{ flex: 1 }}>
            <Card
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignContent: 'center',
                    alignSelf: 'center',
                }}
            >
                <Title>{recordTime}</Title>
                <Button mode="contained" icon="record" onPress={onStartRecord}>
                    RECORD
                </Button>
                <Button icon="stop" mode="outlined" onPress={onStopRecord}>
                    STOP
                </Button>
                <Divider />
                <Title>
                    {playTime} / {duration}
                </Title>
                <Button mode="contained" icon="play" onPress={onStartPlay}>
                    PLAY
                </Button>
                <Button icon="pause" mode="contained" onPress={onPausePlay}>
                    PAUSE
                </Button>
                <Button icon="stop" mode="outlined" onPress={onStopPlay}>
                    STOP
                </Button>
            </Card>
        </LinearGradient>
    );
};

export default AudioScreen;
