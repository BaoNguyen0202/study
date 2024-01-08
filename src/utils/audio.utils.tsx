import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const audioRecorderPlayer = new AudioRecorderPlayer();

// Hàm bắt đầu ghi âm
const startRecording = async (setStateCallback: any) => {
    try {
        const result = await audioRecorderPlayer.startRecorder();
        audioRecorderPlayer.addRecordBackListener((e) => {
            setStateCallback({
                recordSecs: e.currentPosition,
                recordTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
            });
        });
        console.log(result);
    } catch (error) {
        console.error(error);
    }
};

// Hàm dừng ghi âm
const stopRecording = async (setStateCallback: any) => {
    try {
        const result = await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();
        setStateCallback({
            recordSecs: 0,
        });
        console.log(result);
    } catch (error) {
        console.error(error);
    }
};

// Hàm bắt đầu phát âm thanh
const startPlaying = async (setStateCallback: any) => {
    try {
        console.log('onStartPlay');
        const msg = await audioRecorderPlayer.startPlayer();
        audioRecorderPlayer.addPlayBackListener((e) => {
            setStateCallback({
                currentPositionSec: e.currentPosition,
                currentDurationSec: e.duration,
                playTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
                duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
            });
        });
        console.log(msg);
    } catch (error) {
        console.error(error);
    }
};

// Hàm dừng phát âm thanh
const stopPlaying = async () => {
    try {
        console.log('onStopPlay');
        audioRecorderPlayer.stopPlayer();
        audioRecorderPlayer.removePlayBackListener();
    } catch (error) {
        console.error(error);
    }
};

// Hàm tạm dừng phát âm thanh
const pausePlaying = async () => {
    try {
        await audioRecorderPlayer.pausePlayer();
    } catch (error) {
        console.error(error);
    }
};

export { startRecording, stopRecording, startPlaying, stopPlaying, pausePlaying };
