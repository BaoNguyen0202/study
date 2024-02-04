import * as React from 'react';
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import Slider from '@react-native-community/slider';
import { ActivityIndicator, Appbar, Icon } from 'react-native-paper';
import { HEIGHT, WIDTH } from '../../../common/constant';
import { useEffect, useRef, useState } from 'react';
import { Audio } from '../../../utils';
import { recordPlayerStyles } from './record-player.styles';
import { UserBlogEntity } from '../../../model/blog-entity';
import { useRoute } from '@react-navigation/native';
import { CONFIG_URL } from '../../../config/configuration';
import { favoriteCategoryStyles } from '../favorite-category/favorite-category.style';
import Sound from 'react-native-sound';
import { Ultility } from '../../../common/ultility';

interface AudioState {
    audioStatus?: string;
    recordTime?: number;
    playTime?: number;
    audioFilePath?: string;
}

const RecordPlayerScreen = ({ navigation }: any) => {
    const route = useRoute();
    const [isPlaying, setIsPlaying] = useState(false);
    const [isRandomPlay, setIsRandomPlay] = useState<boolean>(false);
    const [isNormalPlay, setIsNormalPlay] = useState<boolean>(true);
    const [data, setData] = useState<UserBlogEntity | null | undefined>(route.params);
    const [audioUrl, setAudioUrl] = useState('https://all-frontend-assets.s3.amazonaws.com/summum.us/assets/audio/SummumAudioBookIntroductionSample.mp3');
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const intervalRef = useRef<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const _sound = new Sound(audioUrl, Sound.MAIN_BUNDLE, (error) => {
        setIsLoading(true);
        if (error) {
            console.log('Error loading sound', error);
            setIsLoading(false);
        } else {
            const audioDuration = _sound.getDuration();
            setDuration(audioDuration);
            setIsLoading(false);
        }
    });
    const [sound, setSound] = useState<Sound>(_sound);
    const playRecord = async () => {
        if (sound) {
            if (isPlaying) {
                sound.pause();
                clearInterval(intervalRef.current);
            }
            else {
                sound.setVolume(100);
                sound.play((success) => {
                    if (success) {
                        console.log('Successfully finished playing');
                        refreshRecord();
                        setSound(_sound);
                    } else {
                        console.log('Playback failed due to audio decoding errors');
                    }
                });
                intervalRef.current = setInterval(() => {
                    sound.getCurrentTime((seconds) => setCurrentTime(seconds));
                }, 1000);
            }
            setIsPlaying(!isPlaying);
        }
    };
    const refreshRecord = () => {
        sound.stop();
    }
    const randomRecord = () => {
        setIsRandomPlay(true);
        setIsNormalPlay(false);
    }
    const normalRecord = () => {
        setIsRandomPlay(false);
        setIsNormalPlay(true);
    }

    const onSliderValueChange = (value: any) => {
        setCurrentTime(value);
        sound.setCurrentTime(value);
    };
    const goBackScreen = () => {
        refreshRecord();
        navigation.goBack();
    }

    useEffect(() => {
        return () => {
            sound.release();
        };
    }, []);

    return (
        <SafeAreaView style={recordPlayerStyles.contanier}>
            {isLoading ? <ActivityIndicator animating={true} color='#FE2083' /> : <></>}
            <View style={[favoriteCategoryStyles.section, { height: HEIGHT / 14 }]}>
                <Appbar.Header style={favoriteCategoryStyles.header}>
                    <View style={favoriteCategoryStyles.titleContainer}>
                        <TouchableOpacity style={favoriteCategoryStyles.iconheader} onPress={() => goBackScreen()}>
                            <Icon source={'chevron-left'} color="#FFF" size={24} />
                        </TouchableOpacity>
                        <Text style={[favoriteCategoryStyles.appbarText, { textAlign: 'center' }]}>{data?.categoryName}</Text>
                        <TouchableOpacity style={favoriteCategoryStyles.iconheader}>
                            <Icon source={'chevron-down'} color="#FFF" size={24} />
                        </TouchableOpacity>
                    </View>
                </Appbar.Header>
            </View>
            <View style={recordPlayerStyles.music_logo_view}>
                <Image source={{ uri: CONFIG_URL.URL_UPLOAD + (data?.poster ?? '') }} style={recordPlayerStyles.recently_played_image} />
            </View>
            <View style={recordPlayerStyles.name_of_song_View} >
                <Text style={recordPlayerStyles.name_of_song_Text1}>{data?.name}</Text>
                <Text style={recordPlayerStyles.name_of_song_Text2}>Người đăng: {data?.fullName}</Text>
            </View>
            <View style={{ width: '100%', padding: 16 }}>
                <Appbar.Header style={favoriteCategoryStyles.header}>
                    <View style={favoriteCategoryStyles.titleContainer}>
                        <Text style={recordPlayerStyles.slider_time}> {Ultility.formatDuration(currentTime)} </Text>
                        <Slider
                            style={recordPlayerStyles.slider_style}
                            minimumValue={0}
                            maximumValue={duration}
                            minimumTrackTintColor="#e75480"
                            maximumTrackTintColor="#d3d3d3"
                            thumbTintColor="#e75480"
                            onValueChange={onSliderValueChange}
                            value={currentTime}
                        />
                        <Text style={recordPlayerStyles.slider_time}> {Ultility.formatDuration(duration)} </Text>
                    </View>
                </Appbar.Header>
            </View>
            <View style={recordPlayerStyles.functions_view}>
                <TouchableOpacity style={isRandomPlay ? recordPlayerStyles.iconMusic : recordPlayerStyles.iconMusicDisable} onPress={() => randomRecord()}>
                    <Icon source={'shuffle'} color="#FFF" size={24} />
                </TouchableOpacity>
                <TouchableOpacity style={recordPlayerStyles.iconMusic} onPress={() => console.log('123')}>
                    <Icon source={'skip-previous'} color="#FFF" size={24} />
                </TouchableOpacity>
                <TouchableOpacity style={recordPlayerStyles.iconMusic} onPress={() => playRecord()}>
                    <Icon source={isPlaying ? 'pause' : 'play'} color="#FFF" size={50} />
                </TouchableOpacity>
                <TouchableOpacity style={recordPlayerStyles.iconMusic} onPress={() => console.log('123')}>
                    <Icon source={'skip-next'} color="#FFF" size={24} />
                </TouchableOpacity>
                <TouchableOpacity style={isNormalPlay ? recordPlayerStyles.iconMusic : recordPlayerStyles.iconMusicDisable} onPress={() => normalRecord()}>
                    <Icon source={'repeat'} color="#FFF" size={20} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default RecordPlayerScreen;
