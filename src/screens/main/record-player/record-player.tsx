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
import { Appbar, Icon } from 'react-native-paper';
import { HEIGHT, WIDTH } from '../../../common/constant';
import { useEffect, useState } from 'react';
import { Audio } from '../../../utils';
import { recordPlayerStyles } from './record-player.styles';
import { UserBlogEntity } from '../../../model/blog-entity';
import { useRoute } from '@react-navigation/native';
import { CONFIG_URL } from '../../../config/configuration';
import { favoriteCategoryStyles } from '../favorite-category/favorite-category.style';
import Sound from 'react-native-sound';

interface AudioState {
    audioStatus?: string;
    recordTime?: number;
    playTime?: number;
    audioFilePath?: string;
}

const RecordPlayerScreen = ({ navigation }: any) => {
    const route = useRoute();
    const [isPlay, setIsPlay] = useState<boolean>(false);
    const [isRandomPlay, setIsRandomPlay] = useState<boolean>(false);
    const [isNormalPlay, setIsNormalPlay] = useState<boolean>(true);
    const [data, setData] = useState<UserBlogEntity | null | undefined>(route.params);
    const sound = new Sound(CONFIG_URL.URL_RECORD + (data?.path ?? ''), Sound.MAIN_BUNDLE, (error) => {
        if (error) {
            console.log('Error loading sound', error);
        }
    });
    console.log(sound)
    const playRecord = async () => {
        setIsPlay(!isPlay);
        if (!isPlay) {
            try {
                sound.play((success) => {
                    if (success) {
                        console.log('Successfully finished playing');
                    } else {
                        console.log('Playback failed due to audio decoding errors');
                    }
                });
            } catch (error) {
                console.error('Error starting playback:', error);
            }
        }
        else {
            try {
                sound.pause();
            } catch (error) {
                console.error('Error pausing playback:', error);
            }
        }
    };

    const randomRecord = () => {
        setIsRandomPlay(true);
        setIsNormalPlay(false);
    }
    const normalRecord = () => {
        setIsRandomPlay(false);
        setIsNormalPlay(true);
    }

    useEffect(() => {
        return () => {
            sound.release();
        };
    }, []);

    return (
        <SafeAreaView style={recordPlayerStyles.contanier}>
            <View style={[favoriteCategoryStyles.section, { height: HEIGHT / 14 }]}>
                <Appbar.Header style={favoriteCategoryStyles.header}>
                    <View style={favoriteCategoryStyles.titleContainer}>
                        <TouchableOpacity style={favoriteCategoryStyles.iconheader} onPress={() => console.log('Back !')}>
                            <Icon source={'chevron-left'} color="#FFF" size={24} />
                        </TouchableOpacity>
                        <Text style={[favoriteCategoryStyles.appbarText, { textAlign: 'center' }]}>{data?.categoryName}</Text>
                        <View style={[recordPlayerStyles.iconheader]}>
                            <Text style={{ color: '#FFF' }}>...</Text>
                        </View>
                    </View>
                </Appbar.Header>
            </View>
            <View style={recordPlayerStyles.music_logo_view}>
                <Image source={{ uri: CONFIG_URL.URL_UPLOAD + (data?.poster ?? '') }} style={recordPlayerStyles.recently_played_image} />
            </View>
            <View style={recordPlayerStyles.name_of_song_View} >
                <Text style={recordPlayerStyles.name_of_song_Text1}>{data?.content}</Text>
                <Text style={recordPlayerStyles.name_of_song_Text2}>Tác giả: {data?.fullName}</Text>
            </View>
            <View style={{ width: '100%', padding: 16 }}>
                <Appbar.Header style={favoriteCategoryStyles.header}>
                    <View style={favoriteCategoryStyles.titleContainer}>
                        <Text style={recordPlayerStyles.slider_time}> 00:00 </Text>
                        <Slider
                            style={recordPlayerStyles.slider_style}
                            minimumValue={0}
                            maximumValue={12.02}
                            minimumTrackTintColor="#e75480"
                            maximumTrackTintColor="#d3d3d3"
                            thumbTintColor="#e75480"
                            value={3.5}
                        />
                        <Text style={recordPlayerStyles.slider_time}> {sound.getDuration()} </Text>
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
                    <Icon source={isPlay ? 'pause' : 'play'} color="#FFF" size={50} />
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
