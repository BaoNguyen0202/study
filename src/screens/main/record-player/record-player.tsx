import * as React from 'react';
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    Image,
    Dimensions,
    TouchableOpacity,
    Alert,
    ImageBackground,
    FlatList
} from 'react-native';
import Slider from '@react-native-community/slider';
import { ActivityIndicator, Appbar, Icon } from 'react-native-paper';
import { HEIGHT, WIDTH } from '../../../common/constant';
import { useEffect, useRef, useState } from 'react';
import { Audio, Common } from '../../../utils';
import { recordPlayerStyles } from './record-player.styles';
import { BlogEntity, UserBlogEntity, UserBlogEntitySearch } from '../../../model/blog-entity';
import { useRoute } from '@react-navigation/native';
import { CONFIG_URL, STATUS_REPONSE_API } from '../../../config/configuration';
import { favoriteCategoryStyles } from '../favorite-category/favorite-category.style';
import Sound from 'react-native-sound';
import { Ultility } from '../../../common/ultility';
import { Swipeable } from 'react-native-gesture-handler';
import TrackListScreen from '../track-list/track-list';
import { PaginationEntity } from '../../../model/pagination-entity';
import { BlogService } from '../../../service/blog-service';
import { trackListStyles } from '../track-list/track-list.styes';
import { ImageAssets } from '../../../assets';
import RecordOtherScreen from './record-other';

const RecordPlayerScreen = ({ navigation }: any) => {
    const route = useRoute();
    const [isPlaying, setIsPlaying] = useState(false);
    const [isRandomPlay, setIsRandomPlay] = useState<boolean>(false);
    const [isNormalPlay, setIsNormalPlay] = useState<boolean>(true);
    const [data, setData] = useState<UserBlogEntity | null | undefined>(route.params);
    const [audioUrl, setAudioUrl] = useState(CONFIG_URL.URL_RECORD + data?.path ?? '');
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const intervalRef = useRef<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [sound, setSound] = useState<Sound | null>(null);
    const blogService = new BlogService();
    const categoryTypeSelectedIds = Common.storage.getString('category_type_selected_ids');
    const playRecord = async () => {
        if (sound) {
            if (isPlaying) {
                sound.pause();
                clearInterval(intervalRef.current);
            }
            else {
                sound.setVolume(1);
                sound.play((success) => {
                    if (success) {
                        console.log('Successfully finished playing');
                        setCurrentTime(0);
                        sound.setCurrentTime(0);
                        setIsPlaying(false);
                    }
                    else {
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
        sound?.release();
        setSound(null);
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
        sound?.setCurrentTime(value);
    };
    const goBackScreen = () => {
        refreshRecord();
        navigation.goBack();
    }
    const getSound = async (_url: string) => {
        if (sound) {
            setCurrentTime(0);
            sound.setCurrentTime(0);
            setIsPlaying(false);
            sound.release();
            setSound(null);
        }
        const soundObject = new Sound(_url, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('Error loading sound:', error);
            } else {
                const audioDuration = soundObject.getDuration();
                setDuration(audioDuration);
                setSound(soundObject);
                setIsLoading(false);
            }
        });
    }
    useEffect(() => {
        getSound(audioUrl);
        return () => {
            if (sound) {
                sound.release();
                setSound(null);
            }
        };
    }, []);

    const swipeFromLeftOpen = async (item: UserBlogEntity | null | undefined) => {
    };

    const LeftSwipeActions = () => {
        return (
            <RecordOtherScreen track={data} onEvent={setData} onEventSound={getSound} />
        );
    };

    const rewind = async () => {
        if (currentTime > 10) {
            setCurrentTime(currentTime - 10);
            sound?.setCurrentTime(currentTime - 10);
        }
        else {
            setCurrentTime(0);
            sound?.setCurrentTime(0);
        }
    }

    const forward = async () => {
        if ((duration - currentTime) > 10) {
            setCurrentTime(currentTime + 10);
            sound?.setCurrentTime(currentTime + 10);
        }
        else {
            setCurrentTime(duration);
            sound?.setCurrentTime(duration);
        }
    }

    const changeTrack = async (type: string) => {
        let req = {
            id: data?.id,
            categoryId: data?.categoryId
        };
        const response = await blogService.changeTrack(req, type.toLowerCase());
        if (response?.data.code === '200') {
            setData(response.data.data);
            setAudioUrl(CONFIG_URL.URL_RECORD + response.data.data?.path ?? '');
            getSound(audioUrl);
        }
        else {
            console.log(response?.data.messageEX);
        }
    }

    return (
        <Swipeable
            renderLeftActions={LeftSwipeActions}
            onSwipeableLeftOpen={() => swipeFromLeftOpen(data)}
        >
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
                                <Icon source={'dots-horizontal'} color="#FFF" size={24} />
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
                    <TouchableOpacity style={recordPlayerStyles.iconMusic} onPress={() => rewind()}>
                        <Icon source={'rewind-10'} color="#FFF" size={24} />
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={isRandomPlay ? recordPlayerStyles.iconMusic : recordPlayerStyles.iconMusicDisable} onPress={() => randomRecord()}>
                        <Icon source={'shuffle'} color="#FFF" size={24} />
                    </TouchableOpacity> */}
                    <TouchableOpacity style={recordPlayerStyles.iconMusic} onPress={() => changeTrack('REWIND')}>
                        <Icon source={'skip-previous'} color="#FFF" size={24} />
                    </TouchableOpacity>
                    <TouchableOpacity style={recordPlayerStyles.iconMusic} onPress={() => playRecord()}>
                        <Icon source={isPlaying ? 'pause' : 'play'} color="#FFF" size={50} />
                    </TouchableOpacity>
                    <TouchableOpacity style={recordPlayerStyles.iconMusic} onPress={() => changeTrack('FORWARD')}>
                        <Icon source={'skip-next'} color="#FFF" size={24} />
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={isNormalPlay ? recordPlayerStyles.iconMusic : recordPlayerStyles.iconMusicDisable} onPress={() => normalRecord()}>
                        <Icon source={'fast-forward-10'} color="#FFF" size={20} />
                    </TouchableOpacity> */}
                    <TouchableOpacity style={recordPlayerStyles.iconMusic} onPress={() => forward()}>
                        <Icon source={'fast-forward-10'} color="#FFF" size={24} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </Swipeable>
    )
}

export default RecordPlayerScreen;


